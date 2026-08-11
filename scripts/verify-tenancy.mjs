import { loadEnvFile } from "node:process";

import { createClient } from "@supabase/supabase-js";

try {
  loadEnvFile(".env.local");
} catch {
  throw new Error(
    "Could not load .env.local. Make sure the local Supabase environment file exists.",
  );
}

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const supabaseUrl = requiredEnv("NEXT_PUBLIC_SUPABASE_URL");
const supabasePublishableKey = requiredEnv(
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
);

const userAEmail = requiredEnv("RLS_TEST_USER_A_EMAIL");
const userAPassword = requiredEnv("RLS_TEST_USER_A_PASSWORD");
const userBEmail = requiredEnv("RLS_TEST_USER_B_EMAIL");
const userBPassword = requiredEnv("RLS_TEST_USER_B_PASSWORD");

const workspaceAName = "RLS Verification Workspace A";
const workspaceBName = "RLS Verification Workspace B";

function createTestClient() {
  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function signIn(client, email, password, label) {
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    throw new Error(`${label} could not sign in.`);
  }

  console.log(`✓ ${label} signed in`);

  return data.user;
}

async function ensureWorkspace(client, workspaceName, label) {
  const { data: existingWorkspaces, error: existingError } = await client
    .from("workspaces")
    .select("id, name")
    .eq("name", workspaceName)
    .limit(1);

  if (existingError) {
    throw new Error(`${label} could not query its workspaces.`);
  }

  if (existingWorkspaces.length > 0) {
    console.log(`✓ ${label} existing verification workspace found`);
    return existingWorkspaces[0];
  }

  const { data: workspaceId, error: createError } = await client.rpc(
    "create_workspace",
    {
      workspace_name: workspaceName,
    },
  );

  if (createError || !workspaceId) {
    throw new Error(`${label} could not create its verification workspace.`);
  }

  console.log(`✓ ${label} verification workspace created`);

  return {
    id: workspaceId,
    name: workspaceName,
  };
}

async function verifyOwnWorkspace(client, user, workspace, label) {
  const { data: workspaces, error: workspaceError } = await client
    .from("workspaces")
    .select("id")
    .eq("id", workspace.id);

  if (workspaceError) {
    throw new Error(`${label} could not query its own workspace.`);
  }

  assert(
    workspaces.length === 1,
    `${label} should be able to read its own workspace.`,
  );

  const { data: memberships, error: membershipError } = await client
    .from("workspace_members")
    .select("workspace_id, user_id, role")
    .eq("workspace_id", workspace.id)
    .eq("user_id", user.id);

  if (membershipError) {
    throw new Error(`${label} could not query its own membership.`);
  }

  assert(
    memberships.length === 1,
    `${label} should be able to read its own membership.`,
  );

  assert(
    memberships[0].role === "owner",
    `${label} should own its verification workspace.`,
  );

  console.log(`✓ ${label} can read its own workspace and owner membership`);
}

async function verifyOwnProfile(client, user, label) {
  const { data, error } = await client
    .from("profiles")
    .select("id")
    .eq("id", user.id);

  if (error) {
    throw new Error(`${label} could not query its own profile.`);
  }

  assert(data.length === 1, `${label} should be able to read its own profile.`);

  console.log(`✓ ${label} can read its own profile`);
}

async function verifyCannotReadOtherTenant(
  client,
  otherUser,
  otherWorkspace,
  label,
) {
  const { data: workspaces, error: workspaceError } = await client
    .from("workspaces")
    .select("id")
    .eq("id", otherWorkspace.id);

  if (workspaceError) {
    throw new Error(`${label} workspace isolation query failed unexpectedly.`);
  }

  assert(
    workspaces.length === 0,
    `${label} was able to read another user's workspace.`,
  );

  const { data: memberships, error: membershipError } = await client
    .from("workspace_members")
    .select("workspace_id, user_id")
    .eq("workspace_id", otherWorkspace.id);

  if (membershipError) {
    throw new Error(`${label} membership isolation query failed unexpectedly.`);
  }

  assert(
    memberships.length === 0,
    `${label} was able to read another workspace's membership records.`,
  );

  const { data: profiles, error: profileError } = await client
    .from("profiles")
    .select("id")
    .eq("id", otherUser.id);

  if (profileError) {
    throw new Error(`${label} profile isolation query failed unexpectedly.`);
  }

  assert(
    profiles.length === 0,
    `${label} was able to read another user's profile.`,
  );

  console.log(
    `✓ ${label} cannot read the other user's workspace, membership, or profile`,
  );
}

async function verifyAnonymousAccessIsDenied() {
  const anonymousClient = createTestClient();

  const { error: workspaceError } = await anonymousClient
    .from("workspaces")
    .select("id")
    .limit(1);

  assert(
    workspaceError !== null,
    "Anonymous access unexpectedly read the workspaces table.",
  );

  const { error: rpcError } = await anonymousClient.rpc("create_workspace", {
    workspace_name: "Anonymous Workspace",
  });

  assert(
    rpcError !== null,
    "Anonymous access unexpectedly executed create_workspace.",
  );

  console.log("✓ Anonymous workspace access is denied");
}

async function main() {
  const clientA = createTestClient();
  const clientB = createTestClient();

  const userA = await signIn(
    clientA,
    userAEmail,
    userAPassword,
    "User A",
  );

  const userB = await signIn(
    clientB,
    userBEmail,
    userBPassword,
    "User B",
  );

  const workspaceA = await ensureWorkspace(
    clientA,
    workspaceAName,
    "User A",
  );

  const workspaceB = await ensureWorkspace(
    clientB,
    workspaceBName,
    "User B",
  );

  await verifyOwnProfile(clientA, userA, "User A");
  await verifyOwnProfile(clientB, userB, "User B");

  await verifyOwnWorkspace(clientA, userA, workspaceA, "User A");
  await verifyOwnWorkspace(clientB, userB, workspaceB, "User B");

  await verifyCannotReadOtherTenant(
    clientA,
    userB,
    workspaceB,
    "User A",
  );

  await verifyCannotReadOtherTenant(
    clientB,
    userA,
    workspaceA,
    "User B",
  );

  await verifyAnonymousAccessIsDenied();

  console.log("");
  console.log("Tenant isolation verification passed.");
}

main().catch((error) => {
  const message =
    error instanceof Error ? error.message : "Unknown verification failure.";

  console.error("");
  console.error(`Tenant isolation verification failed: ${message}`);

  process.exitCode = 1;
});
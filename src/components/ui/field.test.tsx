import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Field, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

describe("Field primitives", () => {
  it("supports visible labels and associated help text", () => {
    render(
      <Field>
        <Label htmlFor="client-email">Client email</Label>
        <Input
          aria-describedby="client-email-help"
          id="client-email"
          type="email"
        />
        <FieldDescription id="client-email-help">
          Used for project updates and documents.
        </FieldDescription>
      </Field>,
    );

    expect(screen.getByLabelText("Client email")).toHaveAttribute(
      "aria-describedby",
      "client-email-help",
    );
  });

  it("announces validation errors", () => {
    render(<FieldError>Email address is required.</FieldError>);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Email address is required.",
    );
  });
});

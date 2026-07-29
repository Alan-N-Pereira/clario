"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

const themes = [
  { value: "light", label: "Use light theme", icon: Sun },
  { value: "dark", label: "Use dark theme", icon: Moon },
  { value: "system", label: "Use system theme", icon: Laptop },
] as const;

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="h-9 w-[7.75rem] rounded-lg border border-border bg-muted/40"
      />
    );
  }

  return (
    <div
      aria-label="Theme preference"
      className="inline-flex items-center gap-1 rounded-lg border border-border bg-background p-1 shadow-xs"
      role="group"
    >
      {themes.map(({ value, label, icon: Icon }) => {
        const isSelected = theme === value;

        return (
          <Button
            key={value}
            aria-label={label}
            aria-pressed={isSelected}
            className="size-7"
            onClick={() => setTheme(value)}
            size="icon"
            variant={isSelected ? "secondary" : "ghost"}
          >
            <Icon aria-hidden="true" className="size-4" />
          </Button>
        );
      })}
    </div>
  );
}
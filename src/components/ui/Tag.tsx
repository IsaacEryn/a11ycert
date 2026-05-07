import { type ReactNode } from "react";

type Variant = "default" | "accent" | "success" | "warning";

interface Props {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export default function Tag({ variant = "default", children, className }: Props) {
  const parts = ["tag"];
  if (variant === "accent") parts.push("tag--accent");
  if (variant === "success") parts.push("tag--success");
  if (variant === "warning") parts.push("tag--warning");
  if (className) parts.push(className);
  return <span className={parts.join(" ")}>{children}</span>;
}

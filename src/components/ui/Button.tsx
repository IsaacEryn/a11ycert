import { type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "ghost" | "default";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
}

function cls(variant: Variant, size: Size, extra?: string) {
  const parts = ["btn"];
  if (variant === "primary") parts.push("btn--primary");
  if (variant === "ghost") parts.push("btn--ghost");
  if (size === "lg") parts.push("btn--lg");
  if (size === "sm") parts.push("btn--sm");
  if (extra) parts.push(extra);
  return parts.join(" ");
}

export default function Button({ variant = "default", size = "md", className, href, children, ...rest }: Props) {
  const c = cls(variant, size, className);
  if (href) {
    return <Link href={href} className={c}>{children}</Link>;
  }
  return <button className={c} {...rest}>{children}</button>;
}

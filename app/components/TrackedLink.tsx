"use client";

import type { ComponentPropsWithoutRef } from "react";
import { trackEvent } from "@/lib/track";

type TrackedLinkProps = ComponentPropsWithoutRef<"a"> & {
  eventName: string;
  eventData?: Record<string, unknown>;
};

export function TrackedLink({
  eventName,
  eventData,
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackEvent(eventName, { href: rest.href, ...eventData });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

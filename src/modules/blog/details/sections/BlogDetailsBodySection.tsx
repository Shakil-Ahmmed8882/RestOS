"use client";

import { Icon } from "@iconify/react";
import { TruncatedDescription } from "../components/TruncatedDescription";
import type { BlogItem } from "@/modules/blog/types/blog.types";

type Props = {
  blog: BlogItem;
};

export function BlogDetailsBodySection(props: Props) {
  const { blog } = props;
  if (!blog) return null;

  const description = (blog as any)?.description as string | undefined;
  const instructions = ((blog as any)?.instructions ?? []) as string[];

  return (
    <section className="space-y-8">
      {description && <TruncatedDescription text={description} limit={420} />}

      {instructions.length > 0 && (
        <div className="rounded-2xl bg-silk-with-hover p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon icon="solar:checklist-minimalistic-linear" className="h-4 w-4" />
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Step-by-step
            </h3>
          </div>
          <ol className="space-y-3">
            {instructions.map((step, i) =>
              step ? (
                <li
                  key={`${i}-${step.slice(0, 12)}`}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] font-bold">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ) : null,
            )}
          </ol>
        </div>
      )}
    </section>
  );
}

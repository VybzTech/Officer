import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({
  title,
  description,
  action,
  children,
  className,
}: SectionProps) {
  return (
    <section className={cn("space-y-6", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between">
          <div>
            {title && (
              <h2 className="text-xl font-bold text-gray-900">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-gray-500 mt-1">
                {description}
              </p>
            )}
          </div>
          {action}
        </div>
      )}

      {children}
    </section>
  );
}
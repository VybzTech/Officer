import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/utils/cn";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  subtext?: string;
  trend?: {
    value: string;
    positive?: boolean;
  };
  badge?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  subtext,
  trend,
  badge,
  onClick,
  className,
}: StatCardProps) {
  return (
    <Card
      hover={!!onClick}
      onClick={onClick}
      className={cn("relative", className)}
    >
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase font-semibold text-gray-500 tracking-wide">
              {title}
            </p>
            <h3 className="text-2xl font-bold mt-2 text-gray-900">
              {value}
            </h3>

            {subtext && (
              <p className="text-sm text-gray-500 mt-1">{subtext}</p>
            )}

            {trend && (
              <p
                className={cn(
                  "text-xs mt-2 font-semibold",
                  trend.positive
                    ? "text-success-dark"
                    : "text-danger-dark",
                )}
              >
                {trend.value}
              </p>
            )}
          </div>

          {Icon && (
            <div className="bg-primary-50 p-3 rounded-xl">
              <Icon className="w-5 h-5 text-primary-600" />
            </div>
          )}
        </div>

        {badge && <div className="mt-4">{badge}</div>}
      </CardContent>
    </Card>
  );
}
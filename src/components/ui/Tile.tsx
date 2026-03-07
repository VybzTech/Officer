import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface TileProps {
    children: ReactNode;
    className?: string;
    padding?: "none" | "sm" | "md" | "lg";
}

const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
};

export function Tile({ children, className, padding = "md" }: TileProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-2xl border border-gray-100/50 shadow-premium transition-all duration-300 hover:shadow-premium-lg",
                paddings[padding],
                className
            )}
        >
            {children}
        </div>
    );
}

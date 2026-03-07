import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface TypographyProps {
    children: ReactNode;
    className?: string;
    useHubot?: boolean;
}

export function BigHeader({ children, className, useHubot = true }: TypographyProps) {
    return (
        <h1
            className={cn(
                "text-3xl md:text-4xl font-black tracking-tight text-gray-900",
                useHubot ? "font-hubot" : "font-sans",
                className
            )}
        >
            {children}
        </h1>
    );
}

export function SmallHeader({ children, className, useHubot = false }: TypographyProps) {
    return (
        <h3
            className={cn(
                "text-lg font-bold text-gray-800 uppercase tracking-widest",
                useHubot ? "font-hubot" : "font-sans",
                className
            )}
        >
            {children}
        </h3>
    );
}

import { type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { HubotH1 } from "./HubotText";

interface TypographyProps {
    children: ReactNode;
    className?: string;
    useHubot?: boolean;
    subtitle?: string;
}

export function BigHeader({ children, className, useHubot: _useHubot = true, subtitle }: TypographyProps) {
    return (
        <div className="flex flex-col">
            <HubotH1 size={42} children={children} className={cn("font-extrabold", className)} />
            {subtitle && (
                <p className="text-gray-500 font-semibold mt-1">{subtitle}</p>
            )}
        </div>
    );
}

export function SmallHeader({ children, className, useHubot = false }: TypographyProps) {
    return (
        <h3
            className={cn(
                "text-lg font-bold text-gray-800 uppercase tracking-widest",
                useHubot ? "font-hubot" : "font-poppins",
                className
            )}
        >
            {children}
        </h3>
    );
}

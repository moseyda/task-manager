"use client";

import { ThemeToggle } from "@/components/theme-toggle";

export function Topbar() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6 shadow-sm z-10">
            <div className="flex-1" />
            <ThemeToggle />
        </header>
    );
}

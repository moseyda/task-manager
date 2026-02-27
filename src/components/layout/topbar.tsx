"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/use-ui-store";
import { ThemeToggle } from "@/components/theme-toggle";

export function Topbar() {
    const { toggleSidebar } = useUIStore();

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6 shadow-sm z-10">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
            </Button>

            <div className="flex-1" />

            <ThemeToggle />
        </header>
    );
}

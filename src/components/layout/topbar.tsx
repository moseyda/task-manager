"use client";

import { Menu, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/use-ui-store";
import { ThemeToggle } from "@/components/theme-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/lib/auth-actions";

export function Topbar() {
    const { toggleSidebar } = useUIStore();
    const { user } = useAuth();

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6 shadow-sm z-10">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
            </Button>

            <div className="flex-1" />

            <ThemeToggle />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <UserCircle className="h-6 w-6" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user?.name || "My Account"}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}

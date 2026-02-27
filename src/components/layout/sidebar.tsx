"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare, LayoutDashboard, Settings as SettingsIcon, LogOut, UserCircle, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/use-ui-store";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/lib/auth-actions";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
    },
    {
        label: "Tasks",
        icon: CheckSquare,
        href: "/tasks",
    }
];

export function Sidebar() {
    const pathname = usePathname();
    const { sidebarOpen } = useUIStore();
    const { user } = useAuth();

    if (!sidebarOpen) return null;

    return (
        <div className="flex h-full w-64 flex-col bg-card border-r shadow-sm transition-all duration-300">
            <div className="flex h-14 items-center border-b px-4">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                    <CheckSquare className="h-6 w-6 text-primary" />
                    <span className="text-lg">TaskMaster Pro</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4 flex flex-col justify-between">
                <nav className="grid gap-1 px-2">
                    {routes.map((route) => {
                        const isActive = route.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(route.href);
                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <route.icon className="h-4 w-4" />
                                {route.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="px-2 mt-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted text-left border cursor-pointer">
                                <UserCircle className="h-5 w-5 text-muted-foreground" />
                                <div className="flex-1 overflow-hidden">
                                    <p className="truncate font-semibold text-sm leading-tight">{user?.name || "My Account"}</p>
                                </div>
                                <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[240px]">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user?.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/settings" className="cursor-pointer flex items-center w-full">
                                    <SettingsIcon className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => logout()} className="text-red-500 focus:text-red-500 cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}

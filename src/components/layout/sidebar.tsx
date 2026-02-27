"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare, LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/use-ui-store";

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
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const { sidebarOpen } = useUIStore();

    if (!sidebarOpen) return null;

    return (
        <div className="flex h-full w-64 flex-col bg-card border-r shadow-sm transition-all duration-300">
            <div className="flex h-14 items-center border-b px-4">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                    <CheckSquare className="h-6 w-6 text-primary" />
                    <span className="text-lg">TaskMaster Pro</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
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
            </div>
        </div>
    );
}

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

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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

    return (
        <div className={cn(
            "flex h-full flex-col bg-card shadow-sm transition-all duration-300 overflow-hidden border-r shrink-0",
            sidebarOpen ? "w-64" : "w-[68px]"
        )}>
            <div className="flex h-14 items-center border-b px-4 justify-center">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold justify-center">
                    <CheckSquare className="h-6 w-6 text-chart-3 shrink-0" />
                    <span className={cn(
                        "text-lg  transition-all duration-300 whitespace-nowrap",
                        !sidebarOpen && "opacity-0 w-0 hidden"
                    )}>TaskMaster Pro</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4 flex flex-col justify-between">
                <nav className="grid gap-1 px-2">
                    {routes.map((route) => {
                        const isActive = route.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(route.href);
                        return (
                            <Tooltip key={route.href} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={route.href}
                                        className={cn(
                                            "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                            sidebarOpen ? "gap-3" : "justify-center px-0 py-3"
                                        )}
                                    >
                                        <route.icon className="h-5 w-5 shrink-0" />
                                        <span className={cn(
                                            "transition-all duration-300 whitespace-nowrap",
                                            !sidebarOpen && "opacity-0 w-0 hidden"
                                        )}>
                                            {route.label}
                                        </span>
                                    </Link>
                                </TooltipTrigger>
                                {!sidebarOpen && (
                                    <TooltipContent side="right" className="text-chart-3 font-semibold">
                                        {route.label}
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        );
                    })}
                </nav>

                <div className="px-2 mt-auto">
                    <DropdownMenu>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                    <button className={cn(
                                        "flex w-full items-center rounded-lg py-2 text-sm font-medium transition-colors hover:bg-muted border cursor-pointer",
                                        sidebarOpen ? "px-3 gap-3 justify-start" : "justify-center px-0 py-3"
                                    )}>
                                        <UserCircle className="h-5 w-5 text-muted-foreground shrink-0" />
                                        <div className={cn(
                                            "flex-1 overflow-hidden transition-all duration-300 text-left",
                                            !sidebarOpen && "opacity-0 w-0 hidden"
                                        )}>
                                            <p className="truncate font-semibold text-sm leading-tight">{user?.name || "My Account"}</p>
                                        </div>
                                        {sidebarOpen && <ChevronsUpDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                                    </button>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            {!sidebarOpen && (
                                <TooltipContent side="right" className="text-chart-3 font-semibold">
                                    Profile & Settings
                                </TooltipContent>
                            )}
                        </Tooltip>
                        <DropdownMenuContent align={sidebarOpen ? "start" : "center"} side={sidebarOpen ? "bottom" : "right"} className="w-[240px]">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm text-chart-3 font-medium leading-none">{user?.name}</p>
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

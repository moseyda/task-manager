"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function LandingNavbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-3">
                        <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <Link href="/" className="font-bold tracking-tight text-xl flex items-center gap-2">
                        TaskoraFlow
                    </Link>
                </div>

                <nav className="hidden md:flex flex-1 items-center justify-center gap-8 text-sm font-medium">
                    <Link href="#features" className="transition-colors hover:text-chart-3 text-muted-foreground">Features</Link>
                    <Link href="#how-it-works" className="transition-colors hover:text-chart-3 text-muted-foreground">How it Works</Link>
                    <Link href="#testimonials" className="transition-colors hover:text-chart-3 text-muted-foreground">Testimonials</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="hidden sm:flex cursor-pointer">Log in</Button>
                    </Link>
                    <Link href="/register">
                        <Button className="rounded-full shadow-sm bg-chart-3 hover:bg-chart-3/85 cursor-pointer">Get Started</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

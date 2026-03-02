import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MoveRight, Zap, Target, Shield, Clock } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-48 lg:pt-40 lg:pb-56">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
                <div className="container mx-auto max-w-7xl px-4 md:px-8 flex flex-col items-center text-center">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                        TaskoraFlow is now in public beta
                    </div>

                    <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        Master your day with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">perfect clarity.</span>
                    </h1>

                    <p className="max-w-2xl text-xl text-muted-foreground mb-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-150">
                        The intelligent task management platform that transforms chaos into coordinated action. Built for high-velocity teams and relentless individuals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                        <Link href="/register">
                            <Button
                                size="lg"
                                className="group rounded-full h-14 px-8 text-base shadow-xl w-full sm:w-56 rounded-full h-14 px-8 text-base cursor-pointer"
                            >
                                Start for free
                                <MoveRight className="relative top-[1px] !h-5 !w-5 transition-transform duration-200 group-hover:translate-x-1" />
                            </Button>
                        </Link>

                        <Link href="#features">
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full h-14 px-8 text-base bg-background/50 backdrop-blur w-full sm:w-56 rounded-full h-14 px-8 text-base cursor-pointer"
                            >
                                Discover Features
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Preview Section */}
            <section id="features" className="py-24 bg-muted/30 border-y relative">
                <div className="container mx-auto max-w-7xl px-4 md:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Everything you need to ship faster</h2>
                        <p className="text-lg text-muted-foreground">Beautifully designed tools that get out of your way and let you focus on what actually matters doing the work.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-background rounded-2xl p-8 border shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                                <Zap className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                            <p className="text-muted-foreground">Built on modern architecture. Every interaction feels instant, smooth, and incredibly responsive.</p>
                        </div>

                        <div className="bg-background rounded-2xl p-8 border shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                                <Target className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Laser Focused</h3>
                            <p className="text-muted-foreground">A totally clutter-free interface. We stripped away the noise so you can zero in on the exact task at hand.</p>
                        </div>

                        <div className="bg-background rounded-2xl p-8 border shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                                <Shield className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Enterprise Secure</h3>
                            <p className="text-muted-foreground">Rock-solid infrastructure powered by Appwrite. Strict email verification processes to keep your data perfectly secure.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial / Trust Section */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto max-w-7xl px-4 md:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12">Trusted by the best</h2>

                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder logos, rendered using text/icons for simplicity */}
                        <div className="flex items-center gap-2 text-2xl font-black italic"><CheckCircle2 className="h-8 w-8" /> ACME Corp</div>
                        <div className="flex items-center gap-2 text-2xl font-black tracking-widest uppercase">Globex</div>
                        <div className="flex items-center gap-2 text-2xl font-serif">Soylent</div>
                        <div className="flex items-center gap-2 text-2xl font-sans font-light tracking-tighter">Initech</div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 relative overflow-hidden bg-primary text-primary-foreground">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center relative z-10">
                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Ready to take control?</h2>
                    <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                        Join thousands of users who have already revolutionized their daily workflow. Setup takes less than 60 seconds.
                    </p>
                    <Link href="/register">
                        <Button size="lg" variant="secondary" className="rounded-full h-14 px-10 text-lg font-semibold shadow-2xl hover:scale-105 transition-transform">
                            Create your free account
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

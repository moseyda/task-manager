import Link from "next/link";
import { CheckCircle2, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-muted/20">
            <div className="container mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-3">
                                <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="font-bold tracking-tight text-xl">TaskoraFlow</span>
                        </div>
                        <p className="max-w-xs text-sm text-muted-foreground mb-6">
                            Turn chaos into clarity.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="h-5 w-5" /></a>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="h-5 w-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Product</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                            <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                            <li><Link href="#integrations" className="hover:text-foreground transition-colors">Integrations</Link></li>
                            <li><Link href="#changelog" className="hover:text-foreground transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Company</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#about" className="hover:text-foreground transition-colors">About Us</Link></li>
                            <li><Link href="#careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                            <li><Link href="#blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                            <li><Link href="#contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                            <li><Link href="#cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} TaskoraFlow Inc. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <span>Crafted with passion.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

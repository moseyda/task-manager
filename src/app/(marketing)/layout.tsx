import { LandingNavbar } from "@/components/layout/landing-navbar";
import { Footer } from "@/components/layout/footer";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <LandingNavbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}

import { Sidebar } from "@/components/layout/sidebar";
import { getUser } from "@/lib/auth-actions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getUser();

    if (!user) {
        redirect("/login");
    }

    if (!user.emailVerification) {
        redirect("/verify-email");
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden transition-all duration-300">
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

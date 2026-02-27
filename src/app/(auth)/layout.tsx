export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <div className="w-full max-w-md space-y-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">TaskMaster Pro</h1>
                    <p className="text-muted-foreground mt-2">Manage your tasks seamlessly.</p>
                </div>
                {children}
            </div>
        </div>
    );
}

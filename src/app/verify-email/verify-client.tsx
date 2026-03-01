"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { sendVerificationEmail, logout, verifyEmail } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowRight, AlertCircle, LogOut, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function VerifyEmailClient({ email, error, userId, secret }: { email?: string; error?: string; userId?: string; secret?: string }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleResend = () => {
        startTransition(async () => {
            const res = await sendVerificationEmail();
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success("Verification email sent! Check your inbox.");
            }
        });
    };

    const handleVerify = () => {
        if (!userId || !secret) return;
        startTransition(async () => {
            const res = await verifyEmail(userId, secret);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success("Email verified successfully!");
                router.push("/dashboard?verified=true");
            }
        });
    };

    if (userId && secret) {
        return (
            <div className="flex h-screen w-full items-center justify-center p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Confirm Verification</CardTitle>
                        <CardDescription>
                            Your email is ready to be verified. Click the button below to complete the process.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button
                            onClick={handleVerify}
                            className="w-full"
                            disabled={isPending}
                        >
                            {isPending ? "Verifying..." : "Complete Verification"}
                            {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full text-muted-foreground"
                            onClick={() => logout()}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full items-center justify-center p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                        <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Verify your email</CardTitle>
                    <CardDescription>
                        {error ? (
                            <span className="text-destructive flex items-center justify-center gap-1 mt-2">
                                <AlertCircle className="h-4 w-4" /> {error}
                            </span>
                        ) : (
                            <>
                                We've sent a verification link to <span className="font-semibold text-foreground">{email}</span>.
                                Please click the link to verify your account and access the dashboard.
                            </>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        onClick={handleResend}
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending ? "Sending..." : "Resend Verification Email"}
                        {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full text-muted-foreground"
                        onClick={() => logout()}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

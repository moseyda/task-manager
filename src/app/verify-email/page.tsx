import { redirect } from "next/navigation";
import { getUser, verifyEmail } from "@/lib/auth-actions";
import { VerifyEmailClient } from "./verify-client";

export default async function VerifyEmailPage(props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParams = await props.searchParams;
    const userId = searchParams?.userId as string;
    const secret = searchParams?.secret as string;

    const user = await getUser();

    // Handle incoming verification chunk from URL parameters
    if (userId && secret) {
        if (!user) {
            // They clicked the link but have no session (e.g. opened in a new browser/phone).
            // Force them to log in first, then redirect back here to complete verification.
            redirect(`/login?callback=${encodeURIComponent(`/verify-email?userId=${userId}&secret=${secret}`)}`);
        }

        return <VerifyEmailClient userId={userId} secret={secret} />;
    }

    // Prevent rendering for completely unauthenticated users
    if (!user) {
        redirect("/login");
    }

    // Prevent verified users from being stuck on this page
    if (user.emailVerification) {
        redirect("/dashboard");
    }

    // If they have no URL params, show the generic "Check your email" prompt
    return <VerifyEmailClient email={user.email} />;
}

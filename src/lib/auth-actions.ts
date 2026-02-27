"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "./appwrite.server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginWithEmail(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return { error: "Missing required fields" };

    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);

        const cookieStore = await cookies();
        cookieStore.set("my-custom-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });

        return { success: true };
    } catch (error: any) {
        return { error: error.message || "Failed to login" };
    }
}

export async function signUpWithEmail(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!email || !password || !name) return { error: "Missing required fields" };

    try {
        const { account } = await createAdminClient();
        await account.create(ID.unique(), email, password, name);

        const session = await account.createEmailPasswordSession(email, password);

        const cookieStore = await cookies();
        cookieStore.set("my-custom-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30,
        });

        return { success: true };
    } catch (error: any) {
        return { error: error.message || "Failed to sign up" };
    }
}

export async function logout() {
    try {
        const { account } = await createSessionClient();
        await account.deleteSession("current");
    } catch (error) {
        console.error("Logout failed", error);
    } finally {
        const cookieStore = await cookies();
        cookieStore.delete("my-custom-session");
    }

    redirect("/login");
}

export async function getUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        // Return plain object to avoid Next.js RSC serialization errors
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        return null;
    }
}

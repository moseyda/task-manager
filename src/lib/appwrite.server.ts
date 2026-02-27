import { Client, Account, Databases, Users } from 'node-appwrite';
import { appwriteConfig } from './appwrite.config';
import { cookies } from 'next/headers';

export async function createSessionClient() {
    const cookieStore = await cookies();
    const session = cookieStore.get('my-custom-session');

    const client = new Client()
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId);

    if (session?.value) {
        client.setSession(session.value);
    }

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
    };
}

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId)
        .setKey(process.env.APPWRITE_API_KEY!);

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
        get users() {
            return new Users(client);
        },
    };
}

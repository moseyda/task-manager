"use server";

import { ID, Query, Permission, Role } from "node-appwrite";
import { createSessionClient } from "./appwrite.server";
import { appwriteConfig } from "./appwrite.config";
import { Settings } from "@/types";

export async function getSettings(): Promise<Settings | null> {
    try {
        const { databases, account } = await createSessionClient();
        const user = await account.get();

        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.settingsCollectionId,
            [Query.equal('userId', user.$id)]
        );

        if (response.documents.length === 0) {
            // Create default settings if none exist
            const newSettings = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.settingsCollectionId,
                ID.unique(),
                {
                    userId: user.$id,
                    theme: 'system',
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
                    notificationsEnabled: true
                },
                [
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id)),
                ]
            );
            return JSON.parse(JSON.stringify(newSettings));
        }

        return JSON.parse(JSON.stringify(response.documents[0]));
    } catch (error) {
        console.error("Failed to get or create settings", error);
        return null;
    }
}

export async function updateSettings(settingsId: string, data: Partial<Settings>) {
    try {
        const { databases } = await createSessionClient();

        const response = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.settingsCollectionId,
            settingsId,
            data
        );
        return JSON.parse(JSON.stringify(response));
    } catch (error) {
        console.error("Failed to update settings", error);
        throw error;
    }
}

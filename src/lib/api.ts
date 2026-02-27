import { databases, appwriteConfig } from './appwrite.config';
import { ID, Query, Permission, Role } from 'appwrite';
import { Task } from '@/types';

export const api = {
    getTasks: async (userId: string) => {
        if (!userId) return [];
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.tasksCollectionId,
                [Query.equal('userId', userId), Query.orderDesc('$createdAt')]
            );
            return response.documents as unknown as Task[];
        } catch (e) {
            console.error(e);
            return [];
        }
    },
    createTask: async (task: Omit<Task, keyof import('appwrite').Models.Document>) => {
        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tasksCollectionId,
            ID.unique(),
            task,
            [
                Permission.read(Role.user(task.userId)),
                Permission.update(Role.user(task.userId)),
                Permission.delete(Role.user(task.userId)),
            ]
        );
    },
    updateTask: async (taskId: string, data: Partial<Task>) => {
        return await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tasksCollectionId,
            taskId,
            data
        );
    },
    deleteTask: async (taskId: string) => {
        return await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tasksCollectionId,
            taskId
        );
    },
    getSettings: async (userId: string) => {
        if (!userId) return null;
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.settingsCollectionId,
                [Query.equal('userId', userId)]
            );
            if (response.documents.length === 0) {
                return await databases.createDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.settingsCollectionId,
                    ID.unique(),
                    { userId, theme: 'system', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, notificationsEnabled: true }
                ) as import('@/types').Settings;
            }
            return response.documents[0] as unknown as import('@/types').Settings;
        } catch (e) {
            console.error(e);
            return null;
        }
    },
    updateSettings: async (settingsId: string, data: Partial<import('@/types').Settings>) => {
        return await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.settingsCollectionId,
            settingsId,
            data
        );
    }
};

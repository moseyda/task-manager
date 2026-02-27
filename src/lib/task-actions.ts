"use server";

import { ID, Query, Permission, Role } from "node-appwrite";
import { createSessionClient } from "./appwrite.server";
import { appwriteConfig } from "./appwrite.config";
import { Task } from "@/types";

export async function getTasks(): Promise<Task[]> {
    try {
        const { databases, account } = await createSessionClient();
        const user = await account.get();

        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tasksCollectionId,
            [
                Query.equal('userId', user.$id),
                Query.orderDesc('$createdAt')
            ]
        );

        // Return plain object to avoid Next.js RSC serialization errors
        return JSON.parse(JSON.stringify(response.documents));
    } catch (error) {
        console.error("Failed to get tasks", error);
        return [];
    }
}

export async function createTask(taskData: Omit<Task, keyof import('appwrite').Models.Document>) {
    try {
        const { databases, account } = await createSessionClient();
        const user = await account.get();

        const response = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tasksCollectionId,
            ID.unique(),
            { ...taskData, userId: user.$id },
            [
                Permission.read(Role.user(user.$id)),
                Permission.update(Role.user(user.$id)),
                Permission.delete(Role.user(user.$id)),
            ]
        );
        return JSON.parse(JSON.stringify(response));
    } catch (error) {
        console.error("Failed to create task", error);
        throw error;
    }
}

export async function updateTask(taskId: string, data: Partial<Task>) {
    try {
        const { databases } = await createSessionClient();

        const response = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tasksCollectionId,
            taskId,
            data
        );
        return JSON.parse(JSON.stringify(response));
    } catch (error) {
        console.error("Failed to update task", error);
        throw error;
    }
}

export async function deleteTask(taskId: string) {
    try {
        const { databases } = await createSessionClient();

        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tasksCollectionId,
            taskId
        );
        return true;
    } catch (error) {
        console.error("Failed to delete task", error);
        throw error;
    }
}

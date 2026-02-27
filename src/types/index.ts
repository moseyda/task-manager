// types/index.ts
import { Models } from 'appwrite';

export interface Task extends Models.Document {
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
    userId: string;
}

export interface Settings extends Models.Document {
    userId: string;
    theme: 'light' | 'dark' | 'system';
    timezone: string;
    notificationsEnabled: boolean;
}

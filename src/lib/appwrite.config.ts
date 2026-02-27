import { Client, Account, Databases } from 'appwrite';

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
  tasksCollectionId: process.env.NEXT_PUBLIC_APPWRITE_TASKS_TABLE_ID || '',
  settingsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_SETTINGS_TABLE_ID || '',
};

const client = new Client();

if (appwriteConfig.endpoint && appwriteConfig.projectId) {
  client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);
}

export const account = new Account(client);
export const databases = new Databases(client);
export default client;

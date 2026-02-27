"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSettings } from "@/hooks/use-settings";
import { toast } from "sonner";

const settingsSchema = z.object({
    theme: z.enum(["light", "dark", "system"]),
    timezone: z.string().min(1, "Timezone is required"),
    notificationsEnabled: z.boolean(),
});

export default function SettingsPage() {
    const { settings, isLoading, updateSettings, isUpdating } = useSettings();
    const { setTheme } = useTheme();

    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            theme: "system",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            notificationsEnabled: true,
        },
    });

    useEffect(() => {
        if (settings) {
            form.reset({
                theme: settings.theme,
                timezone: settings.timezone,
                notificationsEnabled: settings.notificationsEnabled,
            });
        }
    }, [settings, form]);

    async function onSubmit(values: z.infer<typeof settingsSchema>) {
        if (!settings) return;
        try {
            await updateSettings({ id: settings.$id, data: values });
            setTheme(values.theme);
            toast.success("Settings updated successfully");
        } catch (error) {
            toast.error("Failed to update settings");
        }
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="h-8 w-48 bg-muted rounded animate-pulse" />
                <Card className="animate-pulse">
                    <CardHeader><div className="h-6 w-32 bg-muted rounded" /></CardHeader>
                    <CardContent><div className="h-64 bg-muted rounded" /></CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-2">Manage your account preferences and application settings.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Update your theme, timezone, and notification preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            <FormField control={form.control} name="theme" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Appearance</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a theme" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="dark">Dark</SelectItem>
                                            <SelectItem value="system">System</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>Select the theme for your dashboard.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="timezone" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Timezone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. America/New_York" {...field} />
                                    </FormControl>
                                    <FormDescription>Your primary timezone for task deadlines.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="notificationsEnabled" render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Push Notifications</FormLabel>
                                        <FormDescription>
                                            Receive notifications about upcoming deadlines.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />

                            <Button type="submit" disabled={isUpdating || !settings}>
                                {isUpdating ? "Saving..." : "Save Preferences"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

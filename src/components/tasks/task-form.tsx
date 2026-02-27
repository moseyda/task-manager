"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Task } from "@/types";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
    initialData?: Task | null;
    onSubmit: (data: Omit<Task, keyof import("appwrite").Models.Document>) => void;
    isSubmitting?: boolean;
}

export function TaskForm({ initialData, onSubmit, isSubmitting }: TaskFormProps) {
    const { user } = useAuth();

    const form = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: "medium",
            startDate: new Date().toISOString().slice(0, 16),
            endDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                title: initialData.title,
                description: initialData.description || "",
                priority: initialData.priority,
                startDate: new Date(initialData.startDate).toISOString().slice(0, 16),
                endDate: new Date(initialData.endDate).toISOString().slice(0, 16),
            });
        } else {
            form.reset({
                title: "",
                description: "",
                priority: "medium",
                startDate: new Date().toISOString().slice(0, 16),
                endDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
            });
        }
    }, [initialData, form]);

    const handleSubmit = (values: TaskFormData) => {
        if (!user) return;
        onSubmit({
            ...values,
            startDate: new Date(values.startDate).toISOString(),
            endDate: new Date(values.endDate).toISOString(),
            completed: initialData ? initialData.completed : false,
            userId: user.$id,
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl><Input placeholder="Task title" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Task details (optional)" className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="priority" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a priority" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />

                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="startDate" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl><Input type="datetime-local" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="endDate" render={({ field }) => (
                        <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl><Input type="datetime-local" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : initialData ? "Update Task" : "Create Task"}
                </Button>
            </form>
        </Form>
    );
}

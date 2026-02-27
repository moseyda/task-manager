"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTasks } from "@/hooks/use-tasks";
import { TaskCard } from "@/components/tasks/task-card";
import { TaskForm } from "@/components/tasks/task-form";
import { Task } from "@/types";
import { toast } from "sonner";

export default function TasksPage() {
    const { tasks, isLoading, createTask, updateTask, deleteTask } = useTasks();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [filterPriority, setFilterPriority] = useState<string>("all");
    const [filterStatus, setFilterStatus] = useState<string>("all");

    const filteredTasks = tasks.filter((task) => {
        if (filterPriority !== "all" && task.priority !== filterPriority) return false;
        if (filterStatus === "completed" && !task.completed) return false;
        if (filterStatus === "pending" && task.completed) return false;
        return true;
    });

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            if (editingTask) {
                await updateTask({ id: editingTask.$id, data });
                toast.success("Task updated successfully");
            } else {
                await createTask(data);
                toast.success("Task created successfully");
            }
            setIsDialogOpen(false);
            setEditingTask(null);
        } catch (error) {
            toast.error("Failed to save task");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setIsDialogOpen(true);
    };

    const handleOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (!open) {
            setTimeout(() => setEditingTask(null), 300); // clear after animation
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>

                <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editingTask ? "Edit Task" : "Create Task"}</DialogTitle>
                            <DialogDescription>
                                {editingTask ? "Update your task details." : "Add a new task to your list."}
                            </DialogDescription>
                        </DialogHeader>
                        <TaskForm initialData={editingTask} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 bg-muted/30 p-4 rounded-lg border">
                <div className="flex-1 max-w-[200px]">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-1 max-w-[200px]">
                    <Select value={filterPriority} onValueChange={setFilterPriority}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Priorities</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {isLoading ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
                    ))}
                </div>
            ) : filteredTasks.length === 0 ? (
                <div className="text-center py-20 border rounded-xl border-dashed bg-muted/20">
                    <h3 className="text-lg font-medium text-foreground">No tasks found.</h3>
                    <p className="text-sm text-muted-foreground mt-1">Create a new task to get started or adjust your filters.</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredTasks.map((task) => (
                        <TaskCard
                            key={task.$id}
                            task={task}
                            onUpdate={(id, data) => updateTask({ id, data })}
                            onDelete={async (id) => {
                                await deleteTask(id);
                                toast.success("Task deleted");
                            }}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

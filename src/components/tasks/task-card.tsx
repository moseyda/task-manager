"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow, isPast } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Task } from "@/types";

interface TaskCardProps {
    task: Task;
    onUpdate: (id: string, data: Partial<Task>) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}

export function TaskCard({ task, onUpdate, onDelete, onEdit }: TaskCardProps) {
    const [timeLeft, setTimeLeft] = useState<string>("");

    useEffect(() => {
        const updateCountdown = () => {
            if (task.completed) {
                setTimeLeft("Completed");
                return;
            }
            const end = new Date(task.endDate);
            if (isPast(end)) {
                setTimeLeft("Overdue");
            } else {
                setTimeLeft(formatDistanceToNow(end, { addSuffix: true }));
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 60000);
        return () => clearInterval(interval);
    }, [task.endDate, task.completed]);

    const priorityColors = {
        low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };

    return (
        <Card className={`relative transition-all hover:shadow-md ${task.completed ? "opacity-75 bg-muted/50" : ""}`}>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <Checkbox
                            checked={task.completed}
                            onCheckedChange={(checked) => onUpdate(task.$id, { completed: !!checked })}
                            className="mt-1"
                        />
                        <div>
                            <CardTitle className={`text-lg ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                                {task.title}
                            </CardTitle>
                            {task.description && (
                                <CardDescription className="mt-1 line-clamp-2">
                                    {task.description}
                                </CardDescription>
                            )}
                        </div>
                    </div>
                    <Badge variant="outline" className={priorityColors[task.priority]}>
                        {task.priority}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pb-3 text-sm text-muted-foreground">
                <div className="flex justify-between items-center">
                    <span>Due: {new Date(task.endDate).toLocaleDateString()}</span>
                    <span className={`font-medium ${timeLeft === 'Overdue' ? 'text-destructive' : 'text-primary'}`}>
                        {timeLeft}
                    </span>
                </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(task)}>
                    <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => onDelete(task.$id)}>
                    <Trash className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
}

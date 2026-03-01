import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Clock, AlertCircle, ListTodo, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";

import { createSessionClient } from "@/lib/appwrite.server";
import { getTasks } from "@/lib/task-actions";

export default async function DashboardIndex() {
    let userName = "";
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        userName = user.name;
    } catch (e) {
        // Handle gracefully, middleware handles true unauthorised
    }

    const tasks = await getTasks();

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const highPriorityTasks = tasks.filter(t => t.priority === "high" && !t.completed).length;

    // Get 5 most recent pending tasks
    const recentTasks = tasks
        .filter(t => !t.completed)
        .sort((a, b) => new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime())
        .slice(0, 5);

    return (
        <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                        <ListTodo className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalTasks}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedTasks}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingTasks}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{highPriorityTasks}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Pending Tasks</CardTitle>
                        <CardDescription>You have {pendingTasks} tasks waiting to be completed.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recentTasks.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground bg-muted/20 border border-dashed rounded-lg">
                                No pending tasks. You're all caught up!
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentTasks.map(task => (
                                    <div key={task.$id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">{task.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Due: {format(new Date(task.endDate), "MMM d, yyyy")}
                                            </p>
                                        </div>
                                        <div className={`text-xs px-2 py-1 rounded-full uppercase tracking-wider font-semibold 
                                            ${task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                task.priority === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                                    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                            {task.priority}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <Button asChild variant="ghost" className="w-full mt-4 text-chart-3 hover:text-chart-3/85">
                            <Link href="/tasks">
                                View all tasks <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

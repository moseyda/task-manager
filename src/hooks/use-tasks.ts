import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, updateTask, deleteTask } from '@/lib/task-actions';
import { useAuth } from './use-auth';
import { Task } from '@/types';

export function useTasks() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['tasks', user?.$id],
        queryFn: getTasks,
        enabled: !!user?.$id,
    });

    const createMutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', user?.$id] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) => updateTask(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', user?.$id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', user?.$id] });
        },
    });

    return {
        tasks: query.data || [],
        isLoading: query.isLoading,
        createTask: createMutation.mutateAsync,
        updateTask: updateMutation.mutateAsync,
        deleteTask: deleteMutation.mutateAsync,
    };
}

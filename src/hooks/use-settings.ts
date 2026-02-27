import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettings, updateSettings } from '@/lib/settings-actions';
import { useAuth } from './use-auth';
import { Settings } from '@/types';

export function useSettings() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['settings', user?.$id],
        queryFn: getSettings,
        enabled: !!user?.$id,
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Settings> }) => updateSettings(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings', user?.$id] });
        },
    });

    return {
        settings: query.data || null,
        isLoading: query.isLoading,
        updateSettings: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
    };
}

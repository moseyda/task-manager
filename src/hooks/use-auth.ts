import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/lib/auth-actions';

export function useAuth() {
    const { data: user, isLoading, error, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const u = await getUser();
            if (!u) return null;
            return u;
        },
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    return {
        user,
        isLoading,
        isError: !!error,
        isAuthenticated: !!user,
        refetch
    };
}

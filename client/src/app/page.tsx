'use client'
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page () {
    const { isLoaded, userId } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        if (!userId) {
            router.push('/sign-in');
        } else {
            router.push('/dashboards/finance-dashboard');
        }
    }, [isLoaded, userId, router]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return null;
}
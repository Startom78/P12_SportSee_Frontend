import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000';

async function fetchFromBackend(path) {
    const response = await fetch(`${API_BASE_URL}${path}`);

    if (!response.ok) {
        throw new Error(`Error ${response.status}`);
    }

    const { data } = await response.json();

    if (!data) {
        throw new Error('No data found');
    }

    return data;
}

function makeUserEndpoint(path) {
    return (userId) => fetchFromBackend(`/user/${userId}${path}`);
}


/** Fonction pour récuperer les données d'un utilisateur */

export const getUserById = makeUserEndpoint('');
export const getUserActivity = makeUserEndpoint('/activity');
export const getUserAverageSessions = makeUserEndpoint('/average-sessions');
export const getUserPerformance = makeUserEndpoint('/performance');

export function useUserData(userId) {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCancelled = false;
        setIsLoading(true);
        setError(null);

        Promise.all([
            getUserById(userId),
            getUserActivity(userId),
            getUserAverageSessions(userId),
            getUserPerformance(userId)
        ]).then(([userMainData, userActivity, userAverageSessions, userPerformance]) => {
            if (isCancelled) return;
            setUserData({ userMainData, userActivity, userAverageSessions, userPerformance });
            setIsLoading(false);
        }).catch((fetchError) => {
            if (isCancelled) return;
            setError(fetchError.message);
            setIsLoading(false);
        });

        return () => {
            isCancelled = true;
        };
    }, [userId]);

    return { userData, isLoading, error };
}
/** Hook pour récupérer les données de l'utilisateur courant */

export function useCurrentUserData() {
    const { userId } = useParams();
    const currentUserId = Number(userId);

    const { userData, isLoading, error } = useUserData(currentUserId);

    if (error) {
        return { isReady: false, error };
    }

    if (isLoading || !userData) {
        return { isReady: false };
    }

    const { userMainData, userActivity, userAverageSessions, userPerformance } = userData;

    if (!userMainData || !userActivity || !userAverageSessions || !userPerformance) {
        return { isReady: false };
    }

    return { isReady: true, userMainData, userActivity, userAverageSessions, userPerformance };
}

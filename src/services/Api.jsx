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

export const getUserById = makeUserEndpoint('');
export const getUserActivity = makeUserEndpoint('/activity');
export const getUserAverageSessions = makeUserEndpoint('/average-sessions');
export const getUserPerformance = makeUserEndpoint('/performance');

/** Hook pour récupérer les données de l'utilisateur courant */

export function useCurrentUserData() {
    const { userId } = useParams();
    const currentUserId = Number(userId);

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCancelled = false;
        setUserData(null);
        setError(null);

        Promise.all([
            getUserById(currentUserId),
            getUserActivity(currentUserId),
            getUserAverageSessions(currentUserId),
            getUserPerformance(currentUserId)
        ]).then(([userMainData, userActivity, userAverageSessions, userPerformance]) => {
            if (!isCancelled) setUserData({ userMainData, userActivity, userAverageSessions, userPerformance });
        }).catch(() => {
            if (!isCancelled) setError("Désolé, un problème de chargement a eu lieu. Veuillez utiliser l'id 12 ou 18");
        });

        return () => {
            isCancelled = true;
        };
    }, [currentUserId]);

    if (error) {
        return { isReady: false, error };
    }

    if (!userData) {
        return { isReady: false };
    }

    return { isReady: true, ...userData };
}

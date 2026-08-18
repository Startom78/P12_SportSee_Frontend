import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findInMockedData } from './MockedDataServices.jsx';

const API_BASE_URL = 'http://localhost:3000';

class BackendUnavailableError extends Error {}

async function fetchFromBackend(path) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}${path}`);
    } catch {
        throw new BackendUnavailableError('Impossible de contacter le serveur.');
    }

    if (!response.ok) {
        throw new Error(`Erreur ${response.status} lors de la récupération des données.`);
    }

    const { data } = await response.json();

    if (!data) {
        throw new Error('Aucune donnée trouvée pour cet utilisateur.');
    }

    return data;
}

function makeUserEndpoint(path, collectionKey, matchKey = 'userId') {
    return async (userId) => {
        try {
            return await fetchFromBackend(`/user/${userId}${path}`);
        } catch (err) {
            if (!(err instanceof BackendUnavailableError)) throw err;

            const mockedItem = findInMockedData(collectionKey, userId, matchKey);
            if (!mockedItem) throw err;

            console.warn(`Backend indisponible : utilisation des données mockées pour "${collectionKey}".`);
            return mockedItem;
        }
    };
}

export const getUserById = makeUserEndpoint('', 'USER_MAIN_DATA', 'id');
export const getUserActivity = makeUserEndpoint('/activity', 'USER_ACTIVITY');
export const getUserAverageSessions = makeUserEndpoint('/average-sessions', 'USER_AVERAGE_SESSIONS');
export const getUserPerformance = makeUserEndpoint('/performance', 'USER_PERFORMANCE');

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
        }).catch((err) => {
            if (!isCancelled) setError(err.message);
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

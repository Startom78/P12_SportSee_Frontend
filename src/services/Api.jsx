import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mockedData from './mockeddata.jsx';

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

function findInMockedData(collectionKey, userId, matchKey) {
    return mockedData[collectionKey].find((item) => item[matchKey] === userId) ?? null;
}

async function fetchUserData(path, collectionKey, userId, matchKey) {
    try {
        return await fetchFromBackend(path);
    } catch (backendError) {
        return findInMockedData(collectionKey, userId, matchKey);
    }
}

function makeUserEndpoint(path, collectionKey, matchKey) {
    return (userId) => fetchUserData(`/user/${userId}${path}`, collectionKey, userId, matchKey);
}

export const getUserById = makeUserEndpoint('', 'USER_MAIN_DATA', 'id');
export const getUserActivity = makeUserEndpoint('/activity', 'USER_ACTIVITY', 'userId');
export const getUserAverageSessions = makeUserEndpoint('/average-sessions', 'USER_AVERAGE_SESSIONS', 'userId');
export const getUserPerformance = makeUserEndpoint('/performance', 'USER_PERFORMANCE', 'userId');

export function useUserData(userId) {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;
        setIsLoading(true);

        Promise.all([
            getUserById(userId),
            getUserActivity(userId),
            getUserAverageSessions(userId),
            getUserPerformance(userId)
        ]).then(([userMainData, userActivity, userAverageSessions, userPerformance]) => {
            if (isCancelled) return;
            setUserData({ userMainData, userActivity, userAverageSessions, userPerformance });
            setIsLoading(false);
        });

        return () => {
            isCancelled = true;
        };
    }, [userId]);

    return { userData, isLoading };
}

export function useCurrentUserData() {
    const { userId } = useParams();
    const currentUserId = Number(userId);

    const { userData, isLoading } = useUserData(currentUserId);

    if (isLoading || !userData) {
        return { isReady: false };
    }

    const { userMainData, userActivity, userAverageSessions, userPerformance } = userData;

    if (!userMainData || !userActivity || !userAverageSessions || !userPerformance) {
        return { isReady: false };
    }

    return { isReady: true, userMainData, userActivity, userAverageSessions, userPerformance };
}

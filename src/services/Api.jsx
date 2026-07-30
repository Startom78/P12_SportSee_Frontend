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

export function getUserById(userId) {
    return fetchUserData(`/user/${userId}`, 'USER_MAIN_DATA', userId, 'id');
}

export function getUserActivity(userId) {
    return fetchUserData(`/user/${userId}/activity`, 'USER_ACTIVITY', userId, 'userId');
}

export function getUserAverageSessions(userId) {
    return fetchUserData(`/user/${userId}/average-sessions`, 'USER_AVERAGE_SESSIONS', userId, 'userId');
}

export function getUserPerformance(userId) {
    return fetchUserData(`/user/${userId}/performance`, 'USER_PERFORMANCE', userId, 'userId');
}

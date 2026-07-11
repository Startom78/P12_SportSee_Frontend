import mockedData from './mockeddata.jsx';

const { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } = mockedData;

export function getUserById(userId) {
    return USER_MAIN_DATA.find((user) => user.id === userId);
}

export function getUserActivity(userId) {
    return USER_ACTIVITY.find((user) => user.userId === userId);
}

export function getUserAverageSessions(userId) {
    return USER_AVERAGE_SESSIONS.find((user) => user.userId === userId);
}

export function getUserPerformance(userId) {
    return USER_PERFORMANCE.find((user) => user.userId === userId);
}

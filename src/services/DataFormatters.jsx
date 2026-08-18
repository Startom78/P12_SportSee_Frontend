const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const performanceKindLabels = {
    cardio: 'Cardio',
    energy: 'Energie',
    endurance: 'Endurance',
    strength: 'Force',
    speed: 'Vitesse',
    intensity: 'Intensité'
};

/**
 * Normalisation : ramène les données brutes (API ou mock, dont le format
 * peut varier selon l'utilisateur, ex: "score" vs "todayScore") vers une
 * forme unique et fiable.
 */

export function normalizeUserMainData(raw) {
    const { id, userInfos, keyData, todayScore, score } = raw;

    return {
        id,
        firstName: userInfos.firstName,
        lastName: userInfos.lastName,
        age: userInfos.age,
        todayScore: todayScore ?? score ?? 0,
        calorieCount: keyData.calorieCount,
        proteinCount: keyData.proteinCount,
        carbohydrateCount: keyData.carbohydrateCount,
        lipidCount: keyData.lipidCount
    };
}

export function normalizeUserActivity(raw) {
    return {
        userId: raw.userId,
        sessions: raw.sessions.map(({ day, kilogram, calories }) => ({ day, kilogram, calories }))
    };
}

export function normalizeUserAverageSessions(raw) {
    return {
        userId: raw.userId,
        sessions: raw.sessions.map(({ day, sessionLength }) => ({ day, sessionLength }))
    };
}

export function normalizeUserPerformance(raw) {
    return {
        userId: raw.userId,
        data: raw.data.map(({ kind, value }) => ({ kind: raw.kind[kind], value }))
    };
}

/**
 * Formatage : transforme les données normalisées en props prêtes à
 * l'emploi pour chaque composant, sans logique de mapping côté UI.
 */

export function formatGreetingsData(userMainData) {
    return { firstName: userMainData.firstName };
}

export function formatScoreData(userMainData) {
    return { todayScore: userMainData.todayScore };
}

export function formatNutrimentsData(userMainData) {
    return {
        calorieCount: userMainData.calorieCount,
        proteinCount: userMainData.proteinCount,
        carbohydrateCount: userMainData.carbohydrateCount,
        lipidCount: userMainData.lipidCount
    };
}

export function formatDailyActivityData(userActivity) {
    return userActivity.sessions.map((session, index) => ({
        day: index + 1,
        kilogram: session.kilogram,
        calories: session.calories
    }));
}

export function formatAverageSessionsData(userAverageSessions) {
    return userAverageSessions.sessions.map((session) => ({
        day: dayLabels[session.day - 1],
        sessionLength: session.sessionLength
    }));
}

export function formatPerformanceData(userPerformance) {
    return [...userPerformance.data]
        .reverse()
        .map(({ kind, value }) => ({
            subject: performanceKindLabels[kind],
            value
        }));
}

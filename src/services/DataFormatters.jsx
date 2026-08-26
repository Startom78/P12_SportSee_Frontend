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

/**
 * Normalise les données principales d'un utilisateur.
 * @param {Object} raw - Données brutes (API ou mock)
 * @returns {Object} Données utilisateur normalisées
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

/**
 * Normalise les données d'activité quotidienne d'un utilisateur.
 * @param {Object} raw - Données brutes (API ou mock)
 * @returns {Object} Données d'activité normalisées
 */
export function normalizeUserActivity(raw) {
    return {
        userId: raw.userId,
        sessions: raw.sessions.map(({ day, kilogram, calories }) => ({ day, kilogram, calories }))
    };
}

/**
 * Normalise les données de durée moyenne des sessions d'un utilisateur.
 * @param {Object} raw - Données brutes (API ou mock)
 * @returns {Object} Données de sessions normalisées
 */
export function normalizeUserAverageSessions(raw) {
    return {
        userId: raw.userId,
        sessions: raw.sessions.map(({ day, sessionLength }) => ({ day, sessionLength }))
    };
}

/**
 * Normalise les données de performance d'un utilisateur.
 * @param {Object} raw - Données brutes (API ou mock)
 * @returns {Object} Données de performance normalisées
 */
export function normalizeUserPerformance(raw) {
    return {
        userId: raw.userId,
        data: raw.data.map(({ kind, value }) => ({ kind: raw.kind[kind], value }))
    };
}


/**
 * Extrait les données du message de bienvenue.
 * @param {Object} userMainData - Données utilisateur normalisées
 * @returns {Object} Prénom de l'utilisateur
 */
export function formatGreetingsData(userMainData) {
    return { firstName: userMainData.firstName };
}

/**
 * Extrait le score du jour.
 * @param {Object} userMainData - Données utilisateur normalisées
 * @returns {Object} Score du jour
 */
export function formatScoreData(userMainData) {
    return { todayScore: userMainData.todayScore };
}

/**
 * Extrait les données nutritionnelles.
 * @param {Object} userMainData - Données utilisateur normalisées
 * @returns {Object} Comptes de calories, protéines, glucides et lipides
 */
export function formatNutrimentsData(userMainData) {
    return {
        calorieCount: userMainData.calorieCount,
        proteinCount: userMainData.proteinCount,
        carbohydrateCount: userMainData.carbohydrateCount,
        lipidCount: userMainData.lipidCount
    };
}

/**
 * Formate les sessions d'activité pour le graphique quotidien.
 * @param {Object} userActivity - Données d'activité normalisées
 * @returns {Array<Object>} Sessions avec numéro de jour, poids et calories
 */
export function formatDailyActivityData(userActivity) {
    return userActivity.sessions.map((session, index) => ({
        day: index + 1,
        kilogram: session.kilogram,
        calories: session.calories
    }));
}

/**
 * Formate les sessions moyennes avec labels de jour lisibles.
 * @param {Object} userAverageSessions - Données de sessions normalisées
 * @returns {Array<Object>} Sessions avec label de jour et durée
 */
export function formatAverageSessionsData(userAverageSessions) {
    return userAverageSessions.sessions.map((session) => ({
        day: dayLabels[session.day - 1],
        sessionLength: session.sessionLength
    }));
}

/**
 * Formate les données de performance pour le graphique radar.
 * @param {Object} userPerformance - Données de performance normalisées
 * @returns {Array<Object>} Données avec libellé de catégorie et valeur, ordre inversé
 */
export function formatPerformanceData(userPerformance) {
    return [...userPerformance.data]
        .reverse()
        .map(({ kind, value }) => ({
            subject: performanceKindLabels[kind],
            value
        }));
}

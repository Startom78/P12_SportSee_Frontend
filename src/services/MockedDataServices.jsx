import mockedData from './mockeddata.jsx';

export function findInMockedData(collectionKey, userId, matchKey) {
    return mockedData[collectionKey].find((item) => item[matchKey] === userId) ?? null;
}

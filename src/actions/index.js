export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDeleted = (heroes) => {
    return {
        type: 'HEROES_DELETED',
        payload: heroes
    }
}

export const heroesPosted = (heroes) => {
    return {
        type: 'HEROES_POSTED',
        payload: heroes
    }
}
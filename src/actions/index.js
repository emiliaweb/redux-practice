import { createAction } from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
} 

export const fetchFilters = request => dispatch => {
    dispatch(filtersFetching());
        request('http://localhost:3001/filters')
            .then(data => dispatch(setFilters(data)))
            .catch(() => dispatch(filtersFetchingError()));
}

export const heroesFetching = createAction('HEROES_FETCHING');

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

export const heroesFetched = createAction('HEROES_FETCHED');

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

export const heroesDeleted = createAction('HEROES_DELETED');

export const heroesPosted = createAction('HEROES_POSTED');

export const setFilters = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const setActiveFilter = (filter) => {
    return {
        type: 'SET_ACTIVE_FILTER',
        payload: filter
    }
}
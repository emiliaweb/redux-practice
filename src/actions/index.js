import {heroesFetching, heroesFetched, heroesFetchingError} from '../components/heroesList/heroesSlice';
import {setFilters, filtersFetching, filtersFetchingError, setActiveFilter} from '../components/heroesFilters/filtersSlice';

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

// export const heroesFetching = createAction('HEROES_FETCHING');

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetched = createAction('HEROES_FETCHED');

// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

// export const heroesDeleted = createAction('HEROES_DELETED');

// export const heroesPosted = createAction('HEROES_POSTED');
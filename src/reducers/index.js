const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETED': 
            const newHeroes = state.heroes.filter((hero) => hero.id !== action.payload);
            return {
                ...state, 
                heroes: newHeroes
            }
        case 'SET_FILTERS': 
            return {
                ...state, 
                filters: action.payload
            }
        case 'SET_ACTIVE_FILTER': 
            return {
                ...state, 
                activeFilter: action.payload
            }
        default: return state
    }
}

export default reducer;
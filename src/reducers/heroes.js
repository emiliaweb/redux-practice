import { createReducer } from "@reduxjs/toolkit"

import { 
    heroesFetched,
    heroesFetching,
    heroesFetchingError,
    heroesDeleted,
    heroesPosted
} from "../actions"

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading'
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroes = action.payload;
            state.heroesLoadingStatus = 'idle';
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroesPosted, (state, action) => {
            state.heroes.push(action.payload);
            state.heroesLoadingStatus = 'idle';
        })
        .addCase(heroesDeleted, (state, action) => {
            state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
        })
        .addDefaultCase(() => {})
})

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_POSTED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HEROES_DELETED': 
//             return {
//                 ...state, 
//                 heroes: state.heroes.filter((hero) => hero.id !== action.payload)
//             }
//         default: return state
//     }
// }

export default heroes;
const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_FILTER': 
            return {
                ...state, 
                activeFilter: action.payload
            }
        case 'FILTERS_FETCHING': 
            return {
                ...state, 
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHING_ERROR': 
            return {
                ...state, 
                filtersLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHED': 
            return {
                ...state, 
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        default: return state
    }
}

export default filters;
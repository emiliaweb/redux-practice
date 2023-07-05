import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
            state.filtersLoadingStatus = 'idle';
        },
        filtersFetching: state => {
            state.filtersLoadingStatus = 'loading';
        },
        filtersFetchingError: state => {
            state.filtersLoadingStatus = 'error';
        },
        setActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        }
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;

export const {
    setFilters, 
    filtersFetching, 
    filtersFetchingError, 
    setActiveFilter
} = actions;
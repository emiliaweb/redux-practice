import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

// в этом способе store хранит в себе только getState и dispatch 
// {dispatch, getState} вместо store 
const stringMiddleware = (store) => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({type: action});
    }
    return dispatch(action);
}

const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);

    const oldDispatch = store.dispatch;
    store.dispatch = action => {
        if (typeof action === 'string') {
            return oldDispatch({type: action});
        } 
        return oldDispatch(action);
    }
    return store;
}

// const store = createStore(
//     combineReducers({heroes, filters}), 
//     compose(
//         enhancer, 
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

const store = createStore(
    combineReducers({heroes, filters}), 
    compose(
        applyMiddleware(ReduxThunk, stringMiddleware), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
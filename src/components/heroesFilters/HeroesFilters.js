import { useEffect } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { setActiveFilter, fetchFilters, selectAll } from "./filtersSlice";
import store from '../../store';

const HeroesFilters = () => {
    const {activeFilter, filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
    }, []);

    const setClassNames = (key, activeFilter) => {
        let classes = '';
        const baseClass = 'btn';
            switch (key) {
                case 'fire': 
                    classes = classNames(baseClass, 'btn-danger');
                    break;
                case 'water': 
                    classes = classNames(baseClass, 'btn-primary');
                    break;
                case 'wind': 
                    classes = classNames(baseClass, 'btn-success');
                    break;
                case 'earth': 
                    classes = classNames(baseClass, 'btn-secondary');
                    break;
                default: 
                    classes = classNames(baseClass, 'btn-outline-dark');
                    break;
            }
        if (key === activeFilter) {
            classes = classNames(classes, 'active');
        }
        return classes;
    }

    const onClick = (data) => {
        dispatch(setActiveFilter(data));
    }

    const renderFilterOptions = () => {
        const entries = Object.entries(filters);
        return filters.map((item) => {
            let classes = setClassNames(item.name, activeFilter);
        
            return <button 
                    onClick={() => onClick(item.name)}
                    className={classes} 
                    key={item.id}>{item.label}</button>
        });
    }

    const renderContent = () => {
        switch (filtersLoadingStatus) {
            case 'loading':
                return <option>Loading...</option>;
            case 'error': 
                return <option className="error-message">Something went wrong</option>;
            case 'idle': 
                return renderFilterOptions();
        }
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
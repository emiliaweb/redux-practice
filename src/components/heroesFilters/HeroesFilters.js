import { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { useHttp } from "../../hooks/http.hook";
import { setFilters, setActiveFilter, filtersFetching, filtersFetchingError } from "../../actions";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters, activeFilter, filtersLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request('http://localhost:3001/filters')
            .then(data => dispatch(setFilters(data)))
            .catch(err => {
                console.log(err);
                dispatch(filtersFetchingError());
            });
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
        return entries.map((item) => {
            let classes = setClassNames(item[0], activeFilter);
        
            return <button 
                    onClick={() => onClick(item[0])}
                    className={classes} 
                    key={item[0]}>{item[1]}</button>
        });
    }

    const renderContent = () => {
        switch (filtersLoadingStatus) {
            case 'loading':
                return <div>Loading...</div>;
            case 'error': 
                return <div className="error-message">Something went wrong</div>;
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
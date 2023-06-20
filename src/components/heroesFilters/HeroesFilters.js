import { useEffect, useState } from "react";
import classNames from "classnames";

import { useHttp } from "../../hooks/http.hook";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const [filters, setFilters] = useState({});
    const {request} = useHttp();

    useEffect(() => {
        request('http://localhost:3001/filters')
            .then(data => setFilters(data));
    }, []);

    const setClassNames = (key) => {
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
        return classes;
    }

    const renderFilterOptions = () => {
        const entries = Object.entries(filters);
        return entries.map((item) => {
            let classes = setClassNames(item[0]);
        
            return <button className={classes} key={item[0]}>{item[1]}</button>
        });
    }
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderFilterOptions()}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
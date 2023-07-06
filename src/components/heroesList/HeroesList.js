import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { heroesDeleted, fetchHeroes } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        state => state.filters.activeFilter,
        state => state.heroes.heroes,
        (filter, heroes) => {
            if (filter === 'all') {
                return heroes;
            } else {
                return heroes.filter(item => item.element === filter);
            }
        }
    )

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);

    const filteredHeroes = useSelector(filteredHeroesSelector);

    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
    }, []);

    const getHeroes = () => {
        dispatch(fetchHeroes());
    }

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(() => {
                dispatch(heroesDeleted(id));
            })
            .then(() => {
                getHeroes();
            })
            .catch(err => {
                console.log(err);
            });
    }, [request])

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem onDelete={onDelete} key={id} id={id} {...props}/>
        });
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const filterElements = (elems, filter) => {
        return elems.filter(item => {
            if (filter === 'all') {
                return item;
            } else {
                return item.element === filter;
            }
        })
    }

    // const elements = renderHeroesList(filterElements(heroes, activeFilter));
    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;
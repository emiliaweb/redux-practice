import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroesDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const heroes = useSelector(state => state.heroes);
    const filteredHeroes = useSelector(state => state.filteredHeroes);
    const heroesLoadingStatus = useSelector(state => state.heroesLoadingStatus);
    const activeFilter = useSelector(state => state.activeFilter);

    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()));
    }, []);

    const getHeroes = () => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()));
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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

import { heroesPosted, heroesFetched, heroesFetching, heroesFetchingError } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const validationSchema = Yup.object({
    name: Yup.string()
            .min(2, 'Минимум два символа')
            .required('Обязательное поле'),
    description: Yup.string()
            .min(10, 'Минимум десять символов')
            .required('Обязательное поле'),
    element: Yup.string()
            .required('Обязательное поле'),
})

const HeroesAddForm = () => {
    const filters = useSelector(state => state.filters);

    const dispatch = useDispatch();
    const {request} = useHttp();

    // useEffect(() => {
    //     request('http://localhost:3001/filters')
    //         .then(data => dispatch(setFilters(data)));
    // }, []);

    const renderFilterOptions = () => {
        const entries = Object.entries(filters);
        return entries.map((item) => {
            const isAll = () => item[0] === 'all';
            return <option key={item[0]} value={!isAll() ? item[0] : null}>{isAll() ? 'Я владею элементом...' : item[1]}</option>
        });
    }

    const getHeroes = () => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()));
    }

    const onSubmit = (values, {resetForm}) => {
        const newValues = {
            ...values,
            id: uuidv4().slice(0, 6)
        }
        request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(newValues))
            .then((data) => {
                // console.log(data);
                dispatch(heroesPosted(data));
            })
            .then(() => {
                resetForm();
                // getHeroes();
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                element: ''
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        required
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                    <ErrorMessage name="name" component="div" className="error-message" />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label fs-4">Описание</label>
                    <Field
                        as="textarea"
                        required
                        name="description" 
                        className="form-control" 
                        id="text" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}/>
                    <ErrorMessage name="description" component="div" className="error-message" />
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field
                        as="select" 
                        required
                        className="form-select" 
                        id="element" 
                        name="element">
                        {renderFilterOptions()}
                    </Field>
                    <ErrorMessage name="element" component="div" className="error-message" />
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;
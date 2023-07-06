import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { heroesPosted } from "../heroesList/heroesSlice";
import { useHttp } from "../../hooks/http.hook";
import store from '../../store';
import { selectAll } from "../heroesFilters/filtersSlice";

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
    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());

    const dispatch = useDispatch();
    const {request} = useHttp();

    const renderFilterOptions = () => {
        switch (filtersLoadingStatus) {
            case 'loading':
                return <option>Loading...</option>;
            case 'error': 
                return <option className="error-message">Something went wrong</option>;
            case 'idle': 
                return filters.map((item) => {
                    const isAll = () => item.name === 'all';
                    return <option key={item.name} value={!isAll() ? item.name : null}>{isAll() ? 'Я владею элементом...' : item.label}</option>
                });
        }
    }

    const onSubmit = (values, {resetForm}) => {
        const newValues = {
            ...values,
            id: uuidv4().slice(0, 6)
        }
        request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(newValues))
            .then((data) => {
                dispatch(heroesPosted(data));
            })
            .then(() => {
                resetForm();
            })
            .catch(err => {
                throw err;
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
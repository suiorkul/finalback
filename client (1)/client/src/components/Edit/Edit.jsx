import React, { useState } from 'react'
import Styles from './Edit.module.css'
import { useHttp } from '../../hooks/http.hook'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useSuccess } from '../../hooks/success.hook'
import { useError } from '../../hooks/error.hook'
// import { useHistory } from 'react-router-dom'

export const Edit = ({data}) => {
    toast.configure({
        autoClose: 3000,
        draggable: true
    })

    const { request, loading, API_URL } = useHttp()
    const successMessage = useSuccess()
    const errorMessage = useError()
    // const history = useHistory()
    const [form, setForm] = useState({
        title: data.title,
        rating: data.rating,
        duration: data.duration
    })


    const updateHandler = async (id) => {
        if (form.title !== '' && form.rating !== '' && form.duration !== '') {
            try {
                successMessage('Изменено')
                await request(
                    `${API_URL}/update/${id}`,
                    'PUT',
                    { ...form }
                )
                // successMessage('Данные о рабочем изменены')
                // history.push('/')
            } catch (e) {
                errorMessage(e)
            }
        } else {
            errorMessage('Поля не должны быть пустыми!')
        }
    }

    const changeHandler = e => {     
        setForm({ 
            ...form, [e.target.name]: e.target.value
        })
    }

    const createForm = [
        { type: 'text', name: 'title', label: 'Название' },
        { type: 'number', name: 'rating', label: 'Рейтинг' },
        { type: 'number', name: 'duration', label: 'Продолжительность' },
    ]

    return (
        <div className={Styles.edit}>
            <div className="container">
                <div className={Styles.block}>
                    <h3 className={Styles.title}>
                        Изменить данные
                    </h3>
                    <form action="#" className={Styles.body}>
                        {
                            createForm
                            ? createForm.map(({ type, name, label }, i) => {
                                return (
                                    <input
                                        key={ i }
                                        type={type}
                                        className={Styles.input}
                                        name={name}
                                        placeholder={label}
                                        autoComplete="off"
                                        value={form[name]}
                                        onChange={changeHandler}
                                    />
                                )
                            }) : ''
                        }
                        <div className={Styles.button}>
                            <button
                                type="submit"
                                onClick={e => {e.preventDefault(); updateHandler(data.id)}}
                                className={loading ? 'loading' : Styles.submit}
                            >
                                Изменить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

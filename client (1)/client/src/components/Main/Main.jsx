import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDelete } from '../../hooks/delete.hook'
import { useHttp } from '../../hooks/http.hook'
import Styles from './Main.module.css'

export const Main = () => {
    const { loading, request, API_URL } = useHttp()
    const [data, setData] = useState([])

    const { deleteHandler } = useDelete()

    useEffect(() => {
        let mounted = true
        try {
            if (mounted) {
                request(`${API_URL}`, "GET", null).then(result => {
                    setData(result)
                })
            }
        } catch (e) {}
        return () => mounted = false
    }, [request, API_URL])

    if (loading) {
        return (
            <div className="container">
                <div className="center">
                    <div className="loading"></div>
                </div>
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div className="container">
                <h2 style={{textAlign: "center", paddingTop: "30px"}}>Ничего нет!</h2>
            </div>
        )
    }

    return (
        <div className={Styles.main}>
            <div className="container">
                <div className={Styles.block}>
                    {
                        data.map(({ id, title, rating, duration }, i) => {
                            return (
                                <div key={ i } className={Styles.item}>
                                    <div className={Styles.text}>
                                        <h3 style={{ marginBottom: '20px' }}>
                                            {title !== null ? title.charAt(0).toUpperCase() + title.slice(1) : 'Not found'}{' '}
                                        </h3>
                                        <p>{rating !== null ? rating : '0'}/10</p>
                                        <p>{duration !== null ? duration : '0'} минут</p>
                                    </div>
                                    <div className={Styles.buttons}>
                                        <NavLink className={Styles.link} to={`/edit/${id}`}>
                                            {/* <i className={`material-icons ${Styles.edit}`}>edit</i> */}
                                            Изменить
                                        </NavLink>
                                        <button onClick={() => {deleteHandler(id)}}>
                                            {/* <i className={`material-icons ${Styles.delete}`}>delete</i> */}
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

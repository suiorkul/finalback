import React from 'react'
import { NavLink } from 'react-router-dom'
import Styles from './Navbar.module.css'

import Logo from './../../cs.png'

export const Navbar = () => {
    return (
        <header className={Styles.navbar}>
            <div className="container">
                <div className={Styles.block}>
                    <NavLink className={Styles.logo} to="/">
                        <img src={ Logo } alt="logo" />
                    </NavLink>
                    <nav className={Styles.navigation}>
                        <ul>
                            <li className={Styles.item}>
                                <NavLink className={Styles.link} to="/add">
                                    {/* <i className={`material-icons ${Styles.icon}`}>person_add</i> */}
                                    Добавить
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

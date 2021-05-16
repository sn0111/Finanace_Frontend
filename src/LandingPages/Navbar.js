import { Fragment } from 'react'
import style from './Navbar.module.css'
export const Navbar = () =>{
    return(
        <Fragment>
            <div className={style.Navbar}>
                <div className={style.brandname}>
                    <p>Brand Name</p>
                </div>
                <ul className={style.navlinks}>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/login">login</a></li>
                    <li><a href="/register">register</a></li>
                </ul>
            </div>
        </Fragment>
    )
}
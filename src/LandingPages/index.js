import { Fragment } from 'react'
import Main from './main'
import { Navbar } from './Navbar'
// import style from './Navbar.module.css'

export const index = ()=>{
    return(
        <Fragment>
            <div style={{backgroundColor:'#4071F4'}} >
                <Navbar/>
                <Main/>
            </div>
        </Fragment>
    )
}
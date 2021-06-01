import React, { Fragment } from 'react'
// import './Navbar.module.css'
import style from './Navbar.module.css'
import img1 from './images/icon.png'
export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <Fragment>
                <div className={style.header1}>
                    <div className={style.row}>
                        <div className={style.col}>
                            <img src={img1} alt="" className={style.img1}/>
                        </div>
                        <div className={style.col} style={{color:'white'}}>
                            <h1>Start your Earnings</h1>
                            <h2>Bid your Earnings</h2>
                            <button>learn more...</button>
                        </div>
                    </div>
                </div>
                <div className={style.header2}>
                    <div className={style.row}>
                        <div className={style.col_3}>
                            <div className={style.content}>
                                <p>
                                Finance is a broad term that describes activities associated with banking,
                                leverage or debt, credit, capital markets, funds, and investments. Basically,
                                 finance represents the getting, the spending, and the management of money
                                </p>
                                <button>show info</button>
                            </div>
                        </div>
                        <div className={style.col_3}>
                            <div className={style.content}>
                                <p>
                                Finance is a broad term that describes activities associated with banking,
                                leverage or debt, credit, capital markets, funds, and investments. Basically,
                                 finance represents the getting, the spending, and the management of money
                                </p>
                                <button>show info</button>

                            </div>
                        </div>
                        <div className={style.col_3}>
                            <div className={style.content}>
                                <p>
                                Finance is a broad term that describes activities associated with banking,
                                leverage or debt, credit, capital markets, funds, and investments. Basically,
                                 finance represents the getting, the spending, and the management of money
                                </p>
                                <button>show info</button>
                            </div>
                        </div>
                        <div className={style.col_3}>
                            <div className={style.content}>
                                <p>
                                Finance is a broad term that describes activities associated with banking,
                                leverage or debt, credit, capital markets, funds, and investments. Basically,
                                 finance represents the getting, the spending, and the management of money
                                </p>
                                <button>show info</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.footer}>
                    <div className={style.row}>
                        <div className={style.col}>
                            <h3>Finance</h3>
                            <p>Make the money safe and earn money</p>
                        </div>
                        <div className={style.col}>
                            <h3>Terms&conditions</h3>
                        </div>
                        <div className={style.col}>
                            <h3>About</h3>
                            <p>Jobs</p>
                            <p>Users</p>
                            <p>Create account</p>
                        </div>
                        <div className={style.col}>
                            <h3>Links</h3>
                            <p>example@email.com</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
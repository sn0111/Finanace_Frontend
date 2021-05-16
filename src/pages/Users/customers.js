import react, { Fragment } from 'react'
import '../pages.css'

export class Customers extends react.Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            action:'list'
        }
    }
    componentDidMount(){
        fetch('http://localhost:3000/customers',{
            method:'GET',
            "headers":{
                "accept": "application/json",
                "content-type": "application/json",
                'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk1ODA5NWJhNDRkNTZlODk0MGRjZGUiLCJpYXQiOjE2MjA3MzE0NDZ9.SvIf2kUphIZQnTjyqRZRDuIS5d_kASWAzq_4825F-Qg"
            },
        }).then(res=>res.json())
        .then(data=>{
            this.setState({
                users:data
            })
            console.log(this.state.users)
        }).catch(err=>console.log(err))
    }
    // style = document.getElementsByClassName("close")[0]

    addcustomer =()=>{
        // this.setState({
        //     action:"add"
        // })
        const modal = document.getElementsByClassName("modal")[0] 
        modal.style.display="block"
    }
    pendingcustomers=()=>{
        this.setState({
            action:"pending"
        })
    }
    close=()=>{
        const modal = document.getElementsByClassName("modal")[0] 
        modal.style.display="none"
    }
    back=()=>{
        this.setState({
            action:"list"
        })
    }
    render(){
        var main;
        if(this.state.action==="list"){
            main=<div className="pages">
                <div className="nav">
                    <div className="nav-link">
                        <p>Users & Customers
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.99984 0L0.589844 1.41L5.16984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0Z" fill="black"/>
                        </svg></p>
                        <p> all Customers</p>
                    </div>
                    <ul className="nav-change">
                        <li><button onClick={this.addcustomer}>Add Customer</button></li>
                        <li><button onClick={this.pendingcustomers}>Pending Customer</button></li>
                        {/* <li><button>Manager User</button></li> */}
                    </ul>
                </div>
                <div className="nav">
                    <form onSubmit={this.find} className="search">
                        <input type="text" name="find" value={this.setState.find}/>
                        <button>Find</button>
                    </form>
                    <ul className="nav-change">
                        <select>
                            <option>active</option>
                            <option>inactive</option>
                        </select>
                    </ul>
                </div>
                <table className="nav-table">
                    <thead>
                        <tr className="table-row">
                            <th>S.No</th>
                            <th>Userphone</th>
                            <th>Username</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((d,index)=>{
                            return <tr className="table-row" key={index}>
                                <td>{d.sno}</td>
                                <td>{d.userphone}</td>
                                <td>{d.username}</td>
                                <td>{d.useremail}</td>
                                <td>{d.status}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <ul className="pagination">
                    <li><a href="/1">1</a></li>
                    <li><a href="/2">2</a></li>
                    <li><a href="/3">3</a></li>
                    <li><a href="/4">4</a></li>
                    <li><a href="/5">next</a></li>
                </ul>
            </div>
        }else if(this.state.action==="pending"){
            main=<div className="pages">
            <div className="na">
                <div className="nav-link">
                    <p>Users & Customers
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.99984 0L0.589844 1.41L5.16984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0Z" fill="black"/>
                    </svg></p>
                    <p> pending Customer</p>
                </div>

            </div>
            <div className="back" onClick={this.back}>
                <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d)">
                <path d="M20 7H7.83L13.42 1.41L12 0L4 8L12 16L13.41 14.59L7.83 9H20V7Z" fill="black"/>
                </g>
                <defs>
                <filter id="filter0_d" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
                </defs>
                </svg>
                <span>back</span>
            </div>


            <table className="nav-table">
                <thead>
                    <tr className="table-row">
                        <th>S.No</th>
                        <th>Userphone</th>
                        <th>Username</th>
                        <th>Useremail</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map((d,index)=>{
                        return <tr className="table-row" key={index}>
                            <td>{d.sno}</td>
                            <td>{d.userphone}</td>
                            <td>{d.username}</td>
                            <td>{d.useremail}</td>
                            <td>{d.status}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <ul className="pagination">
                <li><a href="/1">1</a></li>
                <li><a href="/2">2</a></li>
                <li><a href="/3">3</a></li>
                <li><a href="/4">4</a></li>
                <li><a href="/5">next</a></li>
            </ul>
        </div>
        }
        return(
            <Fragment>
                {main}
                <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h1>Adding new Users</h1>
                    <form className="modal-form">
                        <div className="modal-form-f">
                            <label>userphone</label><br/>
                            <input type="text" name="userphone" value={this.state.userphone}/><br></br>
                        </div>
                        <div className="modal-form-f">
                            <label>username</label><br/>
                            <input type="text" name="username" value={this.state.username}/><br></br>
                        </div>
                        <div className="modal-form-f">
                            <label>employe_id</label><br/>
                            <input type="text" name="employe_id" value={this.state.employe_id}/><br></br>
                        </div>
                        <div className="modal-form-f">
                            <label>useremail</label><br/>
                            <input type="email" name="useremail" value={this.state.useremail}/><br></br>
                        </div>
                        <div className="modal-form-f">
                            <button>submit</button>
                        </div>
                    </form>
                </div>
            </div>
            </Fragment>
        ) 
    }
}
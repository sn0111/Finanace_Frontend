import react, { Fragment } from 'react'
import '../pages.css'

export class Users extends react.Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            action:'list',
            width:window.innerWidth,
            username:'',
            userphone:'',
            useremail:'',
            employe_id:''
        }
    }

    componentDidMount(){
        window.addEventListener('resize', this.handleWindowSizeChange);
        if(!localStorage.getItem('token')){
            window.location.pathname='/login'
        }
        // console.log(localStorage.getItem("account"))
        fetch('/account/users',{
            method:'GET',
            "headers":{
                "accept": "application/json",
                "content-type": "application/json",
                'Authorization':"Bearer "+localStorage.getItem("token"),
                'account':localStorage.getItem('account')
            },
        }).then(res=>res.json())
        .then(data=>{
            if(!data.error){
                this.setState({
                    users:data
                })
            }
        }).catch(err=>console.log(err))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };
    // style = document.getElementsByClassName("close")[0]

    adduser =()=>{
        // this.setState({
        //     action:"add"
        // })
        const modal = document.getElementsByClassName("modal")[0] 
        modal.style.display="block"
    }
    pendingusers=()=>{
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
    change=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    create_user=(e)=>{
        e.preventDefault();
        fetch('/account/users',{
            method:'POST',
            "headers":{
                "accept": "application/json",
                "content-type": "application/json",
                'Authorization':"Bearer "+localStorage.getItem("token"),
                'account':localStorage.getItem('account')
            },
            body:JSON.stringify({
                username:this.state.username,
                userphone:this.state.userphone,
                useremail:this.state.useremail,
                employe_id:this.state.employe_id
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data){
               console.log(data)
            }
        })
        this.close()
        this.componentDidMount()
    }
    cha
    render(){
        const mobile = this.state.width<=650;
        var main;
        if(!mobile){
            if(this.state.action==="list"){
                main=<div className="pages">
                    <div className="nav">
                        <div className="nav-link">
                            <p>Users & Customers
                            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.99984 0L0.589844 1.41L5.16984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0Z" fill="black"/>
                            </svg></p>
                            <p> all users</p>
                        </div>
                        <ul className="nav-change">
                            <li><button onClick={this.adduser}>Add User</button></li>
                            <li><button onClick={this.pendingusers}>Pending User</button></li>
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
                                <th>Useremail</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((d,index)=>{
                                return <tr className="table-row" key={index}>
                                    <td>{d._id}</td>
                                    <td>{d.userphone}</td>
                                    <td>{d.username}</td>
                                    <td>{d.useremail}</td>
                                    <td>{d.is_staff}</td>
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
            }else if(this.state.action==="add"){
                main=<div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.close}>&times;</span>
                        <form>
                            <input type="text" name="username" value={this.state.username}/><br></br>
                            <input type="text" name="username" value={this.state.username}/><br></br>
                            <input type="text" name="username" value={this.state.username}/><br></br>
                        </form>
                    </div>
                </div>
            }else if(this.state.action==="pending"){
                main=<div className="pages">
                <div className="na">
                    <div className="nav-link">
                        <p>Users & Customers
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.99984 0L0.589844 1.41L5.16984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0Z" fill="black"/>
                        </svg></p>
                        <p> pending users</p>
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
        }
        else{
            main=<div className="pages">
            <div className="nav">
                {/* <div className="nav-link">
                    <p>Users & Customers
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.99984 0L0.589844 1.41L5.16984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0Z" fill="black"/>
                    </svg></p>
                    <p> all users</p>
                </div> */}
                <ul className="nav-change">
                    <li><button onClick={this.adduser}>Add User</button></li>
                    <li><button onClick={this.pendingusers}>Pending User</button></li>
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
            <div className="mobile-table">
                {this.state.users.map((d,index)=>{
                    return <ul className="" key={index} style={{listStyleType:"none"}}>
                        {/* <li>{d.sno}</li> */}
                        <li>Phone: {d.userphone}</li>
                        <li>Name: {d.username}</li>
                        <li>Mail: {d.useremail}</li>
                        <li>Status: {d.status}</li>
                    </ul>
            })}
            </div>
        </div>
        }
        return(
            <Fragment>
                {main}
                <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h1>Adding new Users</h1>
                    <form className="modal-form" onSubmit={this.create_user}>
                        <div className="modal-form-f">
                            <label>userphone</label><br/>
                            <input type="text" name="userphone" value={this.state.userphone} onChange={this.change}/><br></br>
                        </div>
                        <div className="modal-form-f">
                            <label>username</label><br/>
                            <input type="text" name="username" value={this.state.username} onChange={this.change}/><br></br>
                        </div>
                        <div className="modal-form-f">
                            <label>employe_id</label><br/>
                            <input type="text" name="employe_id" value={this.state.employe_id} onChange={this.change}/><br></br>
                        </div>
                        <div className="modal-form-f">
                            <label>useremail</label><br/>
                            <input type="email" name="useremail" value={this.state.useremail} onChange={this.change}/><br></br>
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
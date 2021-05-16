import react from 'react'
import { Link } from 'react-router-dom';

export default class Sidebar extends react.Component{
    constructor(props){
        super(props);
        this.state={
            dashboard:false,
            payments:false,
            bidding:false,
            users:false,
            settings:false
        }
    }
    side_settings=()=>{
        this.setState({
            settings:!this.state.settings,
            users:false,
        })
    }
    side_users=()=>{
        this.setState({
            users:!this.state.users,
            settings:false
        })
    }
    render(){
        return(
            <div className="sidebar">
                <div className="sidebar-top">
                    <span>Finance</span>
                </div>
                <div className="sidebar-next">
                    <div className="sidebar-line">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="black"/>
                        </svg>
                        <Link to="/home/dashboard">Dashboard</Link>
                    </div>
                    <div className="sidebar-line">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="black"/>
                        </svg>
                        <Link to="/home/payments">Payments</Link>
                    </div>
                    <div className="sidebar-line">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="black"/>
                        </svg>
                        <Link to="/home/bidding">Bidding</Link>
                    </div>
                    <div className="sidebar-line" onClick={this.side_users}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="black"/>
                        </svg>
                        <span>Users & Customers</span>
                    </div>
                    { this.state.users?<div className="sidebar-sub">
                            <p><Link to="/home/users">Users</Link></p>
                            <p><Link to="/home/customers">Customers</Link></p>
                    </div>:null}
                    <div className="sidebar-line" onClick={this.side_settings}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="black"/>
                        </svg>
                        <span>Settings</span>
                    </div>
                    { this.state.settings?<div className="sidebar-sub">
                            <p><Link to="/home/office">office&Accounts</Link></p>
                            <p><Link to="/home/settings">profile</Link></p>
                    </div>:null}
                </div>
            </div>
        )
    }
}
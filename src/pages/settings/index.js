import { Component } from "react";
import img from './index.jpeg'
export class Settings extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            userphone:'',
            useremail:'',
            mailotp:'',
            phoneotp:'',
            otp:false,
            mail:false,
            move:1,
            password:'',
            old_password:'',
            confirm_password:''
        }
    }
    change=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    sendotp=(e)=>{
        e.preventDefault();
        this.setState({
            otp:true
        })
    }
    sendmail=(e)=>{
        e.preventDefault();
        this.setState({
            mail:true
        })
    }
    change_action=(e)=>{
        this.setState({
            move:e.target.value
        })
    }
    render(){
        var main;
        if(this.state.move===1){
            main=<form className="setting-main">
            <div className="setting-form">
                <label>Username</label><br/>
                <input type="text" name="username" value={this.state.username} onChange={this.change}/>
                <button>update</button>
            </div>
            <div className="setting-form">
                <label>Userphone</label><br/>
                <input type="tel" name="userphone" value={this.state.userphone} onChange={this.change}/>
                <button onClick={this.sendotp}>sendotp</button>
            </div>
            {
                this.state.otp?<div className="setting-form">
                <input type="text" name="phoneotp" value={this.state.phoneotp} onChange={this.change}/>
                <button>verify</button>
            </div>:null
            }
            <div className="setting-form">
                <label>Useremail</label><br/>
                <input type="email" name="useremail" value={this.state.useremail} onChange={this.change}/>
                <button onClick={this.sendmail}>sendmail</button>
            </div>
            {
                this.state.mail?<div className="setting-form">
                <input type="text" name="mailotp" value={this.state.mailotp} onChange={this.change}/>
                <button>verify</button>
            </div>:null
            }
        </form>
        }
        else if(this.state.move===2){
            main=<form className="setting-main">
            <div className="setting-form">
                <label>Old Password</label><br/>
                <input type="password" name="old_password" value={this.state.old_password} onChange={this.change}/>
            </div>
            <div className="setting-form">
                <label>New Password</label><br/>
                <input type="password" name="password" value={this.state.password} onChange={this.change}/>
            </div>
            <div className="setting-form">
                <label>Confirm Password</label><br/>
                <input type="password" name="confirm_password" value={this.state.confirm_password} onChange={this.change}/>
            </div>
            <div className="setting-form">
                <button>Update</button>
            </div>
        </form>
        }
        else{
            main=<div className="setting-main">
                <img src={img} alt="kssk"/>
                <form>
                    <input type="file" name="profile"/><br/>
                    <button onClick={this.update}>Update</button>
                </form>
            </div>
        }
        return(
            <div className="pages">
                <div className="setting-nav">
                    <div className="nav-link">
                        <p>Users & Customers
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.99984 0L0.589844 1.41L5.16984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0Z" fill="black"/>
                        </svg></p>
                        <p> all users</p>
                    </div>
                </div>
                <div className="setting-body">
                    <ul className="setting-links">
                        <li onClick={this.change_action} value="1">Account Details<hr></hr></li>
                        <li onClick={this.change_action} value="2">Password Update<hr></hr></li>
                        <li onClick={this.change_action} value="3">Profile Pic Update<hr></hr></li>
                    </ul>
                    {main}
                </div>
            </div>
        )
    }
}
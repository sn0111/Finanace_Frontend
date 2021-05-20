import react, { Fragment } from 'react'
import './authentication.css';


export default class Register extends react.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            userphone:'',
            useremail:'',
            password:'',
            error:'',
            mail:false,
            step:1,
            errormsg:'',
            officename:'',
            officetype:'',
            address:'',
            phoneno:'',
            pincode:'',
            state:'',
            city:''
        }
    }
    submit = (e)=>{
        e.preventDefault();
        this.setState({
            error:"",
            errormsg:""
        })
        if(this.state.userphone===""){
            this.setState({
                error:"userphone",
                errormsg:"please enter the userphone"
            })
        }else if(this.state.userphone.length<10){
            this.setState({
                error:"userphone",
                errormsg:"phone length should be equal to 10"
            })
        }else if(this.state.username===""){
            this.setState({
                error:"username",
                errormsg:"please enter the username"
            })
        }else if(this.state.useremail===""){
            this.setState({
                error:"useremail",
                errormsg:"please enter the useremail"
            })
        }else if(this.state.password===""){
            this.setState({
                error:"password",
                errormsg:"please enter the password"
            })
        }else{
            fetch('fin/register',{
                method:'POST',
                'headers':{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    "userphone":this.state.userphone,
                    "username":this.state.username,
                    "useremail":this.state.useremail,
                    "password":this.state.password
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.step==="1"){
                    console.log("step 1 registration failed")
                }
                else if(data.token){
                    localStorage.setItem('token',data.token)
                    // window.location.pathname='/home/users'
                    this.setState({
                        step:2
                    })
                }
            })
            .catch(console.log)
        }
    }
    submit2=(e)=>{
        e.preventDefault();
        if(this.state.officename===""){
            this.setState({
                errormsg:'please fill above box',
                error:"officename"
            })
        }else if(this.state.officetype===""){
            this.setState({
                errormsg:'please fill above box',
                error:"officetype"
            })
        }else if(this.state.address===""){
            this.setState({
                errormsg:'please fill above box',
                error:"address"
            })
        }else if(this.state.phoneno===""){
            this.setState({
                errormsg:'please fill above box',
                error:"phoneno"
            })
        }else if(this.state.pincode===""){
            this.setState({
                errormsg:'please fill above box',
                error:"pincode"
            })
        }else if(this.state.state===""){
            this.setState({
                errormsg:'please fill above box',
                error:"state"
            })
        }else if(this.state.city===""){
            this.setState({
                errormsg:'please fill above box',
                error:"city"
            })
        }else{
            fetch('/office',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+localStorage.getItem('token')
                },
                body:JSON.stringify({
                    "office_name":this.state.officename,
                    "office_type":this.state.officetype,
                    "address":this.state.address,
                    "phone_no":this.state.phoneno,
                    "pin_code":this.state.pincode,
                    "state":this.state.state,
                    "city":this.state.city,
                })
            }).then(res=>res.json())
            .then(data=>{
                if(!data.user){
                    this.setState({
                        errormsg:'creating office failed',
                        error:'city'
                    })
                }else{
                    window.location.pathname='/home/dashboard'   
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }
    change = (e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    sendEail =(e)=>{
        e.preventDefault()
        this.setState({
            mail:true
        })
    }
    render(){
        var main;
        if(this.state.step===1){
            main =<form onSubmit={this.submit} className="">
                <div className="auth-input">
                    <label>Userphone</label><br/>
                    <input type="text" name='userphone' value={this.state.userphone} onChange={this.change}/>
                    {this.state.error==="userphone"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
                </div>
                <div className="auth-input">
                    <label>Username</label><br/>
                    <input type="text" name='username' value={this.state.username} onChange={this.change}/>
                    {this.state.error==="username"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
                </div>
                <div className="auth-input">
                    <label>Useremail</label><br/>
                    <div className="auth-send">
                        <input type="email" name='useremail' value={this.state.useremail} onChange={this.change}/>
                        <button onClick={this.sendEail}>send</button>
                    </div>
                    {this.state.error==="useremail"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}

                </div>
                {
                    this.state.mail?<div className="auth-input">
                    <label></label><br/>
                    <div className="auth-send">
                        <input type="text" name='email_otp' value={this.state.email_otp} placeholder="Enter the otp" onChange={this.change}/>
                        <button>verify</button>
                    </div>
                </div>:null
                }
                <div className="auth-input">
                    <label>Password</label><br/>
                    <input type="password" name='password' value={this.state.password} onChange={this.change}/>
                    {this.state.error==="password"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
                </div>
                <div className="auth-input">
                    <input type="submit" name="Submit"></input>
                </div>
                <p className="auth-text">Already have an account? click <a href="/login">here</a></p>
            </form>
        }
        else if(this.state.step===2){
            main=<form onSubmit={this.submit2} className="">
            <div className="auth-input">
                <label>Office Name</label><br/>
                <input type="text" name='officename' value={this.state.officename} onChange={this.change}/>
                {this.state.error==="officename"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
            </div>
            <div className="auth-input">
                <label>Office Type</label><br/>
                <input type="text" name='officetype' value={this.state.officetype} onChange={this.change}/>
                {this.state.error==="officetype"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
            </div>
            <div className="auth-input">
                <label>Address</label><br/>
                <input type="text" name='address' value={this.state.address} onChange={this.change}/>
                {this.state.error==="address"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
            </div>
            <div className="auth-input">
                <label>Phone Number</label><br/>
                <input type="text" name='phoneno' value={this.state.phoneno} onChange={this.change}/>
                {this.state.error==="phoneno"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
            </div>
            <div className="auth-input">
                <label>Pincode</label><br/>
                <input type="text" name='pincode' value={this.state.pincode} onChange={this.change}/>
                {this.state.error==="pincode"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
            </div>
            <div className="auth-input">
                <label>State</label><br/>
                <input type="text" name='state' value={this.state.state} onChange={this.change}/>
                {this.state.error==="state"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}

            </div>
            <div className="auth-input">
                <label>city</label><br/>
                <input type="text" name='city' value={this.state.city} onChange={this.change}/>
                {this.state.error==="city"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
            </div>
            <div className="auth-input">
                <input type="submit" name="Submit"></input>
            </div>
        </form>
        }
        return(
            <Fragment>
                <div className="authentication">
                    <div className="auth-left">
                        <span>Register Page</span>
                    </div>
                    <div className="auth-right">
                        <p>Create account--------- step 1</p>
                        {main}
                    </div>
                </div>
            </Fragment>
        )
    }
}
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
            city:'',
            amount:'',
            required_holders:'',
            no_of_times:'',
            type_value:'days'

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
                    this.setState({
                        step:3
                    })
                    // window.location.pathname='/home/dashboard'   
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }
    submit3=(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({
            account_amount:this.state.amount,
            required_holders:this.state.required_holders,
            no_of_times:this.state.no_of_times,
            type:this.state.type_value,
        }))
        if(this.state.amount===""){
            this.setState({
                errormsg:'please fill the above box',
                error:'amount'
            })
        }else if(this.state.required_holders===""){
            this.setState({
                errormsg:'please fill the above box',
                error:'required_holders'
            })
        }else if(this.state.no_of_times===""){
            this.setState({
                errormsg:'please fill the above box',
                error:'no_of_times'
            })
        }else{
            fetch('/account',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+localStorage.getItem('token')
                },
                body:JSON.stringify({
                    account_amount:this.state.amount,
                    total_holders:this.state.total_holders,
                    no_of_times:this.state.no_of_times,
                    type:this.state.type_value,
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    this.setState({
                        errormsg:'creating account failed',
                        error:'no_of_times'
                    })
                }else{
                    localStorage.setItem('account',data._id)
                    window.location.pathname='/home/dashboard'   
                }
            }).catch(e=>console.log(e))
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
            main =<div className="auth-right">
            <p>Creating User in step 1....</p>
                <form onSubmit={this.submit} className="">
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
                    <p className="auth-text">Already have an account? click <a href="/login"><span style={{color:"red"}}>here</span></a></p>
                </form>
            </div>
        }
        else if(this.state.step===2){
            main=<div className="auth-right">
            <p>Creating Office in step 2....</p>
                <form onSubmit={this.submit2} className="">
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
        </div>
        }else if(this.state.step===3){
            main=<div className="auth-right">
                <p>Creating Account in step 3....</p>
                <form className="" onSubmit={this.submit3}>
                <div className="auth-input">
                    <label>Amount</label><br/>
                    <input type="text" name="amount" value={this.state.amount} onChange={this.change}/>
                    {this.state.error==="amount"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
                </div>
                <div className="auth-input">
                    <label>Required holders</label><br/>
                    <input type="text" name="required_holders" value={this.state.required_holders} onChange={this.change}/>
                    {this.state.error==="required_holders"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
                </div>
                <div className="auth-select">
                    <label>No of times</label><br></br>
                    <input type="text" name="no_of_times" value={this.state.no_of_times} onChange={this.change}/>
                    <select onChange={this.select_change} value={this.state.type_value}>
                        <option value="days">days</option>
                        <option value="weeks">weeks</option>
                        <option value="months">months</option>
                    </select>
                    {this.state.error==="no_of_times"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
                </div>
                <div className="auth-inpu">
                    <br/>
                    <button>Go to dashboard</button>
                </div>
            </form>
        </div>
        }
        return(
            <Fragment>
                <div className="authentication">
                    <div className="auth-left">
                        <span>Register Page</span>
                    </div>
                    {main}
                </div>
            </Fragment>
        )
    }
}
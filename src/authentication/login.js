import react ,{Fragment} from 'react'
import './authentication.css';


export default class Login extends react.Component{
    constructor(props){
        super(props);
        this.state={
            userphone:'',
            password:'',
            errormsg:'',
            error:''
        }
    }
    componentDidMount(){
        if(localStorage.getItem('token')){
            window.location.pathname='/home/office'
        }
    }
    submit=(e)=>{
        e.preventDefault();
        this.setState({
            errormsg:"",
        })
        if(this.state.userphone===""){
            this.setState({
                error:"userphone",
                errormsg:"please enter the username"
            })
        }else if(this.state.userphone.length<10){
            this.setState({
                errormsg:"please enter valid phone number",
                error:"userphone"
            })
        }
        else if(this.state.password===""){
            this.setState({
                errormsg:"please enter the password",
                error:"password"
            })
        }else if(this.state.userphone.length===10 && this.state.password.length>0){
            fetch(`/fin/login`,{
                method:'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                "body":JSON.stringify({
                    "userphone":this.state.userphone,
                    "password":this.state.password
                }),
                redirect:"follow"
            }).then(res=>res.json())
            .then(data=>{
                if(data.error==="Wrong password"){
                    this.setState({
                        errormsg:data.error,
                        error:"password"
                    })
                }else if(data.error==="wrong userphone or password"){
                    this.setState({
                        errormsg:data.error,
                        error:"userphone"
                    })
                }
                else{
                    console.log(data.user.accounts)
                    localStorage.setItem('token',data.token)
                    localStorage.setItem('account',data.user.accounts[0])
                    window.location.pathname='/home/users'
                    console.log('login success')
                }
                
            })
            .catch(console.log)
        }
    }
    change=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render(){
        var main;
        main=<form onSubmit={this.submit} className="">
        <div className="auth-input">
            <label>Userphone</label><br/>
            <input type="text" name='userphone' value={this.state.userphone} onChange={this.change}/>
            {this.state.error==="userphone"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
        </div>
        <div className="auth-input">
            <label>Password</label><br/>
            <input type="password" name='password' value={this.state.password} onChange={this.change}/>
            {this.state.error==="password"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
        </div>
        <div className="auth-input">
            <input type="submit" name="Submit"></input>
        </div>
        <p className="auth-text">create new account? click <a href="/register"><span style={{color:"red"}}>here</span></a></p>
    </form>
        return(
            <Fragment>
                <div className="authentication">
                    <div className="auth-left">
                        <span>Login Page</span>
                    </div>
                    <div className="auth-right">
                        <p style={{padding:'50px'}}>Login with your credentials</p>
                        {main}
                    </div>
                </div>
            </Fragment>
        )
    }
}
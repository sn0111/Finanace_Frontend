import React from 'react'
import io from 'socket.io-client';

let socket = io("/")


export class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            chatData:[],
            id:'',
            message:'',
        }
    }
    componentDidMount(){
        socket.emit("socket id",localStorage.getItem("token"))
        socket.on("socket id",user_id=>{
            this.setState({
                id:user_id
            })
        })
        // socket.on("message",(message)=>{
        //     // console.log(message)
        //     this.state.chatData.push(message)
        // })
        fetch('/bidding',{
            method:'GET',
            "headers":{
              "accept": "application/json",
              "content-type": "application/json",
              'Authorization':"Bearer "+localStorage.getItem("token"),
              'account':localStorage.getItem('account')
            }
          }).then(res=>res.json())
          .then(data=>{
            // console.log(data[0].message)
            if(!data.error){
              this.setState({
                  chatData:data
              })
            }
        })
    }
    componentDidUpdate(){
        socket.on("message",(message)=>{
            // console.log(message)
            this.state.chatData.push(message)
        })
    }
    change=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submit=(e)=>{
        e.preventDefault();
        const messageObject={
            message:this.state.message,
            user:this.state.id,
            account_id:localStorage.getItem('account'),
            token:localStorage.getItem('token')
        }
        socket.emit("send message",messageObject);
        this.setState({
            message:''
        })
    }
    render(){
        return(
            <div className="pages">
            <div className="chat">
            {this.state.chatData.map((c,k)=>{
                console.log("user_id   "+this.state.id)
                console.log("c  id   "+c.user)
                if(c.user===this.state.id){
                  return <div className="my-row" key={k}>
                  <div className="my-msg">{c.message}</div>
                </div>
                }else{
                  return<div className="left-row" key={k}>
                  <div className="left-msg">{c.message}</div>
                </div>
                }
            })}
            </div>
            <form onSubmit={this.submit} className="bidding-form"> 
              {/* <input type="text" name="name" onChange={(e) => onTextChange(e)} value={state.name}/><br></br> */}
      
              <input type="text" name="message" onChange={this.change} value={this.state.message}/>
              <button>Send msg</button>
            </form>
            
          </div>
        )
    }
}
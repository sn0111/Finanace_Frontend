import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./app.css";


let socket = io("localhost:3000/");
// const CONNECTION_PORT = "localhost:3000/";
var Data=[]
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
    Data=data
    // setChat(data)
    // setId(data[0].account)
  }
  // console.log(dataS)
})
export const Bidding =()=>{
  const [id , setId] = useState()
  const [message , setMessage] = useState("")
  // const [ state, setState ] = useState({ message: "", name: "" ,id:""})
	const [ chat, setChat ] = useState([])
  // const [data, setData] = useState([])
  // setChat(Data)
  console.log(Data)
  // const socketRef =useRef();
  useEffect(()=>{
    setChat(Data)
  })
  useEffect(()=>{
    // socketRef.current = io.connect('http://localhost:3000/')
    socket.emit("socket id",localStorage.getItem("token"))
    socket.on("socket id",id=>{
      setId(id);
    })
    socket.on("message",(message)=>{
      receivedMessage(message);
    })

  })

  function receivedMessage(message){
    setChat([ ...chat, message ]);
  }

  function submit(e){
    e.preventDefault();
    const messageObject={
      message:message,
      id:id,
      account_id:localStorage.getItem('account'),
      token:localStorage.getItem('token')
    }
    // console.log(messageObject)
    socket.emit("send message",messageObject);
    setMessage("")
  }

  function change(e){
		setMessage(e.target.value)
	}
  // useEffect(()=>{
  //   socket.
  // })
  // useEffect(()=>{
  //   socket.on("message", ({ name, message }) => {
  //     setChat([ ...chat, { name, message } ])
  //   })
  // })
	// const submit = (e) => {
	// 	const { name, message } = state
	// 	socket.emit("message", { name, message })
	// 	e.preventDefault()
  //   // setChat([ ...chat, { name, message } ])
	// 	setState({ message: "", name })
	// }
  return(
    <div className="pages">
      <div className="chat">
      {chat.map((c,k)=>{
          // console.log(Data)
          // console.log(c._id)
          // console.log(id)
          if(c.user===id){
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
      <form onSubmit={submit} className="bidding-form"> 
        {/* <input type="text" name="name" onChange={(e) => onTextChange(e)} value={state.name}/><br></br> */}

        <input type="text" name="message" onChange={change} value={message}/>
        <button>Send msg</button>
      </form>
    </div>
  //   <Page>
  //   <Container>
  //     {chat.map((message, index) => {
  //       if (message.id === id) {
  //         return (
  //           <MyRow key={index}>
  //             <MyMessage>
  //               {message.body}
  //             </MyMessage>
  //           </MyRow>
  //         )
  //       }
  //       return (
  //         <PartnerRow key={index}>
  //           <PartnerMessage>
  //             {message.body}
  //           </PartnerMessage>
  //         </PartnerRow>
  //       )
  //     })}
  //   </Container>
  //   <Form onSubmit={submit}>
  //     <TextArea value={message} onChange={change} placeholder="Say something..." />
  //     <Button>Send</Button>
  //   </Form>
  // </Page>
  )
}

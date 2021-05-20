import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./app.css";
import styled from "styled-components";


const Page = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  background-color: #46516e;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 500px;
  overflow: auto;
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 25px;
`;

const TextArea = styled.textarea`
  width: 98%;
  height: 100px;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: transparent;
  border: 1px solid lightgray;
  outline: none;
  color: lightgray;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: lightgray;
  }
`;

const Button = styled.button`
  background-color: pink;
  width: 100%;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: #46516e;
  font-size: 17px;
`;

const Form = styled.form`
  width: 400px;
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MyMessage = styled.div`
  width: 45%;
  background-color: pink;
  color: #46516e;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-top-right-radius: 10%;
  border-bottom-right-radius: 10%;
`;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styled.div`
  width: 45%;
  background-color: transparent;
  color: lightgray;
  border: 1px solid lightgray;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-top-left-radius: 10%;
  border-bottom-left-radius: 10%;
`;

let socket = io("localhost:3000/");
// const CONNECTION_PORT = "localhost:3000/";

export const Bidding =()=>{
  const [id , setId] = useState()
  const [message , setMessage] = useState("")
  // const [ state, setState ] = useState({ message: "", name: "" ,id:""})
	const [ chat, setChat ] = useState([])

  // const socketRef =useRef();

  useEffect(()=>{
    // socketRef.current = io.connect('http://localhost:3000/')
    socket.on("socket id",id=>{
      setId(id);
      // console.log(id)
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
    console.log(messageObject)
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
          if(c.id==id){
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


import React, { useState, useEffect } from "react";
import io from "socket.io-client";
// import "./App.css";

let socket;
const CONNECTION_PORT = "http://localhost:3000/";

export function Bidding() {

  socket = io(CONNECTION_PORT);
  socket.on("connection")

  useEffect(() => {
    console.log("ekkeek")
    socket = io(CONNECTION_PORT);
  });

  return (
    <div className="App">
      Bidding
    </div>
  );
}

// export default App;
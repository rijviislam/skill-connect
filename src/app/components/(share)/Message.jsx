"use client";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
const Message = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  console.log(process.env.NEXT_PUBLIC_SOCKET_SERVER);
  const socket = useMemo(() => io(process.env.NEXT_PUBLIC_SOCKET_SERVER), []);
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    socket.emit("message", {message, room});
    setMessage("");
  };
  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
    });
    socket.on("receive-message", (data) => {
      setMessages((messages)=> [...messages, data]);
    });
    socket.on("welcome", (message) => {
      setMessage(message);
    });
  }, [socket, messages]);
  return (
    <div>
      <h1>SocketId: {socketId}</h1>
      <form onSubmit={handleSubmitMessage}>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id=""
        />
        <br />
        <input
          type="text"
          name="message"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id=""
        />
        <br />
        <input type="submit" value="send" />
      </form>
      <div>
        {
            messages.map((m,i)=>(<p key={i}>{m}</p>))
        }
      </div>
    </div>
  );
};

export default Message;

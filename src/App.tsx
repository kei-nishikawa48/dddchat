import React from "react";
import "./App.css";
import ChatService from "./service/chatService";

function App() {
  const { chats, createChat, deleteChat, updateChat } = ChatService();
  const [message, setMessage] = React.useState("");
  const [updateMessage, setUpdateMessage] = React.useState("");
  return (
    <div className="App">
      <input onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => createChat(message)}>create</button>
      {chats.map((item) => {
        return (
          <section key={item.chatId}>
            <p>{item.message.value}</p>
            <button
              onClick={() => {
                deleteChat(item.chatId);
              }}
            >
              delete
            </button>
            <input
              onChange={(e) => {
                setUpdateMessage(e.target.value);
              }}
            />
            <button onClick={() => updateChat(item.chatId, updateMessage)}>
              update
            </button>
          </section>
        );
      })}
    </div>
  );
}

export default App;

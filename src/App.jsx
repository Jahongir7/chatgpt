/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import axios from "axios";
import Loader from "./loader";
import { Icon } from "@iconify/react";

function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  function handleSubmit(event) {
    event.preventDefault();
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: input },
    ]);
    sendMessage(input);
    setInput("");
  }

  function sendMessage(message) {
    const url = "https://api.openai.com/v1/chat/completions";
    const API_KEY = "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";
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };
    setLoading(true);
    axios
      .post(url, data, { headers: headers })
      .then((res) => {
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: res.data.choices[0].message.content },
        ]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }
  console.log(chatLog);
  return (
    <div className="container">
      <h1>ChatGPT</h1>
      <div className="chat_block">
        {chatLog?.map((message, index) => {
          return (
            <div
              key={index}
              className={message.type === "user" ? "right" : "left"}
            >
              {message.message}
            </div>
          );
        })}
        {loading ? <Loader /> : ""}
      </div>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>
          <Icon icon="icon-park-outline:send" />
        </button>
      </form>
    </div>
  );
}

export default App;

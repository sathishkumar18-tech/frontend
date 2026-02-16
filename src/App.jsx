import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const API = import.meta.env.VITE_API_URL;


  const sendMessage = async () => {
    await axios.post(`${API}/message`, { text });
    loadMessages();
  };

  const loadMessages = async () => {
    const res = await axios.get(`${API}/messages`);
    setMessages(res.data);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div>
      <h1> Messages</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={sendMessage}>Send</button>

      <ul>
        {messages.map((m) => (
          <li key={m.id}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

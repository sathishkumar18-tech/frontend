import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  // ✅ ENV variable (from Vercel)
   const API = "https://backend-1-4twd.onrender.com";
;

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(`${API}/message`, { text });
      setText(""); // clear input
      loadMessages();
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  const loadMessages = async () => {
    try {
      const res = await axios.get(`${API}/messages`);
      setMessages(res.data);
    } catch (err) {
      console.error("Load error:", err);
    }
  };

  useEffect(() => {
    if (API) {
      loadMessages();
    } else {
      console.error("API URL is undefined");
    }
  }, [API]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Messages</h1>

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

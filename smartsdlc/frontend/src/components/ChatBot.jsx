import { useState } from "react";
import { postJSON } from "../api";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  async function handleSend() {
    if (!message) return;
    const res = await postJSON("/api/chat", { message });
    setMessages([...messages, { user: message, bot: res.answer }]);
    setMessage("");
  }

  return (
    <div>
      <div style={{ maxHeight: 300, overflowY: "auto", border: "1px solid #ccc", padding: 8 }}>
        {messages.map((m, i) => (
          <p key={i}><strong>You:</strong> {m.user}<br /><strong>Bot:</strong> {m.bot}</p>
        ))}
      </div>
      <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Ask something..." className="border w-3/4 px-2 py-1" />
      <button onClick={handleSend} className="border px-2 py-1">Send</button>
    </div>
  );
}

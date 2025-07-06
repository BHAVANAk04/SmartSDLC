import { useState } from "react";
import { postJSON } from "../api";

export default function CodeSummarizer() {
  const [code, setCode] = useState("");
  const [summary, setSummary] = useState("");

  async function handleSummarize() {
    const res = await postJSON("/api/summarize", { code });
    setSummary(res.summary);
  }

  return (
    <div>
      <textarea value={code} onChange={e => setCode(e.target.value)} placeholder="Paste code..." />
      <button onClick={handleSummarize} className="border px-2 py-1">Summarize</button>
      {summary && <pre>{summary}</pre>}
    </div>
  );
}

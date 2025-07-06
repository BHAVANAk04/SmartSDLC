import { useState } from "react";
import { postJSON } from "../api";

export default function CodeGenerator() {
  const [spec, setSpec] = useState("");
  const [language, setLanguage] = useState("Python");
  const [code, setCode] = useState("");

  async function handleGenerate() {
    const res = await postJSON("/api/generate-code", { spec, language });
    setCode(res.code);
  }

  return (
    <div>
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option>Python</option>
        <option>JavaScript</option>
        <option>Java</option>
      </select>
      <textarea value={spec} onChange={e => setSpec(e.target.value)} placeholder="Describe what to build..." />
      <button onClick={handleGenerate} className="border px-2 py-1">Generate</button>
      {code && <pre>{code}</pre>}
    </div>
  );
}

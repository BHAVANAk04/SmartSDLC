import { useState } from "react";
import { postJSON } from "../api";

export default function TestCaseGenerator() {
  const [code, setCode] = useState("");
  const [tests, setTests] = useState("");

  async function handleGenerate() {
    const res = await postJSON("/api/test-cases", { code });
    setTests(res.tests);
  }

  return (
    <div>
      <textarea value={code} onChange={e => setCode(e.target.value)} placeholder="Paste code to test..." />
      <button onClick={handleGenerate} className="border px-2 py-1">Generate Tests</button>
      {tests && <pre>{tests}</pre>}
    </div>
  );
}

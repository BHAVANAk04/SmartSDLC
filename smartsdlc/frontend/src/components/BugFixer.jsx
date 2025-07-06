import { useState } from "react";
import { postJSON } from "../api";

export default function BugFixer() {
  const [inputCode, setInputCode] = useState("");
  const [fixed, setFixed] = useState("");

  async function handleFix() {
    const res = await postJSON("/api/bug-fix", { code: inputCode });
    setFixed(res.fixed_code);
  }

  return (
    <div>
      <textarea value={inputCode} onChange={e => setInputCode(e.target.value)} placeholder="Paste buggy code..." />
      <button onClick={handleFix} className="border px-2 py-1">Fix</button>
      {fixed && <pre>{fixed}</pre>}
    </div>
  );
}

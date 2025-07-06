import { useState } from "react";
import { postFile } from "../api";

export default function RequirementUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  async function handleUpload() {
    if (!file) return;
    const res = await postFile("/api/classify", file);
    setResult(res.data);
  }

  return (
    <div>
      <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="border px-2 py-1 ml-2">Classify</button>
      {result && <pre>{result}</pre>}
    </div>
  );
}

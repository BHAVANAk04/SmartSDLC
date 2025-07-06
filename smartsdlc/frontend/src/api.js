const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function postJSON(path, data) {
  const res = await fetch(\`\${BASE_URL}\${path}\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function postFile(path, file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(\`\${BASE_URL}\${path}\`, {
    method: "POST",
    body: formData
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

import React, { useState, useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import AuthContext from "../../context/AuthContext";

export default function BulkUpload() {
  const { theme } = useContext(ThemeContext);
  const { token: ctxToken } = useContext(AuthContext) || {};
  const token = ctxToken || localStorage.getItem("token");
  const [fileContent, setFileContent] = useState(null);
  const [status, setStatus] = useState("");

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!Array.isArray(parsed)) {
          setStatus("JSON must be an array of movies");
          setFileContent(null);
          return;
        }
        setFileContent(parsed);
        setStatus(`${parsed.length} movies loaded`);
      } catch (err) {
        setStatus("Invalid JSON file");
        setFileContent(null);
      }
    };
    reader.readAsText(f);
  };

  const upload = async () => {
    if (!fileContent) return setStatus("No file loaded");
    setStatus("Uploading...");
    try {
      const res = await fetch("/api/movies/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" },
        body: JSON.stringify(fileContent)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Upload failed");
      setStatus(`Inserted ${json.insertedCount} movies`);
    } catch (err) {
      setStatus(err.message || "Upload failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bulk Upload Movies</h2>
      <div className={`p-4 rounded ${theme==='dark'?'bg-gray-800':'bg-white'}`}>
        <input type="file" accept=".json" onChange={handleFile} />
        <div className="mt-3 flex gap-2">
          <button onClick={upload} className="px-4 py-2 rounded bg-indigo-600 text-white">Upload</button>
        </div>
        <p className="mt-2 text-sm text-gray-400">{status}</p>
      </div>
    </div>
  );
}

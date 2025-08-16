import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./index.css";

// Backend API configuration
const API_BASE = "https://jitendrakolli.me";


function App() {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState("Waiting for input…");
  const [badgeClass, setBadgeClass] = useState("badge badge-none");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || getSystemPref());
  const [healthOk, setHealthOk] = useState(false);

  function getSystemPref() {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  async function predict() {
    setLoading(true);
    setNote("");
    try {
      const res = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ text })
      });
      const data = await res.json();

      if (!res.ok) {
        setPrediction(`Error: ${data.error || res.statusText}`);
        setBadgeClass("badge badge-none");
        return;
      }

      const label = (data.prediction ?? "").trim().toLowerCase();
      if (["true", "real", "genuine"].includes(label)) {
        setPrediction("REAL");
        setBadgeClass("badge badge-true");
      } else if (["fake", "false"].includes(label)) {
        setPrediction("FAKE");
        setBadgeClass("badge badge-fake");
      } else {
        setPrediction(`Prediction: ${data.prediction || "<none>"}`);
        setBadgeClass("badge badge-none");
      }

      if (data.note) setNote(data.note);
    } catch {
      setPrediction("Network error");
      setBadgeClass("badge badge-none");
    } finally {
      setLoading(false);
    }
  }

  function clearForm() {
    setText("");
    setPrediction("Waiting for input…");
    setBadgeClass("badge badge-none");
  }

  function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const samplesTrue = [
    "The Federal Reserve announced today a 0.25% interest rate cut...",
    "The World Health Organization released new guidelines today...",
    "Apple Inc. reported quarterly earnings that exceeded expectations..."
  ];

  const samplesFake = [
    "BREAKING: Scientists discover that vaccines contain microchips...",
    "Local doctors hate this one weird trick! This miracle cure...",
    "Celebrity doctors reveal shocking truth about kitchen ingredient..."
  ];

  function handleSample(type) {
    setText(type === "true" ? randomPick(samplesTrue) : randomPick(samplesFake));
  }

  async function checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      const data = await res.json();
      setHealthOk(res.ok && data.status === "ok");
    } catch {
      setHealthOk(false);
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(prediction);
  }

  useEffect(() => {
    function handler(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") predict();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <motion.div
      className="card"
      role="region"
      aria-label="Classifier"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header">
        <div className="title">
          <motion.div
            className="logo"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <div>
            <div>Text Classification</div>
            <div className="subtitle">Paste text, click Predict, see the label.</div>
          </div>
        </div>
        <div className="btns">
          <button className="btn btn-ghost" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <button className="btn btn-ghost" onClick={checkHealth}>
            <span className={`status-dot ${healthOk ? "status-ok" : "status-err"}`}></span>
            Health
          </button>
        </div>
      </div>

      <div className="content grid-2">
        <motion.div className="row" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <label htmlFor="inputText">Input text</label>
          <textarea
            id="inputText"
            placeholder="Enter text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="btns">
            <button className="btn btn-primary" disabled={loading} onClick={predict}>
              {loading ? "… Predicting" : "▶ Predict"}
            </button>
            <button className="btn btn-danger" onClick={clearForm}>✕ Clear</button>
          </div>

          <motion.div
            className="result-wrap"
            aria-live="polite"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="result-title">Prediction</div>
            <div className={badgeClass}>{prediction}</div>
            {note && <div className="note">{note}</div>}
          </motion.div>
        </motion.div>

        <motion.aside
          className="aside"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h3>Quick samples</h3>
          <div className="samples">
            <button className="btn btn-accent" onClick={() => handleSample("true")}>✓ Use TRUE sample</button>
            <button className="btn btn-warning" onClick={() => handleSample("fake")}>! Use FAKE sample</button>
            <button className="btn btn-ghost" onClick={copyResult}>⧉ Copy result</button>
          </div>
        </motion.aside>
      </div>

      <div className="footer">
        <div><span className="mono">POST /predict</span> expects {"{ text: string }"}</div>
        <div className="subtitle">Cmd/Ctrl + Enter to Predict</div>
      </div>
    </motion.div>
  );
}

export default App;

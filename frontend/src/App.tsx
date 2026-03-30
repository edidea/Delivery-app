import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/`)
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Frontend працює 😄</h1>
      <p>Відповідь з бекенду:</p>
      <h2>{message}</h2>
    </div>
  );
}

export default App;

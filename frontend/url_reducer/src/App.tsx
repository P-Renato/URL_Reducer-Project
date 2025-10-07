import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState([]);
  return (
    <>
      <form >
        <input type="text" />
        <button>Reduce</button>
      </form>
        <p></p>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    saveData();
  }, []);

  const saveData = async () => {
    let payload = {
      latitude: "",
      longitude: "",
      data: "",
    };

    navigator.geolocation.getCurrentPosition(
      async function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        console.log("Data is :", position.coords);

        payload = {
          ...payload,
          latitude: `${position.coords.latitude}`,
          longitude: `${position.coords.longitude}`,
        };

        await axios.post(import.meta.env.VITE_API, {
          ...payload,
        });
      },
      async function (error) {
        console.log("Error is :", error.message);

        payload = {
          ...payload,
          data: `${error.message}`,
        };

        await axios.post(import.meta.env.VITE_API, {
          ...payload,
        });
      }
    );
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import './infrastructure/i18n';
import App from "./App";
import './Index.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import ErrorFallback from "./ui/ErrorFallback.jsx";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

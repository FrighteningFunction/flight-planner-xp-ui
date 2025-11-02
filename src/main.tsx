import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient();

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

// Mount the React app to the DOM element with id 'root'.
// Vite loads this module directly from `index.html` (script type=module).
const container = document.getElementById("root");
if (container) {
  createRoot(container as HTMLElement).render(<Root />);
} else {
  // If the container isn't found, log to help debugging in the browser console.
  // This is intentionally not throwing to avoid breaking the dev server.
  // eslint-disable-next-line no-console
  console.error("Root element '#root' not found — app not mounted.");
}

export default Root;

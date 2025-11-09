import { BACKEND_URL } from "./env";
import { logger } from "./logging/logger";
import { RouteSearchPanel } from "./components/RouteSearchPanel";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { TagEditorPanel } from "./components/TagEditorPanel";
import {
  ToastContainer,
  toastContext,
  ToastProvider,
} from "./components/FlightPlannerToast";

if (!BACKEND_URL) {
  logger.error("BACKEND_URL is not defined in environment variables.");
}

function App() {
  return (
    <ToastProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route path="/search" element={<RouteSearchPanel />} />
          <Route path="/tags" element={<TagEditorPanel />} />
        </Routes>
        <ToastContainer />
      </Router>
    </ToastProvider>
  );
}

export default App;

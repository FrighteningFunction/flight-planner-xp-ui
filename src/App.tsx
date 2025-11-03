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

if (!BACKEND_URL) {
  logger.error("BACKEND_URL is not defined in environment variables.");
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/search" replace />} />
        <Route path="/search" element={<RouteSearchPanel />} />
      </Routes>
    </Router>
  );
}

export default App;

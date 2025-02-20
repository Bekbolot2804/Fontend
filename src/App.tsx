import HelpsPage from "./pages/HelpsPage";
import HelpDetailPage from "./pages/HelpDetailPage"
import { HomePage } from "./pages/HomePage.tsx";
import { ROUTES } from "./Routes";
import './App.css'
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.HelpS} element={<HelpsPage />} />
        <Route path={`${ROUTES.HelpS}/:id`} element={<HelpDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App
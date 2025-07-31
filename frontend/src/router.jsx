import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AddNotePage from "./pages/AddNotePage";
import AddChecklistPage from "./pages/AddChecklistPage";
import ViewNotePage from "./pages/ViewNotePage";
import ViewChecklistPage from "./pages/ViewChecklistPage";
import PrivateRoute from "./components/PrivateRoute";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="notes/new" element={<AddNotePage />} />
        <Route path="checklists/new" element={<AddChecklistPage />} />
        <Route path="notes/:noteId" element={<ViewNotePage />} />
        <Route path="checklists/:checklistId" element={<ViewChecklistPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
);

export default AppRouter;

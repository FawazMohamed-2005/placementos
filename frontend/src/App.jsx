import { BrowserRouter, Routes, Route } from "react-router-dom";
import Revision from "./pages/Revision";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProblemDetail from "./pages/ProblemDetail";
import Jobs from "./pages/Jobs";
import JobForm from "./pages/JobForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/problems" element={<Problems />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/revision" element={<Revision />} />
        <Route path="/problems/:id" element={<ProblemDetail />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/new" element={<JobForm />} />
        <Route path="/jobs/:id/edit" element={<JobForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
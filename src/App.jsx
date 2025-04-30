import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Setup2FA from "./pages/Setup2FA";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/setup-2fa" element={<Setup2FA />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

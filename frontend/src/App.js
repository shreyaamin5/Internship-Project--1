import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import Student from "./Student";
import Company from "./Company";
import Drive from "./Drive";

function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Login />} />
<Route path="/dashboard" element={<AdminDashboard />} />
<Route path="/students" element={<Student />} />
<Route path="/companies" element={<Company />} />
<Route path="/drives" element={<Drive />} />
</Routes>
</BrowserRouter>
);
}

export default App;
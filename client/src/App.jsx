import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import Navbar from "./components/Navbar";
import PostJob from "./pages/PostJob";
import EmployerDashboard from "./pages/EmployerDashboard";
import Applicants from "./pages/Applicants";
import EditJob from "./pages/EditJob";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/my-applications" element={<MyApplications />} />
<Route path="/post-job" element={<PostJob />} 
/>
<Route path="/applicants/:jobId" element={<Applicants />} />
<Route
  path="/employer-dashboard"
  element={<EmployerDashboard />}
/>
<Route 
  path="/edit-job/:id" 
  element={<EditJob />} 
/>
<Route path="/profile" element={<Profile />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />

  

  </Routes>
  <Footer/>


    
    </BrowserRouter>
  );
}

export default App;
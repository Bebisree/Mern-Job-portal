import { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminDashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function AdminDashboard() {

  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getStats();
    getUsers();
    getJobs();
  }, []);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getStats = async () => {
    try {
      const res = await API.get("/admin/stats", config);
      setStats(res.data.stats);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const getUsers = async () => {
    try {
      const res = await API.get("/admin/users", config);
      setUsers(res.data.users);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const getJobs = async () => {
    try {
      const res = await API.get("/admin/jobs", config);
      setJobs(res.data.jobs);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete User?")) return;

    await API.delete(`/admin/users/${id}`, config);

    alert("User Deleted");

    getUsers();
    getStats();
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete Job?")) return;

    await API.delete(`/admin/jobs/${id}`, config);

    alert("Job Deleted");

    getJobs();
    getStats();
  };
  const barData = {
  labels: ["Users", "Jobs", "Applications"],
  datasets: [
    {
      label: "Statistics",
      data: [
        stats.totalUsers || 0,
        stats.totalJobs || 0,
        stats.totalApplications || 0,
      ],
      backgroundColor: [
        "#2563eb",
        "#16a34a",
        "#ea580c",
      ],
    },
  ],
};

const pieData = {
  labels: ["Candidates", "Employers"],
  datasets: [
    {
      data: [
        stats.totalCandidates || 0,
        stats.totalEmployers || 0,
      ],
      backgroundColor: [
        "#2563eb",
        "#16a34a",
      ],
    },
  ],
};

  return (
    <div className="admin">

      <h1>Admin Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h2>{stats.totalUsers}</h2>
          <p>Total Users</p>
        </div>

        <div className="card">
          <h2>{stats.totalCandidates}</h2>
          <p>Candidates</p>
        </div>

        <div className="card">
          <h2>{stats.totalEmployers}</h2>
          <p>Employers</p>
        </div>

        <div className="card">
          <h2>{stats.totalJobs}</h2>
          <p>Jobs</p>
        </div>

        <div className="card">
          <h2>{stats.totalApplications}</h2>
          <p>Applications</p>
        </div>
        </div>

<div className="charts">

  <div className="chart-box">
    <h2>Statistics</h2>
    <Bar data={barData} />
  </div>

  <div className="chart-box">
    <h2>User Roles</h2>
    <Pie data={pieData} />
  </div>

</div>
    

      <h2>Users</h2>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user._id}>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>

                <button
                  onClick={() => deleteUser(user._id)}
                  className="delete"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <h2>Jobs</h2>

      <table>

        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Employer</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {jobs.map((job) => (

            <tr key={job._id}>

              <td>{job.title}</td>

              <td>{job.company}</td>

              <td>{job.createdBy?.name}</td>

              <td>

                <button
                  onClick={() => deleteJob(job._id)}
                  className="delete"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminDashboard;
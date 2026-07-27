import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./EmployerDashboard.css";

function EmployerDashboard() {

  const [jobs, setJobs] = useState([]);

  const [totalJobs, setTotalJobs] = useState(0);
  const [pending, setPending] = useState(0);
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);

  useEffect(() => {
    getMyJobs();
  }, []);

  const getMyJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/jobs/employer", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setJobs(res.data.jobs);
      setTotalJobs(res.data.jobs.length);

    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const deleteJob = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.delete(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert(res.data.message);
      getMyJobs();

    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Employer Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card stat-total">
          <h2>{totalJobs}</h2>
          <p>Total Jobs</p>
        </div>

        <div className="stat-card stat-pending">
          <h2>{pending}</h2>
          <p>Pending</p>
        </div>

        <div className="stat-card stat-accepted">
          <h2>{accepted}</h2>
          <p>Accepted</p>
        </div>

        <div className="stat-card stat-rejected">
          <h2>{rejected}</h2>
          <p>Rejected</p>
        </div>
      </div>

      <div className="jobs-section">
        <h2 className="section-heading">My Job Postings</h2>

        {jobs.length > 0 ? (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <div className="job-card" key={job._id}>

                <div className="job-card-header">
                  <h3>{job.title}</h3>
                  <span className="job-badge">{job.jobType || "Full-time"}</span>
                </div>

                <div className="job-info">
                  <p><span className="icon">🏢</span> {job.company}</p>
                  <p><span className="icon">📍</span> {job.location}</p>
                  <p><span className="icon">💰</span> {job.salary}</p>
                </div>

                <div className="job-actions">
                  <Link to={`/applicants/${job._id}`}>
                    <button className="btn btn-view">View Applicants</button>
                  </Link>

                  <Link to={`/edit-job/${job._id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>

                  <button
                    className="btn btn-delete"
                    onClick={() => deleteJob(job._id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No jobs posted yet</p>
            <Link to="/post-job">
              <button className="btn btn-view">Post a Job</button>
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}

export default EmployerDashboard;
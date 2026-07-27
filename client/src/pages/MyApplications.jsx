import { useEffect, useState } from "react";
import API from "../services/api";
import "./MyApplications.css";

function MyApplications() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/applications/my-applications", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setApplications(res.data.applications);

    } catch (error) {
      console.log(error);
    }
  };

  const getStatusClass = (status) => {

  if(status === "Selected")
    return "status-badge status-selected";

  if(status === "Rejected")
    return "status-badge status-rejected";

  if(status === "Interview")
    return "status-badge status-interview";

  if(status === "Reviewing")
    return "status-badge status-reviewing";

  return "status-badge status-applied";

};

  return (
    <div className="applications-container">
      <h1 className="applications-title">My Applications</h1>

      {applications.length > 0 ? (
        <div className="applications-grid">
          {applications.map((app) => (
            <div className="application-card" key={app._id}>

              <div className="application-header">
                <h2>{app.job.title}</h2>
                <span className={getStatusClass(app.status)}>
                  {app.status}
                </span>
                <div className="status-tracker">

  <span className={app.status==="Applied" || app.status==="Reviewing" || app.status==="Interview" || app.status==="Selected" ? "active" : ""}>
    Applied
  </span>


  <span className={app.status==="Reviewing" || app.status==="Interview" || app.status==="Selected" ? "active" : ""}>
    Reviewing
  </span>


  <span className={app.status==="Interview" || app.status==="Selected" ? "active" : ""}>
    Interview
  </span>


  <span className={app.status==="Selected" ? "active" : ""}>
    Selected
  </span>

</div>
              </div>

              <div className="application-info">
                <p><span className="icon">🏢</span> {app.job.company}</p>
                <p><span className="icon">📍</span> {app.job.location}</p>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No Applications Found</p>
        </div>
      )}
    </div>
  );
}

export default MyApplications;
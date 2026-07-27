import { useEffect, useState } from "react";
import API from "../services/api";
import "./Profile.css";

function Profile() {

  const [user, setUser] = useState({});
  const [resume, setResume] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(res.data.user);

    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    if (file) {
      setResume(file);
    }
  };

  const uploadResume = async () => {

    console.log("Resume state at upload time:", resume);

    if (!resume) {
      alert("Please select a PDF file");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("resume", resume);

      const res = await API.post(
        "/auth/upload-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert(res.data.message);
      setResume(null);
      getProfile();

    } catch (error) {
      console.log("Upload error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Upload failed");
    }
  };

  const handleNotification = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.put(
      "/auth/notification",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

    getProfile();

  } catch (error) {
    console.log(error.response?.data);
  }
};
  const initial = user?.name ? user.name.charAt(0) : "?";

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>

      <div className="profile-card">

        <div className="profile-header">
          <div className="profile-avatar">{initial}</div>
          <div>
            <div className="profile-name">{user.name || "—"}</div>
            {user.role && (
              <span className="profile-role">{user.role}</span>
            )}
          </div>
        </div>

        <div className="profile-field">
          <label>Email</label>
          <span>{user.email || "—"}</span>
        </div>

        <div className="profile-field">
          <label>Phone</label>
          <span>{user.phone || "—"}</span>
        </div>

        <div className="profile-field">
          <label>Education</label>
          <span>{user.education || "—"}</span>
        </div>

        <div className="profile-field">
          <label>Experience</label>
          <span>{user.experience || "—"}</span>
        </div>

        <div className="profile-field">
          <label>Location</label>
          <span>{user.location || "—"}</span>
        </div>

        <div className="resume-upload">
          <label className="upload-label">Upload Resume (PDF)</label>

          <input
            type="file"
            accept=".pdf"
            className="file-input"
            onChange={handleFileChange}
          />

          <button className="upload-btn" onClick={uploadResume}>
            Upload Resume
          </button>
          <label>
  <input
    type="checkbox"
    checked={user.notificationPreference}
    onChange={handleNotification}
  />
  Email Notifications
</label>
        </div>

      </div>
    </div>
  );
}

export default Profile;
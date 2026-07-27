import { useState } from "react";
import API from "../services/api";

function PostJob() {

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const handlePostJob = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

console.log("Post Job Token:", token);

      const res = await API.post(
        "/jobs",
        {
          title,
          company,
          location,
          salary,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);

      setTitle("");
      setCompany("");
      setLocation("");
      setSalary("");
      setDescription("");

    } catch (error) {

      console.log(error.response?.data);
      alert(error.response?.data?.message || "Error");

    }

  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Post Job</h1>

      <form onSubmit={handlePostJob}>

        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Post Job
        </button>

      </form>

    </div>
  );
}

export default PostJob;
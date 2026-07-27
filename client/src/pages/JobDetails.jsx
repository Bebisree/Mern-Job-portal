import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function JobDetails() {

  const { id } = useParams();

  const [job, setJob] = useState({});

  useEffect(() => {
    getJob();
  }, []);

  const getJob = async () => {

    try {

      const res = await API.get(`/jobs/${id}`);

      setJob(res.data.job);

    } catch (error) {

      console.log(error.response?.data);

    }

  };

  const applyJob = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.post(
      `/applications/apply/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);
  } catch (error) {
    console.log(error.response?.data);
    alert(error.response?.data?.message || "Something went wrong");
  }
};
  return (

    <div
      style={{
        padding: "40px"
      }}
    >

      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px lightgray"
        }}
      >

        <h1>{job.title}</h1>

        <p><b>Company:</b> {job.company}</p>

        <p><b>Location:</b> {job.location}</p>

        <p><b>Salary:</b> ₹{job.salary}</p>

        <hr />

        <h3>Description</h3>

        <p>{job.description}</p>

        <button
          onClick={applyJob}
          style={{
            background: "green",
            color: "white",
            padding: "12px 25px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          Apply Now
        </button>

      </div>

    </div>

  );

}

export default JobDetails;
import { Link } from "react-router-dom";
import jobImage from "../assets/job.png";

function Home() {
  return (
    <div style={{ background: "#f4f6f9", padding: "50px" }}>

      {/* Hero Section */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >

        <div style={{ width: "50%" }}>

          <h1
            style={{
              color: "#1976d2",
              fontSize: "50px"
            }}
          >
            Job Search Portal
          </h1>

          <h2>Find Your Dream Job Today</h2>

          <p
            style={{
              fontSize: "20px",
              lineHeight: "35px"
            }}
          >
            This portal helps candidates search and apply for jobs while
            employers can post jobs, manage applicants, edit and delete
            job postings.
          </p>

          <Link to="/jobs">
            <button
              style={{
                background: "#1976d2",
                color: "white",
                padding: "12px 25px",
                border: "none",
                borderRadius: "6px",
                marginRight: "15px",
                cursor: "pointer"
              }}
            >
              Browse Jobs
            </button>
          </Link>

          <Link to="/register">
            <button
              style={{
                background: "green",
                color: "white",
                padding: "12px 25px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Register
            </button>
          </Link>

        </div>

        <div>
          <img
            src={jobImage}
            alt="Job"
            width="450"
          />
        </div>

      </div>

      {/* Statistics */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "60px",
          flexWrap: "wrap"
        }}
      >

        <div
          style={{
            background: "#1976d2",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "180px",
            textAlign: "center"
          }}
        >
          <h2>100+</h2>
          <p>Jobs Posted</p>
        </div>

        <div
          style={{
            background: "green",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "180px",
            textAlign: "center"
          }}
        >
          <h2>50+</h2>
          <p>Companies</p>
        </div>

        <div
          style={{
            background: "orange",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "180px",
            textAlign: "center"
          }}
        >
          <h2>500+</h2>
          <p>Candidates</p>
        </div>

        <div
          style={{
            background: "red",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "180px",
            textAlign: "center"
          }}
        >
          <h2>200+</h2>
          <p>Successful Hires</p>
        </div>

      </div>

      {/* Featured Jobs */}

      <h1
        style={{
          textAlign: "center",
          marginTop: "70px"
        }}
      >
        Featured Jobs
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          marginTop: "30px"
        }}
      >

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            width: "250px",
            borderRadius: "10px",
            background: "white"
          }}
        >
          <h3>Frontend Developer</h3>
          <p>Infosys</p>
          <p>Hyderabad</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            width: "250px",
            borderRadius: "10px",
            background: "white"
          }}
        >
          <h3>Backend Developer</h3>
          <p>TCS</p>
          <p>Bangalore</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            width: "250px",
            borderRadius: "10px",
            background: "white"
          }}
        >
          <h3>AI Engineer</h3>
          <p>Accenture</p>
          <p>Chennai</p>
        </div>

      </div>

      {/* Why Choose Us */}

      <h1
        style={{
          textAlign: "center",
          marginTop: "70px"
        }}
      >
        Why Choose Us?
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          marginTop: "30px"
        }}
      >

        <div>
          <h3>💼 Easy Job Search</h3>
          <p>Find jobs easily.</p>
        </div>

        <div>
          <h3>🏢 Trusted Companies</h3>
          <p>Top recruiters.</p>
        </div>

        <div>
          <h3>⚡ Quick Apply</h3>
          <p>Apply instantly.</p>
        </div>

        <div>
          <h3>🔒 Secure Portal</h3>
          <p>Your data is safe.</p>
        </div>

      </div>

    </div>
  );
}

export default Home;
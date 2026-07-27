import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Jobs.css";

function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [location, setLocation] = useState("");
const [jobType, setJobType] = useState("");

  useEffect(() => {
  getJobs();
}, [search, locationFilter, jobType]);

 const getJobs = async () => {

  const res = await API.get(
    `/jobs?search=${search}&location=${locationFilter}&jobType=${jobType}`
  );

  setJobs(res.data.jobs);

};

  // Unique locations for the dropdown
  const uniqueLocations = [...new Set(jobs.map((job) => job.location))];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesLocation = locationFilter
      ? job.location === locationFilter
      : true;

    const salaryNum = Number(job.salary) || 0;

    const matchesMin = minSalary ? salaryNum >= Number(minSalary) : true;
    const matchesMax = maxSalary ? salaryNum <= Number(maxSalary) : true;

    return matchesSearch && matchesLocation && matchesMin && matchesMax;
  });

  const clearFilters = () => {
    setSearch("");
    setLocationFilter("");
    setMinSalary("");
    setMaxSalary("");
    setJobType("");
};

  return (
    <div className="jobs-page">

      <h1 className="jobs-heading">Available Jobs</h1>

      <div className="filters-bar">

        <input
          type="text"
          placeholder="Search by Job Title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input search-input"
        />

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="filter-input"
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Salary"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
          className="filter-input salary-input"
        />

        <input
          type="number"
          placeholder="Max Salary"
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
          className="filter-input salary-input"
        />

<select
  value={jobType}
  onChange={(e)=>setJobType(e.target.value)}
  className="filter-input"
>
  <option value="">All Job Types</option>
  <option value="Full Time">Full Time</option>
  <option value="Part Time">Part Time</option>
  <option value="Internship">Internship</option>
</select>
        <button className="clear-btn" onClick={clearFilters}>
          Clear Filters
        </button>

      </div>

      <p className="results-count">
        {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
      </p>

      <div className="jobs-grid">

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div className="job-card" key={job._id}>

              <h2>{job.title}</h2>

              <p><b>Company:</b> {job.company}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Salary:</b> ₹{job.salary}</p>

              <p className="job-desc">
                {job.description.substring(0, 80)}...
              </p>

              <Link to={`/jobs/${job._id}`}>
                <button className="view-btn">View Details</button>
              </Link>

            </div>
          ))
        ) : (
          <p className="no-results">No jobs match your filters</p>
        )}

      </div>

    </div>
  );
}

export default Jobs;
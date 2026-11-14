
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../services/api";
import JobCard from "../components/Jobcard";

function Jobs() {
  const [searchParams] = useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [salary, setSalary] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    getJobs();
  }, []);

  async function getJobs() {
    try {
      const response = await api.get("/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }

  async function deleteJob(id) {
    try {
      await api.delete(`/jobs/${id}`);
      setJobs((previousJobs) =>
        previousJobs.filter((job) => job.id !== id)
      );
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Unable to delete job. Please try again.");
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const searchMatch = (job.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || job.category === category;

    const salaryMatch =
      salary === "All" || job.salaryLevel === salary;

    return searchMatch && categoryMatch && salaryMatch;
  });

  function getSalaryValue(salaryText) {
    const values = String(salaryText || "").match(/\d+(\.\d+)?/g);
    return values ? Number(values[0]) : 0;
  }

  const finalJobs = [...filteredJobs].sort((a, b) => {
    if (sort === "high") {
      return getSalaryValue(b.salary) - getSalaryValue(a.salary);
    }

    if (sort === "low") {
      return getSalaryValue(a.salary) - getSalaryValue(b.salary);
    }

    return 0;
  });

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setSalary("All");
    setSort("");
  }

  const hasActiveFilters =
    search !== "" ||
    category !== "All" ||
    salary !== "All" ||
    sort !== "";

  return (
    <div className="jobs-page">

      {/* PAGE HEADING */}

      <div className="jobs-header">
        <div className="jobs-heading-content">
          <span className="jobs-eyebrow">
            CAREER OPPORTUNITIES
          </span>

          <h1>
            Find your <span>next opportunity.</span>
          </h1>

          <p>
            Explore opportunities, discover exciting roles and
            take the next step in your career.
          </p>
        </div>

        <Link to="/add-job" className="add-btn">
          <span>＋</span> Post a Job
        </Link>
      </div>

      {/* SEARCH AND FILTER SECTION */}

      <div className="job-search-panel">

        <div className="search-main">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search by job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="filter-divider"></div>

        <div className="filter-controls">

          <div className="filter-item">
            <label htmlFor="category-filter">CATEGORY</label>
            <select
              id="category-filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="IT">IT</option>
              <option value="Software Development">
                Software Development
              </option>
              <option value="Data Science">Data Science</option>
              <option value="AI & ML">AI & ML</option>
              <option value="Web Development">Web Development</option>
              <option value="Design">Design</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Business Analytics">
                Business Analytics
              </option>
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="salary-filter">SALARY LEVEL</label>
            <select
              id="salary-filter"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            >
              <option value="All">All Salary Levels</option>
              <option value="Low">Low Salary</option>
              <option value="Medium">Medium Salary</option>
              <option value="High">High Salary</option>
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="sort-filter">SORT BY</label>
            <select
              id="sort-filter"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Default</option>
              <option value="high">Highest Salary</option>
              <option value="low">Lowest Salary</option>
            </select>
          </div>

        </div>
      </div>

      {/* RESULTS HEADING */}

      <div className="jobs-results-header">
        <div>
          <h2>Explore Jobs</h2>
          <p>
            Showing <strong>{finalJobs.length}</strong> of{" "}
            <strong>{jobs.length}</strong> opportunities
          </p>
        </div>

        {hasActiveFilters && (
          <button
            className="reset-filters"
            onClick={clearFilters}
          >
            Reset filters <span>↺</span>
          </button>
        )}
      </div>

      {/* JOB LIST */}

      <div className="jobs-container">
        {finalJobs.length > 0 ? (
          finalJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={deleteJob}
            />
          ))
        ) : (
          <div className="no-jobs">
            <div className="no-jobs-icon">⌕</div>
            <h3>No matching jobs found</h3>
            <p>
              Try changing your search or adjusting the filters
              to find more opportunities.
            </p>

            <button onClick={clearFilters}>
              Clear all filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

export default Jobs;

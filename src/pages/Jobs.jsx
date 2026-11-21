
import { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import api from "../services/api";
import JobCard from "../components/Jobcard";
import { toggleFavorite } from "../features/favoriteSlice";

function Jobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const favorites = useSelector(
    (state) => state.favorites
  );

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );
  const [category, setCategory] = useState("All");
  const [salary, setSalary] = useState("All");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobs();
  }, []);

  async function getJobs() {
    try {
      setLoading(true);
      const response = await api.get("/jobs");

      const data = response.data;
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteJob(id) {
    if (!id) {
      alert("Job ID is missing.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/jobs/${id}`);

      setJobs((previousJobs) =>
        previousJobs.filter(
          (job) => (job._id || job.id) !== id
        )
      );
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Unable to delete job.");
    }
  }

  function handleFavorite(job) {
    dispatch(toggleFavorite(job));
  }

  function isJobFavorite(job) {
    const id = job._id || job.id;

    return favorites.some(
      (favorite) =>
        (favorite._id || favorite.id) === id
    );
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      (job.title || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (job.company || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      job.category === category;

    const matchesSalary =
      salary === "All" ||
      (job.salary || "")
        .toLowerCase()
        .includes(salary.toLowerCase());

    return (
      matchesSearch &&
      matchesCategory &&
      matchesSalary
    );
  });

  const sortedJobs = [...filteredJobs];

  if (sort === "title") {
    sortedJobs.sort((a, b) =>
      (a.title || "").localeCompare(b.title || "")
    );
  }

  if (sort === "salary") {
    sortedJobs.sort((a, b) => {
      const getSalary = (value) => {
        const match = String(value || "").match(/\d+(\.\d+)?/);
        return match ? Number(match[0]) : 0;
      };

      return getSalary(b.salary) - getSalary(a.salary);
    });
  }

  return (
    <div className="jobs-page">

      <h1>Explore Jobs</h1>

      <div className="jobs-filters">

        <input
          type="text"
          placeholder="Search jobs or companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {[...new Set(
            jobs.map((job) => job.category).filter(Boolean)
          )].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        >
          <option value="All">All Salaries</option>
          <option value="LPA">LPA</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="title">Job Title</option>
          <option value="salary">Highest Salary</option>
        </select>

      </div>

      {loading ? (
        <p>Loading jobs...</p>
      ) : sortedJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="jobs-container">
          {sortedJobs.map((job) => {
            const id = job._id || job.id;

            return (
              <JobCard
                key={id}
                job={job}
                isFavorite={isJobFavorite(job)}
                onToggleFavorite={handleFavorite}
                onViewDetails={() => navigate(`/jobs/${id}`)}
                onEdit={() => navigate(`/edit-job/${id}`)}
                onDelete={deleteJob}
              />
            );
          })}
        </div>
      )}

    </div>
  );
}

export default Jobs;

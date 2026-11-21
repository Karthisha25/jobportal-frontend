
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getJob() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job:", error);
        setError("Unable to load job details.");
      } finally {
        setLoading(false);
      }
    }

    getJob();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error || !job) {
    return (
      <div className="details">
        <p>{error || "Job not found."}</p>
        <Link to="/jobs">← Back to Jobs</Link>
      </div>
    );
  }

  const skills = Array.isArray(job.skills)
    ? job.skills
    : typeof job.skills === "string"
      ? job.skills.split(",").map((skill) => skill.trim())
      : [];

  return (
    <div className="details">

      <Link to="/jobs">← Back to Jobs</Link>

      <h1>{job.title}</h1>

      <h2>{job.company}</h2>

      <h3>Location</h3>
      <p>{job.location || "Not specified"}</p>

      <h3>Job Category</h3>
      <p>{job.category || "Not specified"}</p>

      <h3>Job Type</h3>
      <p>{job.jobType || "Not specified"}</p>

      <h3>Experience</h3>
      <p>{job.experience || "Not specified"}</p>

      <h3>Salary</h3>
      <p>{job.salary || "Not specified"}</p>

      <h3>Job Description</h3>
      <p>{job.description || "No description available."}</p>

      <h3>Required Skills</h3>
      {skills.length > 0 ? (
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      ) : (
        <p>Not specified</p>
      )}

      <h3>Qualification</h3>
      <p>{job.qualification || "Not specified"}</p>

      <h3>Last Date to Apply</h3>
      <p>{job.lastDate || "Not specified"}</p>

      <h3>Available Vacancies</h3>
      <p>{job.vacancies || "Not specified"}</p>

      <h3>Status</h3>
      <p>{job.status || "Not specified"}</p>

      <button
        type="button"
        onClick={() =>
          alert("Application feature is not connected yet.")
        }
      >
        Apply Now
      </button>

    </div>
  );
}

export default JobDetails;

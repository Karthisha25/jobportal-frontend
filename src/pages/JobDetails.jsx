
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    getJob();
  }, [id]);

  async function getJob() {
    try {
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data);
    } catch (error) {
      console.log("Error fetching job:", error);
    }
  }

  if (!job) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details">

      <Link to="/jobs">← Back to Jobs</Link>

      <h1>{job.title}</h1>

      <h2>{job.company}</h2>

      <h3>Location</h3>
      <p>{job.location}</p>

      <h3>Job Category</h3>
      <p>{job.category}</p>

      <h3>Job Type</h3>
      <p>{job.jobType}</p>

      <h3>Experience</h3>
      <p>{job.experience}</p>

      <h3>Salary</h3>
      <p>{job.salary}</p>

      <h3>Job Description</h3>
      <p>{job.description}</p>

      <h3>Required Skills</h3>
      <ul>
        {job.skills?.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h3>Qualification</h3>
      <p>{job.qualification}</p>

      <h3>Last Date to Apply</h3>
      <p>{job.lastDate}</p>

      <h3>Available Vacancies</h3>
      <p>{job.vacancies}</p>

      <h3>Status</h3>
      <p>{job.status}</p>

      <button>Apply Now</button>

    </div>
  );
}

export default JobDetails;

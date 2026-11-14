
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../features/favoriteSlice";

function JobCard({ job, onDelete }) {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites);

  const isFavorite = favorites.some(
    (item) => item.id === job.id
  );

  function handleFavorite() {
    if (isFavorite) {
      dispatch(removeFavorite(job.id));
    } else {
      dispatch(addFavorite(job));
    }
  }

  return (
    <div className="job-card">

      <div className="job-card-top">
        <div>
          <h3>{job.title}</h3>
          <h4>{job.company}</h4>
        </div>

        <button
          className={`favorite-heart ${isFavorite ? "active" : ""}`}
          onClick={handleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="job-card-badges">
        <span className="job-type-badge">
          {job.jobType || "Not specified"}
        </span>

        <span className="experience-badge">
          {job.experience || "Not specified"}
        </span>
      </div>

      <p className="job-location">
        <span>⌖</span> {job.location || "Not specified"}
      </p>

      <div className="job-salary">
        {job.salary || "Salary not specified"}
      </div>

      <p className="job-category">
        <strong>Category:</strong> {job.category || "Not specified"}
      </p>

      <div className="job-skills">
        <strong>Skills</strong>

        <div className="skill-chips">
          {Array.isArray(job.skills) && job.skills.length > 0 ? (
            job.skills.map((skill, index) => (
              <span className="skill-chip" key={index}>
                {skill}
              </span>
            ))
          ) : (
            <span className="skill-chip">Not specified</span>
          )}
        </div>
      </div>

      <div className="job-card-actions">

        <Link className="job-view-btn" to={`/jobs/${job.id}`}>
          View Details
        </Link>

        <div className="secondary-actions">

          <Link
            className="job-icon-btn edit-icon"
            to={`/edit-job/${job.id}`}
            title="Edit job"
            aria-label="Edit job"
          >
            ✎
          </Link>

          <button
            className="job-icon-btn delete-icon"
            onClick={() => onDelete(job.id)}
            title="Delete job"
            aria-label="Delete job"
          >
            🗑
          </button>

        </div>
      </div>

    </div>
  );
}

export default JobCard;

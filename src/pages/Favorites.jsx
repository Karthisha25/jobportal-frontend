
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../features/favoriteSlice";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const favorites = useSelector(
    (state) => state.favorites
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="jobs-page">

      <h1>My Favorite Jobs ❤️</h1>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <h3>No favorite jobs yet!</h3>
          <p>
            Explore available jobs and click the heart icon
            to save your favorites.
          </p>

          <button
            className="view-details-btn"
            onClick={() => navigate("/jobs")}
          >
            Explore Jobs
          </button>
        </div>
      ) : (
        <div className="jobs-container">

          {favorites.map((job) => {
            const id = job._id || job.id;

            return (
              <div className="job-card" key={id}>

                {/* Job Image */}
                <div className="company-logo">
                  {job.image ? (
                    <img
                      src={job.image}
                      alt={job.company}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="company-name">
                      {job.company}
                    </div>
                  )}
                </div>

                {/* Job Information */}
                <div className="job-card-header">
                  <div>
                    <h3>{job.title}</h3>
                    <p className="company-name">
                      {job.company}
                    </p>
                  </div>

                  <span className="favorite-btn active">
                    ♥
                  </span>
                </div>

                <div className="job-badges">
                  <span>{job.jobType}</span>
                  <span>{job.experience}</span>
                </div>

                <div className="job-info">
                  <p>
                    📍 {job.location || "Not specified"}
                  </p>

                  <p>
                    💰 {job.salary || "Not specified"}
                  </p>

                  <p>
                    💼 {job.category || "Not specified"}
                  </p>
                </div>

                {/* Actions */}
                <div className="job-card-actions">

                  <button
                    className="view-details-btn"
                    onClick={() => navigate(`/jobs/${id}`)}
                  >
                    View Details
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => dispatch(removeFavorite(id))}
                  >
                    Remove
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default Favorites;

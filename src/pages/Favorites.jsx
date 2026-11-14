
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../features/favoriteSlice";

function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  return (
    <div className="jobs-page">
      <h1>My Favorite Jobs ❤️</h1>

      {favorites.length === 0 ? (
        <p>No favorite jobs added yet!</p>
      ) : (
        <div className="jobs-container">
          {favorites.map((job) => (
            <div className="card" key={job.id}>

              {job.image && (
                <img
                  src={job.image}
                  alt={job.company}
                  className="job-image"
                />
              )}

              <h3>{job.title}</h3>
              <h4>{job.company}</h4>

              <p>
                <strong>Location:</strong> {job.location || "Not specified"}
              </p>

              <p>
                <strong>Salary:</strong> {job.salary || "Not specified"}
              </p>

              <button
                className="delete-btn"
                onClick={() => dispatch(removeFavorite(job.id))}
              >
                Remove from Favorites
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;

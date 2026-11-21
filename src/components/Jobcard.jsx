
import React from "react";

const jobImages = {
  "frontend developer":
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700",
  "software developer":
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700",
  "graduate engineer trainee":
    "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=700",
  "python developer":
    "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=700",
  "data analyst":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700",
  "ml engineer":
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700",
  "java developer":
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=700",
  "ui ux designer":
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700",
  "backend developer":
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700",
  "data scientist":
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=700",
  "cloud engineer":
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700",
  "cybersecurity analyst":
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700",
  "react developer":
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=700",
  "business analyst":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700",
  "devops engineer":
    "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=700"
};

const fallbackImage =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=700";

function JobCard({
  job,
  onViewDetails,
  onEdit,
  onDelete,
  isFavorite,
  onToggleFavorite
}) {
  const jobTitle = (job.title || "").toLowerCase().trim();
  const imageUrl = jobImages[jobTitle] || fallbackImage;

  return (
    <div className="job-card">

      <div className="company-logo">
        <img
          src={job.image || imageUrl}
          alt={`${job.title} workspace`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      <div className="job-card-header">
        <div>
          <h3>{job.title}</h3>
          <p className="company-name">{job.company}</p>
        </div>

        <button
          type="button"
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(job)}
          aria-label="Toggle favorite"
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="job-badges">
        <span>{job.jobType}</span>
        <span>{job.experience}</span>
      </div>

      <div className="job-info">
        <p>📍 {job.location}</p>
        <p>💰 {job.salary}</p>
        <p>💼 {job.category}</p>
      </div>

      {job.skills && (
        <div className="job-skills">
          {(Array.isArray(job.skills)
            ? job.skills
            : job.skills.split(",")
          ).map((skill, index) => (
            <span key={index}>{skill.trim()}</span>
          ))}
        </div>
      )}

      <div className="job-card-actions">
        <button
          type="button"
          className="view-details-btn"
          onClick={() => onViewDetails(job)}
        >
          View Details
        </button>

        <button
          type="button"
          className="edit-btn"
          onClick={() => onEdit(job)}
          aria-label="Edit job"
        >
          ✎
        </button>

        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(job._id || job.id)}
          aria-label="Delete job"
        >
          🗑
        </button>
      </div>

    </div>
  );
}

export default JobCard;

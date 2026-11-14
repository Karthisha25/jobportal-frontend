
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddJob() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    image: "",
    description: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await api.post("/jobs", formData);

    navigate("/jobs");
  }

  return (
    <div className="form-container">

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Company Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button className="submit-btn" type="submit">
          Add Job
        </button>

      </form>

    </div>
  );
}

export default AddJob;

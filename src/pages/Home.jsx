
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <section className="hero">
        <div className="hero-content">
          <h1>Build Your Future With Us</h1>
          <p>
            Discover exciting opportunities, connect
            with top companies and find your dream job.
          </p>
          <Link to="/jobs">
            <button>Explore Jobs</button>
          </Link>
        </div>

        <img
          src="https://durham.autism-uni.org/wp-content/uploads/2020/06/74008-2048x1366.jpg"
          alt="Students collaborating together"
        />
      </section>

      <section className="categories">
        <h2>Explore Job Categories</h2>

        <div className="category-container">
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" alt="IT and Software" />
            <h3>IT & Software</h3>
          </div>

          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" alt="Data Analytics" />
            <h3>Data Analytics</h3>
          </div>

          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1558655146-d09347e92766" alt="UI UX Design" />
            <h3>UI/UX Design</h3>
          </div>

          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978" alt="Digital Marketing" />
            <h3>Marketing</h3>
          </div>
        </div>
      </section>

      <section className="career-section">
        <h2>Your Career Starts Here</h2>
        <p>
          Find the right opportunity and take the next
          step towards your professional goals.
        </p>
        <Link to="/jobs">
          <button>Find Jobs</button>
        </Link>
      </section>

    </div>
  );
}

export default Home;

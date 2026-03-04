import "../css/home.css";
import project from "../assets/1.jpg";
import inventory from "../assets/3.jpg";
import earth from "../assets/2.mp4";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function HomeComponent() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegistration = () => {
    navigate("/register");
  };

  return (
    <div>
      {/* Main container */}
      <div className="main">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="back-video"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <source src={earth} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Navigation Bar */}
        <nav className="homeNavbar">
          <div className="icon">
            <h2 className="logo">NexUrb</h2>
          </div>

          <div className="menu">
            <Button id="home-btn" onClick={handleLogin}>
              Login
            </Button>

            <Button id="home-btn1" onClick={handleRegistration}>
              Register
            </Button>
          </div>
        </nav>

        {/* Content Section */}
        <main className="page-container">
          <div className="card">
            {/* Card 1 */}
            <section className="card-item">
              <div className="card-text">
                <h3 className="card-title">Project Management</h3>
                <p className="card-description">
                  All the complete and incomplete projects of different
                  departments are shown here
                </p>
              </div>
              <img
                src={project}
                alt="Project"
                className="card-image"
                loading="lazy"
                style={{ maxWidth: "100%" }}
              />
            </section>

            {/* Card 2 */}
            <section className="card-item">
              <div className="card-text">
                <h3 className="card-title">Inventory Management</h3>
                <p className="card-description">
                  Name of the project and project coordinator is showed here in
                  queue
                </p>
              </div>
              <img
                src={inventory}
                alt="Inventory"
                className="card-image"
                loading="lazy"
                style={{ maxWidth: "100%" }}
              />
            </section>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer id="homeFooter">
        <p>&copy; NexUrb</p>
      </footer>
    </div>
  );
}

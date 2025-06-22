import "../Stylying/splashscreen.css";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="splash-screen">
      <div className="overlay-layer"></div>

      <div className="splash-content">
        <div className="top-bar">
          <img src="/assets/Gsymbol.png" alt="Georgia DOT Logo" className="logo-icon" />
          <img src="/assets/Dot_Bot_Name.png" alt="DOTBot Title" className="dotbot-title" />
        </div>

        <img src="/assets/Bot_Icon.png" alt="DOTBot Icon" className="bot-icon" />

        <div className="text-content">
          <h3>
            Where Georgia builds, <br />
            <span className="highlighted">DOTBot leads.</span>
          </h3>
          <p>
            DOTBot is your intelligent assistant for navigating Georgia DOT specifications,
            construction standards, and contractor resources. Built to support infrastructure teams
            with instant access to the information that powers smarter, faster, and fully
            compliant projects.
          </p>
        </div>

        <div className="btn-wrapper">
          <button type="button" className="get-started" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

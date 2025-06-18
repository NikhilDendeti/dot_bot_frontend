import "../Stylying/splashscreen.css";

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="overlay-layer"></div>

      <div className="splash-content">
        <div className="top-bar">
          <img src="/assets/Gsymbol.png" alt="Gsymbol" className="logo-icon" />
          <img src="/assets/Dot_Bot_Name.png" alt="DotBot Title" className="dotbot-title" />
        </div>

        <img src="/assets/Bot_Icon.png" alt="Bot Icon" className="bot-icon" />

        <div className="text-content">
          <h3>Where Georgia builds,<br></br> DOTBot leads.</h3>
          <p>
            DOTBot is your intelligent assistant for navigating Georgia DOT specifications,
            construction standards, and contractor resources. Built to support infrastructure
            teams with instant access to the information that powers smarter, faster, and fully
            compliant projects.
          </p>
        </div>

        <div className="btn-wrapper">
          <button className="get-started">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

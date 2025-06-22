import "../Stylying/pagenotfound.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay.jsx";

const PageNotFound = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("https://api-azjv7cvnxq-uc.a.run.app/get-chat-history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      } catch (err) {
        console.error("Error checking token:", err);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [navigate]);

  return (
    <div className="page-not-found">
      {loading && <LoadingOverlay />}
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default PageNotFound;

import React, { useState, useEffect } from 'react';
import '../Stylying/createnewchatsession.css';
import LoadingOverlay from './LoadingOverlay';
import { useNavigate } from 'react-router-dom';

const CreateNewChatScreen = ({ onCreateNewChat }) => {
  const [loading, setLoading] = useState(false);
  const [chatTitle, setChatTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedTitle = localStorage.getItem('newChatTitle');
    if (storedTitle) {
      setChatTitle(storedTitle);
      localStorage.removeItem('newChatTitle');
    } else {
      setChatTitle('Untitled Chat');
    }
  }, []);

  const handleStartChat = async () => {
    const prompt = 'Start chat'; // ✅ default prompt

    try {
      const idToken = localStorage.getItem('authToken');
      if (!idToken) {
        navigate('/login');
        return;
      }

      setLoading(true);

      const res = await fetch('https://api-azjv7cvnxq-uc.a.run.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ prompt }),
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('authToken');
        navigate('/login');
        return;
      }

      const text = await res.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Parse Error:", err, text);
        alert('Invalid server response');
        return;
      }

      if (res.ok && data.response) {
        await fetch('https://api-azjv7cvnxq-uc.a.run.app/save-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            prompt,
            response: data.response,
            title: chatTitle || 'Untitled Chat',
          }),
        });

        if (onCreateNewChat) onCreateNewChat(prompt);
        navigate('/chat');
      } else {
        alert(data.message || 'Failed to start chat');
      }
    } catch (err) {
      console.error('Create chat error:', err);
      alert('Something went wrong while creating a chat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cns-container">
      {loading && <LoadingOverlay />}

      <div className="cns-header">
        <img src="/assets/Vector (3).png" alt="Menu" className="cns-icon" />
        <img src="/assets/ChatPage_image.png" alt="Logo" className="cns-logo" />
        <img src="/assets/Vector (5).png" alt="Options" className="cns-icon" />
      </div>

      <div className="cns-center">
        <img src="/assets/Bot_Icon.png" alt="Character" className="cns-character" />
        <h2 className="cns-title">
          <span className="cns-line">Welcome</span>
          <span className="cns-line">
            to <span className="cns-highlight">DOT BOT</span>
          </span>
        </h2>
        <p className="cns-subtext">
          Welcome to DOTBot. Instantly navigate Georgia DOT specs and standards.
        </p>
      </div>

      <div className="cns-button-section">
        <button className="get-started-btn" onClick={handleStartChat}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default CreateNewChatScreen;

import React, { useState } from 'react';
import '../Stylying/createnewchatsession.css';
import LoadingOverlay from './LoadingOverlay';
import { Mic, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateNewChatScreen = ({ onCreateNewChat }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStartChat = async () => {
    const prompt = message.trim();
    if (!prompt) return;

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

      const data = await res.json();

      if (res.ok && data.response) {
        await fetch('https://api-azjv7cvnxq-uc.a.run.app/save-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ prompt, response: data.response }),
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
      setMessage('');
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
          Start chatting now.
        </p>
      </div>

      <div className="cns-input-section">
        <input
          className="cns-input"
          placeholder="Start Chat"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleStartChat()}
        />
        <Send className="cns-send" onClick={handleStartChat} />
      </div>
    </div>
  );
};

export default CreateNewChatScreen;

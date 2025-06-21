
import React, { useState } from 'react';
import '../Stylying/createnewchatsession.css';
import { Mic, Send } from 'lucide-react';

const CreateNewChatScreen = ({ onCreateNewChat }) => {
  const [message, setMessage] = useState('');

  const handleStartChat = () => {
    if (!message.trim()) return;

    console.log('Sending:', message);
    if (onCreateNewChat) onCreateNewChat(message);

    setMessage('');
  };

  return (
    <div className="cns-container">
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
        <Mic className="cns-mic" />
        <Send className="cns-send" onClick={handleStartChat} />
      </div>
    </div>
  );
};

export default CreateNewChatScreen;

import '../Stylying/chatscreen.css';
import React, { useState, useEffect, useRef } from 'react';
import { Menu, MoreVertical, Send, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay.jsx';

const ChatScreen = ({ onSettings }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hi! I'm DOTBOT, your GDOT Assistant. Please choose a module and ask your question.",
      isBot: true,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    const prompt = inputText.trim();
    if (!prompt || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: prompt,
      isBot: false,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const idToken = localStorage.getItem('authToken');
      if (!idToken) {
        navigate('/login');
        return;
      }

      const res = await fetch('https://api-azjv7cvnxq-uc.a.run.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({ prompt })
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('authToken');
        navigate('/login');
        return;
      }

      const data = await res.json();
      const botResponse = data.response || 'No response from DOTBot.';

      const botMessage = {
        id: Date.now().toString() + '-bot',
        text: botResponse,
        isBot: true,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);

      await fetch('https://api-azjv7cvnxq-uc.a.run.app/save-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({ prompt, response: botResponse })
      });

    } catch (err) {
      console.error('Chat error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewChat = () => {
    navigate('/create-new-chat');
  };

  return (
    <div className="chat-container">
      {loading && <LoadingOverlay />}

      <div className="chat-topbar">
        <button onClick={() => setShowHistory(true)} className="icon-button">
          <Menu className="icon" />
        </button>
        <div className="chat-logo">
          <img src="/assets/ChatPage_image.png" alt="G Symbol" className="logo-icon" />
        </div>
        <button onClick={onSettings} className="icon-button">
          <MoreVertical className="icon" />
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.isBot ? 'bot' : 'user'}`}>
            <div className={`message ${msg.isBot ? 'bot-message' : 'user-message'}`}>
              <p>{msg.text}</p>
              {msg.image && (
                <div className="message-image">
                  <img src={msg.image} alt="Preview" />
                  <p className="message-link">
                    Click Here: <span className="link-text">🔗 Link</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <div className="chat-input-wrapper">
          <input
            type="text"
            placeholder="Write your question to AI chatbot here"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={loading}
          />
          <button className="mic-button" disabled={loading}>
          </button>
        </div>
        <button onClick={handleSendMessage} className="send-button" disabled={loading}>
          <Send className="send-icon" />
        </button>
      </div>

      {showHistory && (
        <div className="chat-history-overlay">
          <div className="chat-history-panel">
            <div className="chat-history-header">
              <h2>New Chats</h2>
              <button onClick={() => setShowHistory(false)} className="close-button">✕</button>
            </div>
            <button className="new-chat-button" onClick={handleCreateNewChat}>
              Create New Chats
            </button>
            <div className="chat-history-body">
              <div className="chat-history-title">
                <h3>Chats History</h3>
                <button className="see-more-button">See More</button>
              </div>
            </div>
          </div>
          <div className="chat-history-backdrop" onClick={() => setShowHistory(false)}></div>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;


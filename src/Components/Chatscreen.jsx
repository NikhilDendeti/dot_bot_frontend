import '../Stylying/chatscreen.css';
import React, { useState, useEffect, useRef } from 'react';
import { Menu, MoreVertical, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  // ✅ Utility to detect image URLs
  const extractImageUrl = (text) => {
    const imageRegex = /(https?:\/\/[^\s]+?\.(?:png|jpg|jpeg|gif|webp))/i;
    const match = text.match(imageRegex);
    return match ? match[1] : null;
  };

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

      const text = await res.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch (err) {
        alert('Server error: Invalid response format');
        return;
      }

      if (!data.response || typeof data.response !== 'string' || data.response.trim() === '') {
        alert(data.message || 'DOTBot is currently unavailable. Please try again later.');
        return;
      }

      const originalResponse = data.response;
      const imageUrl = extractImageUrl(originalResponse);

      // ✅ Remove image URL from the response text
      const cleanedResponse = imageUrl
        ? originalResponse.replace(imageUrl, '').trim()
        : originalResponse;

      const botMessage = {
        id: Date.now().toString() + '-bot',
        text: cleanedResponse,
        isBot: true,
        timestamp: new Date().toISOString(),
        image: imageUrl
      };

      setMessages(prev => [...prev, botMessage]);

      await fetch('https://api-azjv7cvnxq-uc.a.run.app/save-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({ prompt, response: originalResponse }) // ✅ Save full original response
      });

    } catch (err) {
      console.error('❌ Chat request failed:', err);
      alert('Something went wrong while processing your chat.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewChat = () => {
    navigate('/create-new-chat');
  };

  return (
    <div className="chat-container">
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

              {/* ✅ SHOW IMAGE IF PRESENT */}
              {msg.image && (
                <div className="message-image">
                  <img src={msg.image} alt="Preview" className="preview-image" />
                  <p className="message-link">
                    🔗 <a href={msg.image} target="_blank" rel="noopener noreferrer" className="link-text">View Full Image</a>
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-wrapper bot">
            <div className="message bot-message typing-indicator">
              <p><em>DOTBOT is typing...</em></p>
            </div>
          </div>
        )}

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
            {/* Mic icon (optional) */}
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

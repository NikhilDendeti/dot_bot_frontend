import '../Stylying/homepage.css';
import React, { useEffect, useState } from 'react';
import { Menu, MoreVertical, MessageSquare, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay.jsx';

const HomeScreen = ({ onChatSelect, onChatDelete }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const idToken = localStorage.getItem('authToken');
        if (!idToken) {
          navigate('/login');
          return;
        }

        const res = await fetch('https://api-azjv7cvnxq-uc.a.run.app/get-chat-history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`
          }
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('authToken');
          navigate('/login');
          return;
        }

        const data = await res.json();

        if (res.ok) {
          setChats(data.chats || []);
        } else {
          alert(data.message || 'Failed to fetch chat history');
        }
      } catch (err) {
        console.error('Error fetching chats:', err);
        alert('Something went wrong while fetching chat history');
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, [navigate]);

  const groupChatsByDate = (chatList = []) => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const groups = {
      today: [],
      last7Days: [],
      older: []
    };

    chatList.forEach(chat => {
      const chatDate = new Date(chat.timestamp);
      if (chatDate.toDateString() === today.toDateString()) {
        groups.today.push(chat);
      } else if (chatDate >= sevenDaysAgo) {
        groups.last7Days.push(chat);
      } else {
        groups.older.push(chat);
      }
    });

    return groups;
  };

  const groupedChats = groupChatsByDate(chats);

  const handleCreateNewChat = () => {
    navigate('/create-new-chat');
  };

  return (
    <div className="home-container">
      {loading && <LoadingOverlay />}

      <div className="top-bar">
        <button className="icon-button">
          <Menu className="icon" />
        </button>
        <div className="chat-logo">
          <img src="/assets/ChatPage_image.png" alt="DOTBOT Logo" className="dotbot-logo" />
        </div>
        <button className="icon-button">
          <MoreVertical className="icon" />
        </button>
      </div>

      <div className="main-content">
        <h2 className="section-title">New Chats</h2>
        <button className="create-button" onClick={handleCreateNewChat}>
          Create New Chats
        </button>

        <div className="chat-history-section">
          <div className="history-header">
            <h2 className="section-title">Chats History</h2>
            <button className="see-more">See More</button>
          </div>

          {Object.entries(groupedChats).map(([section, items]) =>
            items.length > 0 ? (
              <div className="chat-group" key={section}>
                <h3 className="group-title">
                  {section === 'today' ? 'Today' : section === 'last7Days' ? '7 Days' : '30 Days'}
                </h3>
                <ul className="chat-list">
                  {items.map(chat => (
                    <li key={chat.id} className="chat-item">
                      <button className="chat-title" onClick={() => onChatSelect?.(chat)}>
                        <MessageSquare className="chat-icon" />
                        <span className="chat-text">{chat.title || 'Untitled Chat'}</span>
                      </button>
                      <button className="delete-btn" onClick={() => onChatDelete?.(chat)}>
                        <Trash2 className="trash-icon" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

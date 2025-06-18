import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';
import '../Stylying/homepage.css'

const HomeScreen = ({ chats, onChatSelect, onChatDelete, onCreateNewChat }) => {
    const groupChatsByDate = (chats = []) => {
        const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const groups = {
      Today: [],
      '7 Days': [],
      '30 Days': [],
    };

    chats.forEach(chat => {
      const chatDate = new Date(chat.timestamp);
      if (chatDate.toDateString() === today.toDateString()) {
        groups.Today.push(chat);
      } else if (chatDate >= sevenDaysAgo) {
        groups['7 Days'].push(chat);
      } else if (chatDate >= thirtyDaysAgo) {
        groups['30 Days'].push(chat);
      }
    });

    return groups;
  };

  const groupedChats = groupChatsByDate(chats);

  return (
    <div className="home-container">
      <div className="top-bar">
        <img src="/assets/Vector (3).png" alt="Menu" className="icon-button" />
        <img src="/assets/ChatPage_image.png" alt="Logo" className="dotbot-logo" />
        <img src="/assets/Vector (5).png" alt="Options" className="icon-button" />
      </div>

      <div className="main-content">
        <h2 className="section-title">New Chats</h2>
        <button className="create-button" onClick={onCreateNewChat}>
          Create New Chats
        </button>

        <div className="history-header">
          <h3 className="section-title">Chats History</h3>
          <button className="see-more">See More</button>
        </div>

        <div className="chat-history">
          {Object.entries(groupedChats).map(([period, chats]) => {
            if (chats.length === 0) return null;
            return (
              <div key={period} className="chat-group">
                <h4 className="group-title">{period}</h4>
                {chats.map(chat => (
                  <div className="chat-item" key={chat.id}>
                    <button className="chat-title" onClick={() => onChatSelect(chat.id)}>
                      <MessageSquare className="chat-icon" />
                      <span>{chat.title}</span>
                    </button>
                    <button className="delete-btn" onClick={() => onChatDelete(chat.id)}>
                      <Trash2 className="trash-icon" />
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

// import '../Stylying/chatscreen.css'
// import React, { useState } from 'react';
// import { Menu, MoreVertical, Send, Mic } from 'lucide-react';

// const ChatScreen = ({ onSettings }) => {
//   const [showHistory, setShowHistory] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       id: '1',
//       text: "Hi! I'm DOTBOT, your GDOT Assistant. Please choose a module and ask your question.",
//       isBot: true,
//       timestamp: new Date().toISOString()
//     },
//     {
//       id: '2',
//       text: "Give me the construction standard D - 47!",
//       isBot: false,
//       timestamp: new Date().toISOString()
//     },
//     {
//       id: '3',
//       text: "D-47 is the construction detail for typical diversion across the road! Here is your preview image:",
//       isBot: true,
//       timestamp: new Date().toISOString(),
//       image:"https://architizer-prod.imgix.net/media/1480440497751Michael-Malone-design-sketch-04.jpg?fit=max&w=1680&q=60&auto=format&auto=compress&cs=strip&h=945"
//     }
//   ]);
//   const [inputText, setInputText] = useState('');

//   const chatHistory = [
//     { id: '1', title: "Who Is Richest Person?", timestamp: new Date().toISOString() },
//     { id: '2', title: "Who Are You?", timestamp: new Date().toISOString() },
//     { id: '3', title: "Who Is Elon Musk?", timestamp: new Date(Date.now() - 7 * 86400000).toISOString() },
//     { id: '4', title: "Write a Song", timestamp: new Date(Date.now() - 7 * 86400000).toISOString() },
//     { id: '5', title: "Who Is Richest Person?", timestamp: new Date(Date.now() - 30 * 86400000).toISOString() },
//   ];

//   const handleSendMessage = async () => {
//     if (!inputText.trim()) return;
  
//     const userMessage = {
//       id: Date.now().toString(),
//       text: inputText,
//       isBot: false,
//       timestamp: new Date().toISOString()
//     };
  
//     setMessages((prev) => [...prev, userMessage]);
//     setInputText('');
  
//     try {
//       // Ask DOTBot (no Authorization for now)
//       const res = await fetch('https://api-azjv7cvnxq-uc.a.run.app/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt: inputText })
//       });
  
//       const data = await res.json();
  
//       const botMessage = {
//         id: Date.now().toString() + '-bot',
//         text: data.response || 'No response from DOTBot.',
//         isBot: true,
//         timestamp: new Date().toISOString()
//       };
  
//       setMessages((prev) => [...prev, botMessage]);
  
//       // Save chat (no Authorization for now)
//       await fetch('https://api-azjv7cvnxq-uc.a.run.app/save-chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           prompt: inputText,
//           response: data.response
//         })
//       });
  
//     } catch (err) {
//       console.error('Chat send error:', err);
//       alert('Failed to send message.');
//     }
//   };
  

//   return (
//     <div className="chat-container">
//       <div className="chat-topbar">
//         <button onClick={() => setShowHistory(true)} className="icon-button">
//           <Menu className="icon" />
//         </button>
//         <div className="chat-logo">
//           <img src="/assets/ChatPage_image.png" alt="G Symbol" className="logo-icon" />
//         </div>
//         <button onClick={onSettings} className="icon-button">
//           <MoreVertical className="icon" />
//         </button>
//       </div>

//       <div className="chat-messages">
//         {messages.map((message) => (
//           <div key={message.id} className={`message-wrapper ${message.isBot ? 'bot' : 'user'}`}>
//             <div className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}>
//               <p>{message.text}</p>
//               {message.image && (
//                 <div className="message-image">
//                   <img src={message.image} alt="Preview" />
//                   <p className="message-link">Click Here: <span className="link-text">🔗 Link</span></p>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="chat-input-area">
//         <div className="chat-input-wrapper">
//           <input
//             type="text"
//             placeholder="write your question to ai chatbot here"
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//           />
//           <button className="mic-button">
//             <Mic className="mic-icon" />
//           </button>
//         </div>
//         <button onClick={handleSendMessage} className="send-button">
//           <Send className="send-icon" />
//         </button>
//       </div>

//       {showHistory && (
//         <div className="chat-history-overlay">
//           <div className="chat-history-panel">
//             <div className="chat-history-header">
//               <h2>New Chats</h2>
//               <button onClick={() => setShowHistory(false)} className="close-button">✕</button>
//             </div>
//             <button className="new-chat-button">Create New Chats</button>
//             <div className="chat-history-body">
//               <div className="chat-history-title">
//                 <h3>Chats History</h3>
//                 <button className="see-more-button">See More</button>
//               </div>
//               {/* <ChatHistory
//                 chats={chatHistory}
//                 onChatSelect={handleChatSelect}
//                 onChatDelete={handleChatDelete}
//               /> */}
//             </div>
//           </div>
//           <div className="chat-history-backdrop" onClick={() => setShowHistory(false)}></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatScreen;


import '../Stylying/chatscreen.css';
import React, { useState } from 'react';
import { Menu, MoreVertical, Send, Mic } from 'lucide-react';

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

  const handleSendMessage = async () => {
    const prompt = inputText.trim();
    if (!prompt) return;

    const userMessage = {
      id: Date.now().toString(),
      text: prompt,
      isBot: false,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    try {
      // Ask DOTBot
      const res = await fetch('https://api-azjv7cvnxq-uc.a.run.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      const botResponse = data.response || 'No response from DOTBot.';

      const botMessage = {
        id: Date.now().toString() + '-bot',
        text: botResponse,
        isBot: true,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);

      // Save Chat
      await fetch('https://api-azjv7cvnxq-uc.a.run.app/save-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, response: botResponse })
      });

    } catch (err) {
      console.error('Chat error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="chat-container">
      {/* Top bar */}
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

      {/* Chat messages */}
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
      </div>

      {/* Input area */}
      <div className="chat-input-area">
        <div className="chat-input-wrapper">
          <input
            type="text"
            placeholder="Write your question to AI chatbot here"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="mic-button">
            <Mic className="mic-icon" />
          </button>
        </div>
        <button onClick={handleSendMessage} className="send-button">
          <Send className="send-icon" />
        </button>
      </div>

      {/* History Overlay */}
      {showHistory && (
        <div className="chat-history-overlay">
          <div className="chat-history-panel">
            <div className="chat-history-header">
              <h2>New Chats</h2>
              <button onClick={() => setShowHistory(false)} className="close-button">✕</button>
            </div>

            <button className="new-chat-button">Create New Chats</button>

            <div className="chat-history-body">
              <div className="chat-history-title">
                <h3>Chats History</h3>
                <button className="see-more-button">See More</button>
              </div>
              {/* Placeholder for future integration */}
              {/* <ChatHistory chats={chatHistory} /> */}
            </div>
          </div>
          <div className="chat-history-backdrop" onClick={() => setShowHistory(false)}></div>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;

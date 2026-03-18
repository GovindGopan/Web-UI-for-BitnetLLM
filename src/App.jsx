import React from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { useChatManager } from './hooks/useChatManager';

function App() {
  const {
    sessions,
    currentSessionId,
    currentSession,
    setCurrentSessionId,
    createSession,
    deleteSession,
    renameSession,
    addMessage
  } = useChatManager();

  return (
    <div className="flex w-full h-screen bg-white text-gray-900 font-sans overflow-hidden selection:bg-blue-200">
      <Sidebar 
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelect={setCurrentSessionId}
        onNew={createSession}
        onDelete={deleteSession}
        onRename={renameSession}
      />
      <ChatArea 
        session={currentSession}
        onAddMessage={addMessage}
      />
    </div>
  );
}

export default App;

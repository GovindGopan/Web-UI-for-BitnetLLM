import React, { useState } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { fetchCompletion } from '../services/api';

export default function ChatArea({ session, onAddMessage }) {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!session) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white text-gray-400">
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          <div>Select or create a chat to start</div>
        </div>
      </div>
    );
  }

  const handleSend = async (text) => {
    const userMessage = { role: 'user', content: text, timestamp: Date.now() };
    onAddMessage(session.id, userMessage);

    const history = [...session.messages, userMessage].map(m => ({ role: m.role, content: m.content }));
    
    setIsGenerating(true);
    const startTime = Date.now();

    try {
      const responseText = await fetchCompletion(history);
      const generationTimeMs = Date.now() - startTime;
      onAddMessage(session.id, { role: 'assistant', content: responseText, timestamp: Date.now(), generationTimeMs });
    } catch (error) {
      console.error(error);
      onAddMessage(session.id, { role: 'assistant', content: 'Connection failed.', timestamp: Date.now() });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shadow-sm z-10 sticky top-0">
        <h1 className="text-xl font-medium text-gray-800 tracking-tight">Quantchat</h1>
        <div className="text-xs text-indigo-700 font-medium flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Local Runtime
        </div>
      </div>
      <MessageList messages={session.messages} isGenerating={isGenerating} />
      <ChatInput onSend={handleSend} isGenerating={isGenerating} />
    </div>
  );
}

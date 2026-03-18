import { useState, useEffect } from 'react';

const STORAGE_KEY = 'bitnet_chat_sessions';

export function useChatManager() {
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse sessions from local storage");
      }
    }
    // Default session
    return [{
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now()
    }];
  });

  const [currentSessionId, setCurrentSessionId] = useState(sessions[0]?.id);

  // Sync to local storage whenever sessions change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const currentSession = sessions.find(s => s.id === currentSessionId);

  const createSession = () => {
    const newSession = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now()
    };
    // Ensure new session is at the top conceptually (sorted by creation later or just unshift)
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  };

  const deleteSession = (id) => {
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== id);
      if (filtered.length === 0) {
        const fallback = {
          id: crypto.randomUUID(),
          title: 'New Chat',
          messages: [],
          createdAt: Date.now()
        };
        setCurrentSessionId(fallback.id);
        return [fallback];
      }
      if (currentSessionId === id) {
        setCurrentSessionId(filtered[0].id);
      }
      return filtered;
    });
  };

  const renameSession = (id, newTitle) => {
    setSessions(prev => prev.map(s => 
      s.id === id ? { ...s, title: newTitle } : s
    ));
  };

  const addMessage = (id, message) => {
    setSessions(prev => prev.map(s => {
      if (s.id === id) {
        let title = s.title;
        // Auto-generate title from first user message if untouched
        if (s.messages.length === 0 && message.role === 'user' && title === 'New Chat') {
          title = message.content.slice(0, 30);
          if (message.content.length > 30) title += '...';
        }
        return {
          ...s,
          title,
          messages: [...s.messages, message]
        };
      }
      return s;
    }));
  };

  return {
    sessions,
    currentSessionId,
    currentSession,
    setCurrentSessionId,
    createSession,
    deleteSession,
    renameSession,
    addMessage
  };
}

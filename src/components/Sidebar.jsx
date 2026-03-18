import React, { useState } from 'react';

export default function Sidebar({ sessions, currentSessionId, onSelect, onNew, onDelete, onRename }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleRenameStart = (e, session) => {
    e.stopPropagation();
    setEditingId(session.id);
    setEditTitle(session.title);
  };

  const handleRenameSubmit = (id) => {
    if (editTitle.trim()) {
      onRename(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Delete this chat?")) {
      onDelete(id);
    }
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-gray-200">
        <button 
          onClick={onNew}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 border border-transparent rounded-xl py-2.5 px-4 text-sm font-medium text-white hover:bg-indigo-700 hover:shadow-md transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          <span className="tracking-wide">New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {sessions.map(session => (
          <div 
            key={session.id}
            onClick={() => onSelect(session.id)}
            className={`group relative flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
              currentSessionId === session.id 
                ? 'bg-gradient-to-r from-indigo-50 to-white border-indigo-100 text-indigo-700 shadow-sm font-medium' 
                : 'border-transparent text-gray-600 hover:bg-white hover:border-gray-200 hover:shadow-sm'
            }`}
          >
            <div className="flex-1 truncate text-sm flex items-center gap-2.5">
              <svg className={`w-4 h-4 shrink-0 transition-colors ${currentSessionId === session.id ? 'text-indigo-500' : 'text-gray-400 group-hover:text-indigo-500'}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
              {editingId === session.id ? (
                <input 
                  autoFocus
                  onClick={e => e.stopPropagation()}
                  onBlur={() => handleRenameSubmit(session.id)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleRenameSubmit(session.id);
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                  className="w-full bg-white border border-blue-300 rounded px-1 text-sm text-gray-900 outline-none"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
              ) : (
                <span className="truncate">{session.title}</span>
              )}
            </div>
            
            {!editingId && (
              <div className="absolute right-2 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                <button onClick={(e) => handleRenameStart(e, session)} className="p-1 text-gray-400 hover:text-blue-600 rounded">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
                <button onClick={(e) => handleDelete(e, session.id)} className="p-1 text-gray-400 hover:text-red-600 rounded">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

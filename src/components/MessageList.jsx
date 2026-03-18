import React, { useEffect, useRef } from 'react';

export default function MessageList({ messages, isGenerating }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-gray-400">
          <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          <p className="text-lg font-light text-gray-500">How can I help you today?</p>
        </div>
      ) : (
        messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-5 py-3.5 shadow-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-sm' 
                : 'bg-gray-50 border border-gray-100 text-gray-800 rounded-bl-sm'
            }`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.role === 'assistant' && msg.generationTimeMs && (
                <div className="text-[10px] text-gray-400 mt-1.5 text-right font-medium">
                  { (msg.generationTimeMs / 1000).toFixed(2) }s
                </div>
              )}
            </div>
          </div>
        ))
      )}
      {isGenerating && (
        <div className="flex justify-start">
          <div className="bg-gray-50 border border-gray-100 text-gray-800 rounded-2xl rounded-bl-sm px-5 py-3.5 shadow-sm inline-flex items-center gap-1.5 h-12">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

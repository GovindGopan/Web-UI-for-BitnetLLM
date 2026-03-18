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
          <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-tr from-indigo-100 to-purple-50 flex items-center justify-center shadow-inner relative">
            <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          </div>
          <p className="text-2xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>
            How can I help you today?
          </p>
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

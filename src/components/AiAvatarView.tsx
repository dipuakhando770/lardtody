import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Bot, Send, User } from 'lucide-react';

export const AiAvatarView: React.FC = () => {
  const { language } = useApp();
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'avatar'; text: string }[]>([
    {
      sender: 'avatar',
      text: language === 'bn' 
        ? 'স্বাগতম মোঃ নাসির! আমি লার্নিকো এআই লার্নিং অ্যাসিস্ট্যান্ট। আপনার ডিজিটাল প্রোডাক্ট বা কোর্স সম্পর্কিত যেকোনো প্রশ্ন করুন।' 
        : 'Welcome Md Nasir! I am your AI learning tutor. Ask me any question about your active courses or eBook strategies.'
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userText = prompt.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setPrompt('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'avatar',
          text: language === 'bn'
            ? `চমৎকার প্রশ্ন! "${userText}" সম্পর্কে বিস্তারিত তথ্য আপনার লেসন ওভারভিউ ও রিসোর্স সেকশনে সংরক্ষিত রয়েছে।`
            : `Great question regarding "${userText}". You can follow the step-by-step video lecture in your active courses module!`
        }
      ]);
    }, 600);
  };

  return (
    <div className="flex-1 bg-white min-h-screen dark:bg-slate-950 p-6 sm:p-10 flex flex-col">
      <div className="border-b border-slate-200 pb-4 dark:border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-cyan-500" />
          <span>AI Avatar Assistant</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {language === 'bn' ? 'কোর্সের যেকোনো প্রশ্ন সরাসরি এআই টিউটরকে জিজ্ঞাসা করুন।' : 'Interactive AI learning assistant for active courses.'}
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 my-6 rounded-3xl border border-slate-200 bg-slate-50/50 p-4 sm:p-6 overflow-y-auto space-y-4 dark:border-slate-800 dark:bg-slate-900/50 flex flex-col justify-between">
        
        <div className="space-y-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex items-start gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.sender === 'avatar' && (
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div className={`rounded-2xl p-3.5 text-xs max-w-md ${
                m.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="mt-4 flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={language === 'bn' ? 'এআই টিউটরকে প্রশ্ন করুন...' : 'Ask your AI tutor anything...'}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

      </div>
    </div>
  );
};

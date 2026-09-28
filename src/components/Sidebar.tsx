import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Video, 
  Users, 
  Sparkles, 
  Bookmark, 
  MessageSquare, 
  Store, 
  ChevronDown, 
  ChevronUp, 
  MoreVertical, 
  ShieldCheck, 
  Copy, 
  CheckCheck,
  PlaySquare,
  Globe
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    user,
    currentView,
    setCurrentView,
    language
  } = useApp();

  const [isLibraryOpen, setIsLibraryOpen] = useState(true);
  const [showCredentials, setShowCredentials] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'pass' | null>(null);

  const handleCopy = (field: 'email' | 'pass', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between h-screen sticky top-0 select-none z-30">
      
      {/* Top Section */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button 
            onClick={() => setCurrentView('activeCourses')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-indigo-600 font-extrabold text-sm tracking-wider">
              L
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white uppercase">
                LEARNIICO
              </span>
              <span className="text-[10px] block text-slate-400 font-semibold tracking-wide">
                LearnToday Portal
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="p-3 space-y-1">
          
          {/* Library (Expandable) */}
          <div className="space-y-0.5">
            <button
              onClick={() => setIsLibraryOpen(!isLibraryOpen)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-slate-500" />
                <span>{language === 'bn' ? 'লাইব্রেরি' : 'Library'}</span>
              </div>
              {isLibraryOpen ? <ChevronUp className="h-3.5 w-3.5 text-slate-400" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-400" />}
            </button>

            {/* Sub items */}
            {isLibraryOpen && (
              <div className="pl-6 space-y-0.5 pt-0.5">
                <button
                  onClick={() => setCurrentView('activeCourses')}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                    currentView === 'activeCourses' || currentView === 'player'
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  <PlaySquare className="h-3.5 w-3.5" />
                  <span>{language === 'bn' ? 'কোর্সসমূহ' : 'Courses'}</span>
                </button>

                <button
                  onClick={() => setCurrentView('webinars')}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                    currentView === 'webinars'
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  <Video className="h-3.5 w-3.5" />
                  <span>{language === 'bn' ? 'ওয়েবিনার' : 'Webinars'}</span>
                </button>

                <button
                  onClick={() => setCurrentView('membership')}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                    currentView === 'membership'
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>{language === 'bn' ? 'মেম্বারশিপ' : 'Membership'}</span>
                </button>
              </div>
            )}
          </div>

          {/* AI Avatar */}
          <button
            onClick={() => setCurrentView('avatar')}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition-all ${
              currentView === 'avatar'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="h-4 w-4 text-cyan-500" />
            <span>AI Avatar</span>
          </button>

          {/* Bookmarks */}
          <button
            onClick={() => setCurrentView('bookmarks')}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition-all ${
              currentView === 'bookmarks'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className="h-4 w-4 text-amber-500" />
            <span>{language === 'bn' ? 'বুকমার্কস' : 'Bookmarks'}</span>
          </button>

          {/* Community */}
          <button
            onClick={() => setCurrentView('community')}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition-all ${
              currentView === 'community'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="h-4 w-4 text-emerald-500" />
            <span>{language === 'bn' ? 'কমিউনিটি' : 'Community'}</span>
          </button>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
        
        {/* Visit Store Button */}
        <button
          onClick={() => setCurrentView('catalog')}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/60 transition-colors"
        >
          <Store className="h-4 w-4 text-amber-600" />
          <span>{language === 'bn' ? 'ভিজিট স্টোর' : 'Visit Store'}</span>
        </button>

        {/* User Card: Md Nasir (Permanent Session) */}
        <div className="relative pt-1">
          <div 
            onClick={() => setShowCredentials(!showCredentials)}
            className="flex items-center justify-between rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
              </div>
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                  {user.name}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  Student • Active
                </p>
              </div>
            </div>
            <MoreVertical className="h-4 w-4 text-slate-400" />
          </div>

          {/* Credentials Helper Dropdown */}
          {showCredentials && (
            <div className="absolute bottom-full left-0 right-0 mb-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-800 dark:bg-slate-900 text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  {language === 'bn' ? 'স্থায়ী সেশন সক্রিয়' : 'Permanent Session'}
                </span>
                <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[9px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  AUTO-LOGGED IN
                </span>
              </div>

              <div className="space-y-1 text-[11px]">
                <div className="flex items-center justify-between rounded bg-slate-50 p-1.5 dark:bg-slate-800/80">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 truncate max-w-[120px]">
                    mdnasirhassan3@gmail.com
                  </span>
                  <button 
                    onClick={() => handleCopy('email', 'mdnasirhassan3@gmail.com')}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    {copiedField === 'email' ? <CheckCheck className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between rounded bg-slate-50 p-1.5 dark:bg-slate-800/80">
                  <span className="text-slate-500">Pass:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    50005000
                  </span>
                  <button 
                    onClick={() => handleCopy('pass', '50005000')}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    {copiedField === 'pass' ? <CheckCheck className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </aside>
  );
};

import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Globe, 
  RotateCw, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Copy, 
  CheckCheck,
  Sparkles,
  Maximize2,
  Minimize2,
  ExternalLink,
  Layers,
  Play,
  FileText,
  Radio,
  BookOpen,
  ShoppingBag,
  Compass
} from 'lucide-react';

export const ActiveCoursesView: React.FC = () => {
  const {
    user,
    openCoursePlayer,
    language
  } = useApp();

  const [currentUrl, setCurrentUrl] = useState('https://www.learntodayy.com/t/u/activeCourses');
  const [inputUrl, setInputUrl] = useState('https://www.learntodayy.com/t/u/activeCourses');
  const [viewMode, setViewMode] = useState<'live-iframe' | 'cards'>('live-iframe');
  const [copiedField, setCopiedField] = useState<'email' | 'pass' | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (url: string) => {
    setCurrentUrl(url);
    setInputUrl(url);
    setIframeKey(prev => prev + 1);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setIframeKey(prev => prev + 1);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleCopy = (field: 'email' | 'pass', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    let url = inputUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://www.learntodayy.com/' + url.replace(/^\//, '');
    }
    handleNavigate(url);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`flex-1 bg-slate-900 text-slate-100 flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950' : 'min-h-screen'}`}>
      
      {/* Top Embedded LearnToday Browser & Broadcast Control Bar */}
      <div className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur px-4 py-2.5 flex flex-col gap-2.5">
        
        {/* Row 1: Status & Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-600/30">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white tracking-tight">
                  LearnToday Live Broadcast & Portal
                </span>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Permanent Session Active</span>
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono block">
                {user.email} • 13 Cookies & JWT Auto-Injected
              </span>
            </div>
          </div>

          {/* Credentials Copy & View Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Quick Copy email */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-300">
              <span className="text-[10px] text-slate-500">Email:</span>
              <span className="font-mono font-bold text-indigo-300">mdnasirhassan3@gmail.com</span>
              <button
                onClick={() => handleCopy('email', 'mdnasirhassan3@gmail.com')}
                className="rounded p-0.5 hover:bg-slate-800 text-slate-400 hover:text-white"
                title="Copy Email"
              >
                {copiedField === 'email' ? <CheckCheck className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>

            {/* Quick Copy password */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-300">
              <span className="text-[10px] text-slate-500">Pass:</span>
              <span className="font-mono font-bold text-emerald-300">50005000</span>
              <button
                onClick={() => handleCopy('pass', '50005000')}
                className="rounded p-0.5 hover:bg-slate-800 text-slate-400 hover:text-white"
                title="Copy Password"
              >
                {copiedField === 'pass' ? <CheckCheck className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center rounded-xl bg-slate-900 p-0.5 border border-slate-800">
              <button
                onClick={() => setViewMode('live-iframe')}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  viewMode === 'live-iframe'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="h-3.5 w-3.5 text-cyan-300" />
                <span>{language === 'bn' ? 'লাইভ সাইট' : 'Live Portal'}</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  viewMode === 'cards'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>{language === 'bn' ? 'কোর্স গ্রিড' : 'Grid'}</span>
              </button>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 p-1.5 text-slate-400 hover:border-slate-700 hover:text-white transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>

          </div>

        </div>

        {/* Row 2: URL Address Bar & Quick Navigation Shortcuts */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Navigation buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleNavigate('https://www.learntodayy.com/t/u/activeCourses')}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              title="Home (Active Courses)"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleRefresh}
              className={`rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`}
              title="Reload Portal"
            >
              <RotateCw className="h-4 w-4" />
            </button>
          </div>

          {/* URL Input Bar */}
          <form onSubmit={handleUrlSubmit} className="flex-1 min-w-[240px] relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-indigo-400" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-1.5 pl-8 pr-16 font-mono text-xs text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
              placeholder="https://www.learntodayy.com/..."
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white hover:bg-indigo-700"
            >
              Go
            </button>
          </form>

          {/* Quick Jump Channels / Sections on learntodayy.com */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs">
            <button
              onClick={() => handleNavigate('https://www.learntodayy.com/t/u/activeCourses')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors whitespace-nowrap ${
                currentUrl.includes('/activeCourses')
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BookOpen className="h-3 w-3" />
              <span>Active Courses</span>
            </button>

            <button
              onClick={() => handleNavigate('https://www.learntodayy.com/s/courses/6869380a2c6d1e6001b93725/take')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors whitespace-nowrap ${
                currentUrl.includes('/take')
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Play className="h-3 w-3 fill-current" />
              <span>Direct Classroom</span>
            </button>

            <button
              onClick={() => handleNavigate('https://www.learntodayy.com/t/u/podcasts')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors whitespace-nowrap ${
                currentUrl.includes('/podcasts')
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Radio className="h-3 w-3 text-cyan-400" />
              <span>Podcasts & Audio</span>
            </button>

            <button
              onClick={() => handleNavigate('https://www.learntodayy.com/s/store')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors whitespace-nowrap ${
                currentUrl.includes('/store')
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <ShoppingBag className="h-3 w-3 text-amber-400" />
              <span>Store / Catalog</span>
            </button>
          </div>

        </div>

      </div>

      {/* Main Broadcast Screen */}
      <div ref={iframeContainerRef} className="flex-1 flex flex-col bg-slate-950 min-h-0 relative">
        
        {viewMode === 'live-iframe' ? (
          <div className="w-full flex-1 flex flex-col h-full min-h-[calc(100vh-110px)] relative">
            <iframe
              key={iframeKey}
              src={`/api/proxy?url=${encodeURIComponent(currentUrl)}`}
              title="LearnToday Live Broadcast"
              className="w-full flex-1 border-0 h-full min-h-[calc(100vh-110px)]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          /* Cards Grid Alternative */
          <div className="p-6 sm:p-10 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
                <FileText className="h-4 w-4 text-indigo-400" />
                <span className="text-slate-500">/</span>
                <span className="font-bold text-white">Digital Product Business Combo Pack</span>
              </div>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                10% Completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div 
                onClick={() => openCoursePlayer('course-ebook-ai')}
                className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg hover:border-indigo-500/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 p-4 flex items-center justify-between text-white">
                  <div className="space-y-1 max-w-[65%] z-10">
                    <span className="inline-block rounded bg-purple-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      eBook Business with AI
                    </span>
                    <h3 className="font-extrabold text-sm leading-tight text-white">
                      Write, Design & Sell
                    </h3>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300&auto=format&fit=crop"
                    alt="eBook"
                    className="h-20 w-20 rounded-xl object-cover border border-purple-400/40"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors">
                    Learning Bangladesh - eBook Business with AI
                  </h4>
                  <p className="text-xs text-slate-400">Learniico Mentor Team • 8 Lessons</p>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                      <Play className="h-3.5 w-3.5 fill-current" /> Watch Video
                    </span>
                    <span className="text-xs text-slate-500 font-mono">10% Done</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div 
                onClick={() => openCoursePlayer('course-start-here')}
                className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg hover:border-indigo-500/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-r from-amber-950 via-slate-950 to-indigo-950 p-4 flex items-center justify-between text-white">
                  <div className="space-y-1 max-w-[65%] z-10">
                    <span className="inline-block rounded bg-amber-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      Master Roadmap
                    </span>
                    <h3 className="font-extrabold text-sm leading-tight text-white">
                      কোন কোর্স দিয়ে শুরু করবেন?
                    </h3>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=300&auto=format&fit=crop"
                    alt="Roadmap"
                    className="h-20 w-20 rounded-xl object-cover border border-amber-400/40"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors">
                    Start Here: Digital Product Business Mastery
                  </h4>
                  <p className="text-xs text-slate-400">Learniico • 4 Lessons</p>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <Play className="h-3.5 w-3.5 fill-current" /> Watch Video
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Orientation</span>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div 
                onClick={() => openCoursePlayer('course-learntoday-active')}
                className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg hover:border-indigo-500/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-r from-cyan-950 via-slate-950 to-blue-950 p-4 flex items-center justify-between text-white">
                  <div className="space-y-1 max-w-[65%] z-10">
                    <span className="inline-block rounded bg-cyan-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      LearnToday Masterclass
                    </span>
                    <h3 className="font-extrabold text-sm leading-tight text-white">
                      6869380a2c6d1e6001b93725
                    </h3>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300&auto=format&fit=crop"
                    alt="Classroom"
                    className="h-20 w-20 rounded-xl object-cover border border-cyan-400/40"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors">
                    LearnToday Active Course Masterclass
                  </h4>
                  <p className="text-xs text-slate-400">LearnToday Instructor Team • 6 Lessons</p>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                      <Play className="h-3.5 w-3.5 fill-current" /> Direct Classroom
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Active</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};

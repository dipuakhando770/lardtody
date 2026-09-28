import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  Download, 
  FileText, 
  MessageSquare, 
  HelpCircle, 
  Clock, 
  ChevronRight, 
  ChevronDown, 
  Maximize2, 
  Award, 
  Send, 
  Trash2, 
  Plus, 
  Sparkles, 
  Search, 
  Code, 
  FileCode, 
  ShieldCheck, 
  Check,
  Globe,
  Copy,
  CheckCheck,
  RotateCcw,
  Volume2,
  ListVideo
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CoursePlayerView: React.FC = () => {
  const {
    user,
    language,
    activeCourse,
    activeLesson,
    notes,
    discussions,
    quizResults,
    setCurrentView,
    selectLesson,
    toggleCompleteLesson,
    toggleBookmark,
    isLessonCompleted,
    isLessonBookmarked,
    addNote,
    deleteNote,
    addDiscussionPost,
    addDiscussionReply,
    submitQuiz,
    setIsCertificateModalOpen,
    setCertificateCourse,
    getCourseProgress
  } = useApp();

  // Set 'video' as the primary default mode so videos load directly without external iframe blocking
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'resources' | 'discussion' | 'quiz' | 'portal'>('overview');
  const [playerMode, setPlayerMode] = useState<'video' | 'iframe'>('video');
  const [copiedField, setCopiedField] = useState<'email' | 'pass' | null>(null);
  const [curriculumSearch, setCurriculumSearch] = useState('');

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-eb-1': true,
    'mod-eb-2': true,
    'mod-sh-1': true,
    'mod-lt-1': true,
    'mod-1': true
  });
  
  // Note input states
  const [newNoteContent, setNewNoteContent] = useState('');
  const [noteTimestampSec, setNoteTimestampSec] = useState(60);

  // Discussion input states
  const [newDiscTitle, setNewDiscTitle] = useState('');
  const [newDiscText, setNewDiscText] = useState('');
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [replyOpenMap, setReplyOpenMap] = useState<Record<string, boolean>>({});

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Theater mode state
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  const courseProgress = getCourseProgress(activeCourse.id);
  const isCurrentLessonDone = isLessonCompleted(activeLesson.id);
  const isCurrentLessonSaved = isLessonBookmarked(activeLesson.id);

  const allLessons = useMemo(() => {
    return activeCourse.modules.flatMap(m => m.lessons);
  }, [activeCourse]);

  const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const currentLessonNotes = notes.filter(n => n.courseId === activeCourse.id && n.lessonId === activeLesson.id);
  const currentLessonDiscussions = discussions.filter(d => d.courseId === activeCourse.id && d.lessonId === activeLesson.id);
  const currentModule = activeCourse.modules.find(m => m.id === activeLesson.moduleId) || activeCourse.modules[0];
  const currentQuiz = currentModule?.quiz;

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleCopy = (field: 'email' | 'pass', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    addNote(activeCourse.id, activeLesson.id, noteTimestampSec, newNoteContent);
    setNewNoteContent('');
  };

  const handlePostDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscText.trim()) return;
    addDiscussionPost(activeCourse.id, activeLesson.id, newDiscTitle, newDiscText);
    setNewDiscTitle('');
    setNewDiscText('');
  };

  const handleSendReply = (postId: string) => {
    const text = replyTextMap[postId];
    if (!text?.trim()) return;
    addDiscussionReply(postId, text);
    setReplyTextMap(prev => ({ ...prev, [postId]: '' }));
    setReplyOpenMap(prev => ({ ...prev, [postId]: false }));
  };

  const handleQuizSubmit = () => {
    if (!currentQuiz) return;
    let correctCount = 0;
    currentQuiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const score = Math.round((correctCount / currentQuiz.questions.length) * 100);
    const passed = score >= currentQuiz.passingScore;
    
    submitQuiz(currentQuiz.id, activeCourse.id, score, passed);
    setQuizSubmitted(true);

    if (passed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  const formatTimestamp = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Filter lessons based on search
  const filteredModules = useMemo(() => {
    if (!curriculumSearch.trim()) return activeCourse.modules;
    const query = curriculumSearch.toLowerCase();
    return activeCourse.modules.map(mod => ({
      ...mod,
      lessons: mod.lessons.filter(l => 
        l.title.toLowerCase().includes(query) || 
        (l.titleBn && l.titleBn.toLowerCase().includes(query))
      )
    })).filter(mod => mod.lessons.length > 0);
  }, [activeCourse, curriculumSearch]);

  return (
    <div className="flex-1 min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      
      {/* Top Navigation Header */}
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 backdrop-blur sm:px-6">
        
        {/* Left: Back to Active Courses & Mode Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('activeCourses')}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{language === 'bn' ? 'সক্রিয় কোর্স তালিকায় ফিরুন' : 'Active Courses'}</span>
          </button>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          {/* Mode Switcher: Video Classroom vs Live Site iFrame */}
          <div className="flex items-center rounded-xl bg-slate-900 p-0.5 border border-slate-800">
            <button
              onClick={() => setPlayerMode('video')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                playerMode === 'video'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{language === 'bn' ? 'ভিডিও ক্লাসরুম' : 'Video Classroom'}</span>
            </button>
            <button
              onClick={() => setPlayerMode('iframe')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                playerMode === 'iframe'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{language === 'bn' ? 'লাইভ সাইট ভিউ' : 'Live Site View'}</span>
            </button>
          </div>
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Progress Pill */}
          <div className="hidden md:flex items-center gap-2 rounded-full border border-indigo-900/60 bg-indigo-950/40 px-3 py-1 text-xs font-bold text-indigo-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
            <span>{courseProgress}% {language === 'bn' ? 'সম্পন্ন' : 'Complete'}</span>
          </div>

          {/* Mark Completed Button */}
          <button
            onClick={() => {
              toggleCompleteLesson(activeLesson.id, activeCourse.id);
              if (!isCurrentLessonDone && nextLesson) {
                setTimeout(() => selectLesson(nextLesson.id), 400);
              }
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              isCurrentLessonDone
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'border border-slate-700 bg-slate-800 text-slate-300 hover:border-emerald-500 hover:text-emerald-400'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span className="hidden sm:inline">
              {isCurrentLessonDone
                ? (language === 'bn' ? 'সম্পন্ন হয়েছে' : 'Completed')
                : (language === 'bn' ? 'সম্পন্ন চিহ্নিত করুন' : 'Mark Complete')}
            </span>
          </button>

          {/* Previous Lesson */}
          <button
            disabled={!prevLesson}
            onClick={() => prevLesson && selectLesson(prevLesson.id)}
            className="flex items-center gap-1 rounded-xl bg-slate-800 border border-slate-700 px-2.5 py-1.5 text-xs font-bold text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Previous Lesson"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>

          {/* Next Lesson */}
          <button
            disabled={!nextLesson}
            onClick={() => nextLesson && selectLesson(nextLesson.id)}
            className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <span className="hidden sm:inline">{language === 'bn' ? 'পরবর্তী' : 'Next'}</span>
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Certificate Trigger */}
          {courseProgress >= 10 && (
            <button
              onClick={() => {
                setCertificateCourse(activeCourse);
                setIsCertificateModalOpen(true);
              }}
              className="hidden lg:flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 px-3 py-1.5 text-xs font-bold text-slate-950 shadow-md transition-all hover:scale-102"
            >
              <Award className="h-4 w-4" />
              <span>{language === 'bn' ? 'সার্টিফিকেট' : 'Certificate'}</span>
            </button>
          )}

        </div>
      </div>

      {/* Main Classroom Grid */}
      <div className={`flex-1 grid ${isTheaterMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'} overflow-hidden`}>
        
        {/* Center/Left: Video Player / Iframe & Interactive Tabs */}
        <div className={`${isTheaterMode ? 'col-span-1' : 'lg:col-span-8 xl:col-span-9'} flex flex-col overflow-y-auto`}>
          
          {/* Main Video Screen */}
          {playerMode === 'video' ? (
            <div className="relative aspect-video w-full bg-black shadow-2xl overflow-hidden">
              <iframe
                key={activeLesson.id}
                src={`${activeLesson.videoUrl}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1`}
                title={activeLesson.title}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            /* Live Proxied Iframe with Injected Cookies */
            <div className="flex flex-col bg-slate-950 border-b border-slate-800">
              <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 p-3 border-b border-indigo-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">
                      LearnToday Portal Authenticated Stream:
                    </span>
                    <span className="text-[11px] text-slate-400">
                      https://www.learntodayy.com/s/courses/6869380a2c6d1e6001b93725/take
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-lg bg-slate-900/90 border border-slate-700 px-2.5 py-1 text-slate-200 text-xs">
                    <span className="text-[10px] text-slate-400">User:</span>
                    <span className="font-mono font-bold text-indigo-300">mdnasirhassan3@gmail.com</span>
                    <button
                      onClick={() => handleCopy('email', 'mdnasirhassan3@gmail.com')}
                      className="ml-1 text-slate-400 hover:text-white"
                    >
                      {copiedField === 'email' ? <CheckCheck className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg bg-slate-900/90 border border-slate-700 px-2.5 py-1 text-slate-200 text-xs">
                    <span className="text-[10px] text-slate-400">Pass:</span>
                    <span className="font-mono font-bold text-emerald-300">50005000</span>
                    <button
                      onClick={() => handleCopy('pass', '50005000')}
                      className="ml-1 text-slate-400 hover:text-white"
                    >
                      {copiedField === 'pass' ? <CheckCheck className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative w-full h-[640px] bg-slate-950">
                <iframe
                  src="/api/proxy?url=https://www.learntodayy.com/s/courses/6869380a2c6d1e6001b93725/take"
                  title="LearnToday Active Course"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Lesson Header Details */}
          <div className="border-b border-slate-800 bg-slate-950 px-4 py-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-indigo-900/60 px-2.5 py-0.5 text-[11px] font-bold text-indigo-300">
                    {language === 'bn' ? currentModule.titleBn : currentModule.title}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span>{activeLesson.duration}</span>
                  </span>
                </div>

                <h1 className="text-lg sm:text-xl font-bold text-white">
                  {language === 'bn' ? activeLesson.titleBn : activeLesson.title}
                </h1>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(activeLesson.id)}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                    isCurrentLessonSaved
                      ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${isCurrentLessonSaved ? 'fill-indigo-400 text-indigo-400' : ''}`} />
                  <span>{isCurrentLessonSaved ? (language === 'bn' ? 'সংরক্ষিত' : 'Saved') : (language === 'bn' ? 'বুকমার্ক' : 'Bookmark')}</span>
                </button>

                <button
                  onClick={() => setIsTheaterMode(!isTheaterMode)}
                  className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>{isTheaterMode ? 'Normal' : 'Theater'}</span>
                </button>
              </div>
            </div>

            {/* Chapters / Timestamps Bar */}
            {activeLesson.timestamps && activeLesson.timestamps.length > 0 && (
              <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="text-slate-400 font-semibold whitespace-nowrap text-[11px]">
                  {language === 'bn' ? 'অধ্যায়সমূহ:' : 'Chapters:'}
                </span>
                {activeLesson.timestamps.map((ts, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-slate-300 whitespace-nowrap hover:border-indigo-500 hover:text-indigo-300 transition-colors"
                  >
                    <span className="font-mono text-[10px] text-indigo-400">{formatTimestamp(ts.time)}</span>
                    <span>{ts.label}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Lesson Tabs */}
          <div className="border-b border-slate-800 bg-slate-950 px-4 sm:px-6">
            <div className="flex items-center gap-2 overflow-x-auto">
              
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 border-b-2 py-3 px-3 text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>{language === 'bn' ? 'ওভারভিউ ও শিখনফল' : 'Overview'}</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-2 border-b-2 py-3 px-3 text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'notes'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCode className="h-4 w-4" />
                <span>{language === 'bn' ? 'টাইমস্ট্যাম্পড নোটস' : 'Notes'}</span>
                {currentLessonNotes.length > 0 && (
                  <span className="rounded-full bg-slate-800 px-1.5 py-0.2 text-[10px] text-slate-300">
                    {currentLessonNotes.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`flex items-center gap-2 border-b-2 py-3 px-3 text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'resources'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Download className="h-4 w-4" />
                <span>{language === 'bn' ? 'রিসোর্স ও ফাইল' : 'Resources'}</span>
                <span className="rounded-full bg-slate-800 px-1.5 py-0.2 text-[10px] text-slate-300">
                  {activeLesson.resources.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('discussion')}
                className={`flex items-center gap-2 border-b-2 py-3 px-3 text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'discussion'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span>{language === 'bn' ? 'প্রশ্নোত্তর ফোরাম' : 'Q&A Forum'}</span>
                {currentLessonDiscussions.length > 0 && (
                  <span className="rounded-full bg-slate-800 px-1.5 py-0.2 text-[10px] text-slate-300">
                    {currentLessonDiscussions.length}
                  </span>
                )}
              </button>

              {currentQuiz && (
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`flex items-center gap-2 border-b-2 py-3 px-3 text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === 'quiz'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-amber-400/80 hover:text-amber-300'
                  }`}
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>{language === 'bn' ? 'মডিউল কুইজ' : 'Module Quiz'}</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('portal')}
                className={`flex items-center gap-2 border-b-2 py-3 px-3 text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'portal'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'bn' ? 'সেশন তথ্য' : 'Session Info'}</span>
              </button>

            </div>
          </div>

          {/* Tab Contents Area */}
          <div className="flex-1 bg-slate-900 p-4 sm:p-6">
            
            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-300 mb-2">
                    {language === 'bn' ? 'লেসনের সারসংক্ষেপ' : 'About this lesson'}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {language === 'bn' ? activeLesson.descriptionBn : activeLesson.description}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3">
                    <Sparkles className="h-4 w-4" />
                    <span>{language === 'bn' ? 'মূল বিষয়বস্তু ও শিখনফল' : 'Key Takeaways & Learning Goals'}</span>
                  </h4>
                  <ul className="space-y-2">
                    {(language === 'bn' ? activeLesson.summaryPointsBn : activeLesson.summaryPoints).map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab: Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-6 max-w-4xl">
                <form onSubmit={handleAddNote} className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{language === 'bn' ? 'ভিডিও টাইমস্ট্যাম্পে নোট যোগ করুন' : 'Add timestamped note'}</span>
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <span>{language === 'bn' ? 'সময় (সেকেন্ড):' : 'Time (sec):'}</span>
                      <input
                        type="number"
                        min="0"
                        value={noteTimestampSec}
                        onChange={(e) => setNoteTimestampSec(Number(e.target.value))}
                        className="w-16 rounded border border-slate-700 bg-slate-900 px-2 py-0.5 text-center text-xs text-white"
                      />
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    required
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder={language === 'bn' ? 'এই লেসনের গুরুত্বপূর্ণ পয়েন্ট লিখে রাখুন...' : 'Write important reminders, formulas, or insights here...'}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>{language === 'bn' ? 'নোট সংরক্ষণ করুন' : 'Save Note'}</span>
                    </button>
                  </div>
                </form>

                <div className="space-y-3">
                  {currentLessonNotes.map((note) => (
                    <div
                      key={note.id}
                      className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-indigo-900/60 px-2 py-0.5 font-mono text-[10px] font-bold text-indigo-300">
                            {formatTimestamp(note.timestampSec)}
                          </span>
                          <span className="text-[10px] text-slate-500">{note.createdAt}</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed pt-1">
                          {note.content}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-950/40 hover:text-rose-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Resources */}
            {activeTab === 'resources' && (
              <div className="space-y-4 max-w-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeLesson.resources.map((res) => (
                    <div
                      key={res.id}
                      className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4 hover:border-indigo-500/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-950 text-indigo-400">
                          {res.type === 'pdf' && <FileText className="h-5 w-5" />}
                          {res.type === 'code' && <Code className="h-5 w-5" />}
                          {res.type === 'zip' && <Download className="h-5 w-5" />}
                          {res.type === 'link' && <Globe className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-bold text-xs text-white">{res.title}</p>
                          {res.size && <p className="text-[10px] text-slate-500">{res.size}</p>}
                        </div>
                      </div>
                      <button className="rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-300 hover:border-indigo-500 hover:text-white">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Discussion */}
            {activeTab === 'discussion' && (
              <div className="space-y-6 max-w-4xl">
                <form onSubmit={handlePostDiscussion} className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                  <input
                    type="text"
                    placeholder={language === 'bn' ? 'প্রশ্নের শিরোনাম...' : 'Question subject/title...'}
                    value={newDiscTitle}
                    onChange={(e) => setNewDiscTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    required
                    value={newDiscText}
                    onChange={(e) => setNewDiscText(e.target.value)}
                    placeholder={language === 'bn' ? 'আপনার প্রশ্নের বিস্তারিত লিখুন...' : 'Describe your question...'}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>{language === 'bn' ? 'পোস্ট করুন' : 'Post'}</span>
                    </button>
                  </div>
                </form>

                <div className="space-y-4">
                  {currentLessonDiscussions.map((post) => (
                    <div key={post.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <img src={post.userAvatar} alt={post.userName} className="h-6 w-6 rounded-full" />
                        <span className="font-bold text-xs text-white">{post.userName}</span>
                        <span className="text-[10px] text-slate-500">{post.createdAt}</span>
                      </div>
                      <h4 className="font-bold text-xs text-indigo-300">{post.title}</h4>
                      <p className="text-xs text-slate-300">{post.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Quiz */}
            {activeTab === 'quiz' && currentQuiz && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-white">
                    {language === 'bn' ? currentQuiz.titleBn : currentQuiz.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {currentQuiz.questions.map((q, idx) => (
                    <div key={q.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                      <p className="font-bold text-xs text-white">{idx + 1}. {language === 'bn' ? q.questionBn : q.question}</p>
                      <div className="space-y-1.5">
                        {(language === 'bn' ? q.optionsBn : q.options).map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                            className={`w-full rounded-xl border p-2.5 text-left text-xs ${
                              selectedAnswers[q.id] === oIdx ? 'border-indigo-500 bg-indigo-950/60 font-bold' : 'border-slate-800 bg-slate-900 text-slate-300'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleQuizSubmit}
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  {language === 'bn' ? 'কুইজ জমা দিন' : 'Submit Quiz'}
                </button>
              </div>
            )}

            {/* Tab: Portal / Session */}
            {activeTab === 'portal' && (
              <div className="space-y-6 max-w-4xl">
                <div className="rounded-3xl border border-indigo-900/50 bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-900 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-300">
                      <Globe className="h-3.5 w-3.5" />
                      <span>LearnToday Active Course Configuration</span>
                    </span>
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="h-4 w-4" />
                      Auto-Logged In
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      https://www.learntodayy.com/s/courses/6869380a2c6d1e6001b93725/take
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {language === 'bn'
                        ? 'আপনার অ্যাকাউন্ট স্থায়ীভাবে লগইন করা রয়েছে। এই উইন্ডোর ভিতরেই সকল সক্রিয় কোর্স এবং ভিডিও ক্লাসরুম সার্বক্ষণিকভাবে এক্সেসযোগ্য।'
                        : 'Your account session is permanent and all active course videos and modules stay strictly inside this app.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">User Email</span>
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-sm text-indigo-300">mdnasirhassan3@gmail.com</span>
                        <button
                          onClick={() => handleCopy('email', 'mdnasirhassan3@gmail.com')}
                          className="rounded-lg p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white"
                        >
                          {copiedField === 'email' ? <CheckCheck className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">Password</span>
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-sm text-emerald-300">50005000</span>
                        <button
                          onClick={() => handleCopy('pass', '50005000')}
                          className="rounded-lg p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white"
                        >
                          {copiedField === 'pass' ? <CheckCheck className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Sidebar: Modules, Lessons & Curriculum */}
        {!isTheaterMode && (
          <div className="lg:col-span-4 xl:col-span-3 border-l border-slate-800 bg-slate-950 flex flex-col h-full overflow-hidden">
            
            <div className="p-4 border-b border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
                  <ListVideo className="h-4 w-4 text-indigo-400" />
                  <span>{language === 'bn' ? 'কোর্স কারিকুলাম ও ভিডিওসমূহ' : 'Course Curriculum'}</span>
                </h3>
                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400 font-bold">
                  {allLessons.length} {language === 'bn' ? 'টি লেসন' : 'Lessons'}
                </span>
              </div>

              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder={language === 'bn' ? 'লেসন খুঁজুন...' : 'Search lessons...'}
                  value={curriculumSearch}
                  onChange={(e) => setCurriculumSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 py-1.5 pl-8 pr-3 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {filteredModules.map((mod) => {
                const isExpanded = expandedModules[mod.id] ?? true;
                const completedInMod = mod.lessons.filter(l => isLessonCompleted(l.id)).length;

                return (
                  <div key={mod.id} className="rounded-xl border border-slate-800/80 bg-slate-900/40 overflow-hidden">
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="flex w-full items-center justify-between p-3 text-left hover:bg-slate-900 transition-colors"
                    >
                      <div className="pr-2">
                        <span className="font-bold text-xs text-slate-200 block line-clamp-1">
                          {language === 'bn' ? mod.titleBn : mod.title}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {completedInMod}/{mod.lessons.length} {language === 'bn' ? 'সম্পন্ন' : 'done'}
                        </span>
                      </div>
                      {isExpanded ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                    </button>

                    {isExpanded && (
                      <div className="space-y-0.5 border-t border-slate-800/60 p-1">
                        {mod.lessons.map((les) => {
                          const isActive = les.id === activeLesson.id;
                          const isDone = isLessonCompleted(les.id);

                          return (
                            <button
                              key={les.id}
                              onClick={() => selectLesson(les.id)}
                              className={`flex w-full items-center justify-between rounded-lg p-2.5 text-left transition-colors ${
                                isActive
                                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCompleteLesson(les.id, activeCourse.id);
                                  }}
                                  className="shrink-0"
                                >
                                  {isDone ? (
                                    <CheckCircle2 className={`h-4 w-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                                  ) : (
                                    <Circle className={`h-4 w-4 ${isActive ? 'text-white/60' : 'text-slate-600'}`} />
                                  )}
                                </div>
                                <span className="text-xs line-clamp-1">
                                  {language === 'bn' ? les.titleBn : les.title}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0 text-[11px]">
                                <span className={isActive ? 'text-indigo-200' : 'text-slate-500'}>
                                  {les.duration}
                                </span>
                                {isActive && <Play className="h-3 w-3 fill-current" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

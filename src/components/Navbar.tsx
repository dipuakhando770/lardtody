import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  PlaySquare, 
  BookOpen, 
  Award, 
  Bookmark, 
  Search, 
  Sun, 
  Moon, 
  Languages, 
  User as UserIcon, 
  LogOut, 
  PlusCircle, 
  Flame, 
  CheckCircle2,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    user,
    isAuthenticated,
    language,
    theme,
    currentView,
    searchQuery,
    setLanguage,
    setTheme,
    setCurrentView,
    setSearchQuery,
    setIsAuthModalOpen,
    setIsAddCourseModalOpen,
    quickLoginDemo,
    logout,
    getTotalEnrolledCourses
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const enrolledCount = getTotalEnrolledCourses().length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-slate-900/95 dark:supports-[backdrop-filter]:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setCurrentView('activeCourses')}
            className="flex items-center gap-2.5 text-left group transition-transform hover:scale-102"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 shadow-md shadow-indigo-500/20 text-white font-bold text-xl">
              <PlaySquare className="h-6 w-6 transition-transform group-hover:scale-110" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-cyan-400">
                  LearnToday
                </span>
                <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300">
                  PORTAL
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {language === 'bn' ? 'সক্রিয় কোর্স ও ভিডিও ক্লাসরুম' : 'Active Courses & Video Classroom'}
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentView('activeCourses')}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                currentView === 'activeCourses' || currentView === 'player'
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <PlaySquare className="h-4 w-4" />
              <span>{language === 'bn' ? 'আমার সক্রিয় কোর্সসমূহ' : 'Active Courses'}</span>
              {enrolledCount > 0 && (
                <span className="ml-0.5 rounded-full bg-indigo-600 px-2 py-0.5 text-[11px] font-bold text-white">
                  {enrolledCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentView('catalog')}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                currentView === 'catalog'
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>{language === 'bn' ? 'কোর্স ব্রাউজ' : 'Explore Courses'}</span>
            </button>

            <button
              onClick={() => setCurrentView('certificates')}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                currentView === 'certificates'
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <Award className="h-4 w-4" />
              <span>{language === 'bn' ? 'সার্টিফিকেট' : 'Certificates'}</span>
            </button>

            <button
              onClick={() => setCurrentView('bookmarks')}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                currentView === 'bookmarks'
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className="h-4 w-4" />
              <span>{language === 'bn' ? 'বুকমার্ক' : 'Saved'}</span>
            </button>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-xs mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'কোর্স বা বিষয় খুঁজুন...' : 'Search courses or topics...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-100/80 py-1.5 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-900"
            />
          </div>
        </div>

        {/* Right Action Icons & Auth Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Add Custom Course */}
          <button
            onClick={() => setIsAddCourseModalOpen(true)}
            title={language === 'bn' ? 'কাস্টম কোর্স বা ভিডিও লিংক যোগ করুন' : 'Import Custom Course Video'}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/70"
          >
            <PlusCircle className="h-4 w-4" />
            <span>{language === 'bn' ? '+ নতুন ভিডিও লিংক' : '+ Custom Video'}</span>
          </button>

          {/* Study Streak Badge */}
          {user && (
            <div 
              title={language === 'bn' ? `${user.studyStreakDays} দিন স্টাডি স্ট্রিক!` : `${user.studyStreakDays} Day Study Streak!`}
              className="flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-bold text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300"
            >
              <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500 animate-pulse" />
              <span>{user.studyStreakDays}d</span>
            </div>
          )}

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1 rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            title={language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
          >
            <Languages className="h-4 w-4" />
            <span className="text-xs font-bold uppercase">{language}</span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
          </button>

          {/* User Profile / Login Button */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 rounded-full ring-2 ring-indigo-500/30 p-0.5 transition-all hover:ring-indigo-500"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover bg-indigo-100"
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setIsProfileMenuOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl z-40 dark:border-slate-800 dark:bg-slate-900">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-400">
                        {language === 'bn' ? 'লগইন করা অ্যাকাউন্ট' : 'Signed In As'}
                      </p>
                      <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setCurrentView('activeCourses');
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <PlaySquare className="h-4 w-4 text-indigo-600" />
                        <span>{language === 'bn' ? 'আমার সক্রিয় কোর্সসমূহ' : 'My Active Courses'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('certificates');
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <Award className="h-4 w-4 text-amber-500" />
                        <span>{language === 'bn' ? 'অর্জিত সার্টিফিকেটসমূহ' : 'My Certificates'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsAddCourseModalOpen(true);
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <PlusCircle className="h-4 w-4 text-emerald-600" />
                        <span>{language === 'bn' ? 'কাস্টম ভিডিও যোগ করুন' : 'Import Custom Video'}</span>
                      </button>
                    </div>

                    <div className="border-t border-slate-100 pt-1 dark:border-slate-800">
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{language === 'bn' ? 'লগআউট করুন' : 'Sign Out'}</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => quickLoginDemo('nasir')}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors"
              >
                <UserIcon className="h-3.5 w-3.5" />
                <span>{language === 'bn' ? 'নাসির হাসান লগইন' : 'Nasir Login'}</span>
              </button>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                {language === 'bn' ? 'লগইন' : 'Sign In'}
              </button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'কোর্স খুঁজুন...' : 'Search courses...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-100 py-2 pl-9 pr-4 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                setCurrentView('activeCourses');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg bg-indigo-50 p-2.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
            >
              <PlaySquare className="h-4 w-4" />
              <span>{language === 'bn' ? 'সক্রিয় কোর্সসমূহ' : 'Active Courses'}</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('catalog');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg border border-slate-200 p-2.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300"
            >
              <BookOpen className="h-4 w-4" />
              <span>{language === 'bn' ? 'সব কোর্স' : 'All Courses'}</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('certificates');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg border border-slate-200 p-2.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300"
            >
              <Award className="h-4 w-4" />
              <span>{language === 'bn' ? 'সার্টিফিকেট' : 'Certificates'}</span>
            </button>

            <button
              onClick={() => {
                setIsAddCourseModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg border border-slate-200 p-2.5 text-xs font-semibold text-emerald-600 dark:border-slate-800 dark:text-emerald-400"
            >
              <PlusCircle className="h-4 w-4" />
              <span>{language === 'bn' ? '+ কাস্টম ভিডিও' : '+ Custom Video'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

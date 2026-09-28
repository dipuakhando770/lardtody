import React from 'react';
import { useApp } from '../context/AppContext';
import { Bookmark, Play, Trash2, ArrowRight, FolderPlus } from 'lucide-react';

export const BookmarksView: React.FC = () => {
  const {
    user,
    courses,
    language,
    openCoursePlayer,
    toggleBookmark,
    setCurrentView
  } = useApp();

  const bookmarkedIds = user?.bookmarkedLessonIds || [];

  // Find all lessons that match
  const savedLessons = courses.flatMap(c => 
    c.modules.flatMap(m => 
      m.lessons
        .filter(l => bookmarkedIds.includes(l.id))
        .map(l => ({ ...l, course: c }))
    )
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 dark:bg-slate-950">
      
      {/* Header */}
      <div className="border-b border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <Bookmark className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'bn' ? 'সংরক্ষিত লেসন ও বুকমার্কসমূহ' : 'Saved Lessons & Bookmarks'}
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'bn' ? 'যেকোনো লেসনে বুকমার্ক চিহ্ন ক্লিক করে এখানে দ্রুত এক্সেসের জন্য সংরক্ষণ করুন।' : 'Quick access to your saved video lessons.'}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {savedLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedLessons.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {language === 'bn' ? item.course.titleBn : item.course.title}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1 line-clamp-2">
                    {language === 'bn' ? item.titleBn : item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {language === 'bn' ? item.descriptionBn : item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-400 font-mono">{item.duration}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(item.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg dark:hover:bg-rose-950/50"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => openCoursePlayer(item.course.id, item.id)}
                      className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
                    >
                      <Play className="h-3 w-3 fill-white" />
                      <span>{language === 'bn' ? 'প্লে করুন' : 'Play'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900/50">
            <Bookmark className="mx-auto mb-3 h-10 w-10 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'কোনো বুকমার্ক লেসন নেই' : 'No saved lessons yet'}
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              {language === 'bn' ? 'ভিডিও দেখার সময় বুকমার্ক বাটনে ক্লিক করুন।' : 'Bookmark lessons while watching videos to save them here.'}
            </p>
            <button
              onClick={() => setCurrentView('activeCourses')}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white"
            >
              {language === 'bn' ? 'সক্রিয় কোর্সে যান' : 'Go to Active Courses'}
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

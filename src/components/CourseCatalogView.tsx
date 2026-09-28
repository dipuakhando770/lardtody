import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import { 
  Search, 
  Star, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Play, 
  Sparkles, 
  Filter, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const CourseCatalogView: React.FC = () => {
  const {
    courses,
    user,
    language,
    enrollCourse,
    openCoursePlayer,
    searchQuery,
    setSearchQuery,
    getCourseProgress
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const categories = [
    { id: 'all', labelEn: 'All Categories', labelBn: 'সকল বিষয়' },
    { id: 'web-dev', labelEn: 'Web Development', labelBn: 'ওয়েব ডেভেলপমেন্ট' },
    { id: 'marketing', labelEn: 'Digital Marketing', labelBn: 'ডিজিটাল মার্কেটিং' },
    { id: 'design', labelEn: 'UI/UX Design', labelBn: 'ডিজাইন' },
    { id: 'python', labelEn: 'Python & AI', labelBn: 'পাইথন ও এআই' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      !searchQuery.trim() ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.titleBn.includes(searchQuery) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 dark:bg-slate-950">
      
      {/* Catalog Header */}
      <div className="border-b border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              {language === 'bn' ? 'লার্নটুডে প্রিমিয়াম কোর্স ক্যাটালগ' : 'LearnToday Premium Catalog'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'bn' ? 'স্কিল আপগ্রেড করুন নতুন কোর্সের মাধ্যমে' : 'Explore Courses & Upskill'}
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {language === 'bn'
                ? 'যেকোনো কোর্সে ১-ক্লিকে এনরোল করুন এবং সাথে সাথে ভিডিও লেসন, কুইজ ও সার্টিফিকেট এক্সেস পান।'
                : 'Enroll in professional video masterclasses with verified certificates and project assignments.'}
            </p>
          </div>

          {/* Filter Chips */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {language === 'bn' ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = user?.enrolledCourseIds.includes(course.id);
            const progress = getCourseProgress(course.id);

            return (
              <div
                key={course.id}
                className="group relative flex flex-col rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-4 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                      {language === 'bn' ? course.categoryNameBn : course.categoryName}
                    </span>
                  </div>

                  {isEnrolled && (
                    <div className="absolute top-2.5 right-2.5 rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-bold text-white flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{language === 'bn' ? 'এনরোল্ড' : 'Enrolled'}</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  
                  <div>
                    {/* Instructor & Rating */}
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="h-5 w-5 rounded-full object-cover"
                        />
                        <span className="font-semibold text-slate-600 dark:text-slate-400">
                          {course.instructor.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
                        <Star className="h-3.5 w-3.5 fill-amber-500" />
                        <span>{course.rating}</span>
                        <span className="text-slate-400 font-normal">({course.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 line-clamp-2 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {language === 'bn' ? course.titleBn : course.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 dark:text-slate-400">
                      {language === 'bn' ? course.subtitleBn : course.subtitle}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 pt-2.5 dark:border-slate-800">
                    <span className="flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5" />
                      <span>{course.modules.length} {language === 'bn' ? 'মডিউল' : 'Modules'}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{course.totalDuration}</span>
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="pt-2">
                    {isEnrolled ? (
                      <button
                        onClick={() => openCoursePlayer(course.id)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors"
                      >
                        <Play className="h-3.5 w-3.5 fill-white" />
                        <span>{language === 'bn' ? `ক্লাস দেখুন (${progress}%)` : `Continue (${progress}%)`}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => enrollCourse(course.id)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-600 transition-colors dark:bg-indigo-600 dark:hover:bg-indigo-700"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                        <span>{language === 'bn' ? 'সক্রিয় কোর্সে এনরোল করুন' : 'Enroll in Course (Free)'}</span>
                      </button>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

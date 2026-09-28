import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, CheckCircle2, Download, ShieldCheck, Sparkles, ExternalLink, Play } from 'lucide-react';

export const CertificatesView: React.FC = () => {
  const {
    courses,
    language,
    user,
    setCertificateCourse,
    setIsCertificateModalOpen,
    getCourseProgress,
    openCoursePlayer,
    setCurrentView
  } = useApp();

  const enrolledCourses = courses.filter(c => user?.enrolledCourseIds.includes(c.id));

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 dark:bg-slate-950">
      
      {/* Header */}
      <div className="border-b border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-500">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {language === 'bn' ? 'অর্জিত ও ভেরিফায়েড সার্টিফিকেটসমূহ' : 'Certificates & Credentials'}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'bn' ? 'কোর্সের সকল লেসন ও কুইজ সম্পন্ন করে ভেরিফায়েড সার্টিফিকেট অর্জন করুন।' : 'Official digital completion credentials.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => {
            const progress = getCourseProgress(course.id);
            const isCompleted = progress === 100;
            const certId = `LT-CERT-${course.id.slice(7).toUpperCase()}-${user?.id.slice(-4) || '2026'}`;

            return (
              <div
                key={course.id}
                className={`rounded-3xl border p-5 shadow-sm transition-all flex flex-col justify-between space-y-4 ${
                  isCompleted
                    ? 'border-amber-300 bg-gradient-to-b from-amber-50/50 to-white dark:border-amber-900/60 dark:from-amber-950/20 dark:to-slate-900'
                    : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 opacity-90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      <ShieldCheck className="h-3 w-3" />
                      <span>{certId}</span>
                    </span>

                    <span className={`text-xs font-bold ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                      {progress}% {language === 'bn' ? 'সম্পন্ন' : 'Done'}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2">
                    {language === 'bn' ? course.titleBn : course.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {language === 'bn' ? `ইন্সট্রাক্টর: ${course.instructor.name}` : `Instructor: ${course.instructor.name}`}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCertificateCourse(course);
                      setIsCertificateModalOpen(true);
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all ${
                      isCompleted
                        ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md shadow-amber-500/20'
                        : 'border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Award className="h-4 w-4" />
                    <span>{language === 'bn' ? 'সার্টিফিকেট প্রিভিউ / ডাউনলোড' : 'View Certificate'}</span>
                  </button>

                  <button
                    onClick={() => openCoursePlayer(course.id)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                    title="Open course"
                  >
                    <Play className="h-4 w-4 fill-current" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

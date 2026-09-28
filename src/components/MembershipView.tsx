import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, ShieldCheck, CheckCircle2, Award, Zap, Sparkles } from 'lucide-react';

export const MembershipView: React.FC = () => {
  const { user, language, setCurrentView } = useApp();

  return (
    <div className="flex-1 bg-white min-h-screen dark:bg-slate-950 p-6 sm:p-10 space-y-6">
      <div className="border-b border-slate-200 pb-4 dark:border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          {language === 'bn' ? 'আমার মেম্বারশিপ স্ট্যাটাস' : 'VIP Student Membership'}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {language === 'bn' ? 'লার্নটুডে এবং লার্নিকো লাইফটাইম স্টুডেন্ট মেম্বারশিপ।' : 'Learniico Lifetime Combo Pack Membership.'}
        </p>
      </div>

      <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/60 via-white to-cyan-50/40 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold text-xl shadow-md">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <span className="rounded bg-indigo-600 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                ACTIVE LIFETIME
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                Digital Product Business VIP Combo
              </h2>
            </div>
          </div>
          <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
            Valid Till: Lifetime
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          {language === 'bn'
            ? 'আপনার অ্যাকাউন্টে ডিজিটাল প্রোডাক্ট কম্বো প্যাক, সকল ভিডিও লেকচার, লাইভ সাপোর্ট এবং ভেরিফায়েড সার্টিফিকেটের আজীবন এক্সেস সক্রিয় রয়েছে।'
            : 'You have full lifetime access to all active course materials, video classroom modules, downloadable source files, and community access.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-indigo-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Full Video Access (No Expiry)</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Timetagged Notes Sync</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Official Completion Certificate</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setCurrentView('activeCourses')}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
          >
            {language === 'bn' ? 'সক্রিয় কোর্স তালিকায় যান' : 'Go to Active Courses'}
          </button>
        </div>
      </div>
    </div>
  );
};

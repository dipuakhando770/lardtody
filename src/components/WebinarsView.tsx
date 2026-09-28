import React from 'react';
import { useApp } from '../context/AppContext';
import { Video, Calendar, Clock, Play, Users, Sparkles } from 'lucide-react';

export const WebinarsView: React.FC = () => {
  const { language, openCoursePlayer } = useApp();

  const webinars = [
    {
      id: 'web-1',
      title: 'Live Q&A: Scaling eBook Sales to $2,000/month with Meta Ads',
      titleBn: 'লাইভ প্রশ্নোত্তর: মেটা বিজ্ঞাপন দিয়ে ই-বুক সেল বৃদ্ধির কৌশল',
      host: 'Mentor Daniel Mott',
      date: 'Upcoming Sunday • 8:00 PM',
      duration: '90 Mins',
      attendees: '1,240 Registered',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'web-2',
      title: 'Mastering AI Prompting for High-Ticket Digital Courses',
      titleBn: 'হাই-টিকেট ডিজিটাল প্রোডাক্ট তৈরির জন্য মাস্টার প্রম্পট ইঞ্জিনিয়ারিং',
      host: 'Learniico Team',
      date: 'Recorded Session',
      duration: '75 Mins',
      attendees: '3,890 Views',
      thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="flex-1 bg-white min-h-screen dark:bg-slate-950 p-6 sm:p-10 space-y-6">
      <div className="border-b border-slate-200 pb-4 dark:border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          {language === 'bn' ? 'লাইভ ও রেকর্ডেড ওয়েবিনার' : 'Webinars & Live Workshops'}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {language === 'bn' ? 'ডিজিটাল প্রোডাক্ট ও ক্যারিয়ার সংক্রান্ত এক্সক্লুসিভ লাইভ সেশন।' : 'Access exclusive masterclasses and workshops.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {webinars.map((w) => (
          <div key={w.id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="relative aspect-video w-full bg-slate-950">
              <img src={w.thumbnail} alt={w.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => openCoursePlayer('course-start-here')}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg"
                >
                  <Play className="h-5 w-5 fill-white ml-0.5" />
                </button>
              </div>
            </div>
            <div className="p-5 space-y-2">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{w.host}</span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{language === 'bn' ? w.titleBn : w.title}</h3>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-slate-400" /> {w.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-slate-400" /> {w.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

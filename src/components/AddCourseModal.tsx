import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course, Lesson, Module } from '../types';
import { X, PlusCircle, Video, Play, Sparkles, Link as LinkIcon, Check } from 'lucide-react';

export const AddCourseModal: React.FC = () => {
  const {
    isAddCourseModalOpen,
    setIsAddCourseModalOpen,
    addNewCustomCourse,
    language,
    user
  } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'web-dev' | 'design' | 'marketing' | 'python' | 'video' | 'freelancing'>('web-dev');
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=SqcY0GlETPk');
  const [lessonTitle, setLessonTitle] = useState('1. Introduction & Full Course Lecture');
  const [description, setDescription] = useState('Comprehensive custom educational video lecture imported into your LearnToday active courses.');

  if (!isAddCourseModalOpen) return null;

  const convertToEmbedUrl = (url: string) => {
    if (!url) return 'https://www.youtube-nocookie.com/embed/SqcY0GlETPk';
    if (url.includes('youtube.com/watch?v=')) {
      const vidId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube-nocookie.com/embed/${vidId}`;
    }
    if (url.includes('youtu.be/')) {
      const vidId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube-nocookie.com/embed/${vidId}`;
    }
    if (url.includes('embed/')) {
      return url;
    }
    return url;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !videoUrl.trim()) return;

    const courseId = 'course-custom-' + Date.now();
    const moduleId = 'mod-custom-' + Date.now();
    const lessonId = 'les-custom-' + Date.now();
    const embedUrl = convertToEmbedUrl(videoUrl);

    const newLesson: Lesson = {
      id: lessonId,
      courseId,
      moduleId,
      title: lessonTitle || title,
      titleBn: lessonTitle || title,
      duration: '25:00',
      durationSec: 1500,
      videoUrl: embedUrl,
      videoType: 'youtube',
      description: description,
      descriptionBn: description,
      summaryPoints: [
        'Custom imported educational lesson',
        'Interactive timetagged note taking available',
        'Mark complete to track learning progress'
      ],
      summaryPointsBn: [
        'কাস্টম যুক্ত করা শিক্ষণীয় ভিডিও লেসন',
        'টাইমট্যাগ সহ নোট লেখার সুবিধা',
        'প্রগ্রেস ট্র্যাকিং সুবিধা'
      ],
      timestamps: [
        { time: 0, label: 'Start of Lecture' },
        { time: 300, label: 'Key Concepts & Demonstration' }
      ],
      resources: [
        { id: 'res-custom-1', title: 'Course Reference Link', type: 'link', url: videoUrl }
      ],
      isFreePreview: true
    };

    const newModule: Module = {
      id: moduleId,
      title: 'Module 1: Main Lecture Series',
      titleBn: 'মডিউল ১: প্রধান ভিডিও লেকচার সিরিজ',
      order: 1,
      lessons: [newLesson]
    };

    const newCourse: Course = {
      id: courseId,
      title: title,
      titleBn: title,
      subtitle: 'Custom video series added by student',
      subtitleBn: 'শিক্ষার্থী কর্তৃক যুক্ত করা কাস্টম ভিডিও কোর্স',
      description: description,
      descriptionBn: description,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
      category: category,
      categoryName: category === 'web-dev' ? 'Web Development' : 'Self Learning',
      categoryNameBn: category === 'web-dev' ? 'ওয়েব ডেভেলপমেন্ট' : 'সেলফ লার্নিং',
      level: 'All Levels',
      levelBn: 'সকলের জন্য',
      totalDuration: '1.5 hours',
      totalLessons: 1,
      rating: 5.0,
      reviewsCount: 1,
      badge: 'Custom',
      badgeBn: 'কাস্টম',
      certificateAvailable: true,
      createdAt: new Date().toISOString(),
      isCustomCourse: true,
      instructor: {
        id: 'inst-custom',
        name: user?.name || 'Custom Instructor',
        title: 'Video Lecturer',
        titleBn: 'ভিডিও ইন্সট্রাক্টর',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
        bio: 'Custom course uploaded to active courses list.',
        bioBn: 'সক্রিয় কোর্স তালিকায় যুক্ত করা কাস্টম ভিডিও।',
        coursesCount: 1,
        studentsCount: 1,
        rating: 5.0
      },
      tags: ['Custom', 'Video', 'Learning'],
      modules: [newModule]
    };

    addNewCustomCourse(newCourse);
    setIsAddCourseModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAddCourseModalOpen(false)}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
            <PlusCircle className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'bn' ? 'কাস্টম ভিডিও বা কোর্স যোগ করুন' : 'Import Video into Active Courses'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'bn' ? 'যেকোনো ইউটিউব বা ভিডিও লিংক আপনার সক্রিয় কোর্সে যুক্ত করুন' : 'Embed any video to study with notes & tracking'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'bn' ? 'কোর্সের নাম / শিরোনাম' : 'Course Title'}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Next.js 15 Full Tutorial in Bengali"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'bn' ? 'ভিডিও লিংক (YouTube / MP4 Embed)' : 'Video URL (YouTube or Embed)'}
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="url"
                required
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'ক্যাটেগরি' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              >
                <option value="web-dev">Web Development</option>
                <option value="marketing">Digital Marketing</option>
                <option value="design">UI/UX Design</option>
                <option value="python">Python & AI</option>
                <option value="video">Video Editing</option>
                <option value="freelancing">Freelancing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'প্রথম লেসনের নাম' : 'First Lesson Title'}
              </label>
              <input
                type="text"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="Lesson 1..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'bn' ? 'সংক্ষিপ্ত বিবরণ' : 'Description'}
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-colors"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>{language === 'bn' ? 'সক্রিয় কোর্সে যোগ করুন ও দেখুন' : 'Add to Active Courses & Play'}</span>
          </button>
        </form>

      </div>
    </div>
  );
};

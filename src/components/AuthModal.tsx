import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User as UserIcon, Eye, EyeOff, CheckCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    login,
    quickLoginDemo,
    language
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('mdnasirhassan3@gmail.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Md Nasir Hassan');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(language === 'bn' ? 'দয়া করে ইমেইল ও পাসওয়ার্ড প্রদান করুন' : 'Please provide email and password');
      return;
    }
    if (password.length < 4) {
      setError(language === 'bn' ? 'পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে' : 'Password must be at least 4 characters');
      return;
    }

    setError('');
    setSuccess(true);
    setTimeout(() => {
      login(email, mode === 'register' ? name : undefined);
      setSuccess(false);
    }, 600);
  };

  const handleQuickLoginNasir = () => {
    quickLoginDemo('nasir');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {mode === 'login'
              ? (language === 'bn' ? 'লার্নটুডে অ্যাকাউন্টে লগইন' : 'Sign in to LearnToday')
              : (language === 'bn' ? 'নতুন শিক্ষার্থী অ্যাকাউন্ট তৈরি' : 'Create Student Account')}
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {language === 'bn'
              ? 'আপনার সক্রিয় কোর্স এবং ভিডিও ক্লাসরুম এক্সেস করতে লগইন করুন'
              : 'Access your active courses, classroom videos & progress'}
          </p>
        </div>

        {/* Quick Demo Login Option */}
        <div className="mb-6 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/70 to-blue-50/70 p-3.5 dark:border-indigo-950/80 dark:from-indigo-950/40 dark:to-blue-950/30">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 dark:text-indigo-200">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              {language === 'bn' ? '১-ক্লিক ডেমো লগইন (নাসির হাসান)' : '1-Click Direct Login (Nasir)'}
            </span>
            <span className="rounded bg-indigo-200/80 px-1.5 py-0.2 text-[10px] font-extrabold text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
              ACTIVE
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 mb-2.5">
            {language === 'bn' 
              ? 'সরাসরি ৩টি সক্রিয় কোর্স, ভিডিও লেসন এবং সার্টিফিকেট এক্সেস করতে নিচের বাটনে ক্লিক করুন।'
              : 'Instantly access 3 active enrolled courses, video lectures & notes.'}
          </p>
          <button
            type="button"
            onClick={handleQuickLoginNasir}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-98"
          >
            <span>{language === 'bn' ? 'নাসির হাসান হিসেবে প্রবেশ করুন' : 'Continue as Md Nasir Hassan'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
          </div>
          <span className="relative bg-white px-3 text-xs font-medium text-slate-400 dark:bg-slate-900">
            {language === 'bn' ? 'অথবা ইমেইল পাসওয়ার্ড দিয়ে' : 'or enter credentials'}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {error && (
            <div className="rounded-xl bg-rose-50 p-2.5 text-xs font-semibold text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name'}
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Md Nasir Hassan"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-10 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={success}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700"
          >
            {success ? (
              <>
                <CheckCircle className="h-4 w-4 text-emerald-400 animate-spin" />
                <span>{language === 'bn' ? 'লগইন হচ্ছে...' : 'Signing in...'}</span>
              </>
            ) : (
              <span>{mode === 'login' ? (language === 'bn' ? 'লগইন করুন' : 'Sign In') : (language === 'bn' ? 'অ্যাকাউন্ট তৈরি করুন' : 'Register')}</span>
            )}
          </button>
        </form>

        {/* Switch mode */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            {mode === 'login'
              ? (language === 'bn' ? 'নতুন শিক্ষার্থী? রেজিস্ট্রেশন করুন' : "Don't have an account? Register")
              : (language === 'bn' ? 'পূর্বের অ্যাকাউন্ট আছে? লগইন করুন' : 'Already have an account? Sign in')}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>{language === 'bn' ? 'সম্পূর্ণ নিরাপদ ও এনক্রিপ্টেড লার্নিং সেশন' : 'Secure and verified learning session'}</span>
        </div>
      </div>
    </div>
  );
};

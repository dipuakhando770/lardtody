import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Award, Download, CheckCircle, ShieldCheck, Printer, Share2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CertificateModal: React.FC = () => {
  const {
    user,
    language,
    isCertificateModalOpen,
    setIsCertificateModalOpen,
    certificateCourse,
    getCourseProgress
  } = useApp();

  useEffect(() => {
    if (isCertificateModalOpen) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {
        // ignore
      }
    }
  }, [isCertificateModalOpen]);

  if (!isCertificateModalOpen || !certificateCourse) return null;

  const certificateId = `LT-CERT-${certificateCourse.id.slice(7).toUpperCase()}-${user?.id.slice(-4) || '2026'}`;
  const currentDate = new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl text-slate-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsCertificateModalOpen(false)}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pr-10 mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                {language === 'bn' ? 'কোর্স কমপ্লিশন সার্টিফিকেট' : 'Official Verified Certificate'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'bn' ? 'লার্নটুডে ই-লার্নিং ভেরিফায়েড ক্রেডেনশিয়াল' : 'LearnToday Verified Digital Credential'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>{language === 'bn' ? 'প্রিন্ট / সেভ' : 'Print / Save'}</span>
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div id="certificate-print-area" className="relative overflow-hidden rounded-2xl border-4 border-double border-amber-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/80 p-8 text-center shadow-inner">
          
          {/* Decorative Corner Borders */}
          <div className="absolute top-2 left-2 h-8 w-8 border-t-2 border-l-2 border-amber-400/70" />
          <div className="absolute top-2 right-2 h-8 w-8 border-t-2 border-r-2 border-amber-400/70" />
          <div className="absolute bottom-2 left-2 h-8 w-8 border-b-2 border-l-2 border-amber-400/70" />
          <div className="absolute bottom-2 right-2 h-8 w-8 border-b-2 border-r-2 border-amber-400/70" />

          {/* Watermark Logo */}
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 font-black text-2xl shadow-lg shadow-amber-500/20">
            LT
          </div>

          <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 block mb-1">
            LEARNTODAY ACADEMY & VERIFIED PORTAL
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-white tracking-wide uppercase">
            CERTIFICATE OF COMPLETION
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'bn' ? 'এই মর্মে প্রত্যায়ন করা যাচ্ছে যে' : 'This is proudly presented to'}
          </p>

          {/* Recipient Student Name */}
          <div className="my-5 border-b border-indigo-500/30 pb-2 max-w-md mx-auto">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300">
              {user?.name || 'Md Nasir Hassan'}
            </h1>
          </div>

          <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
            {language === 'bn' 
              ? `সফলভাবে এবং দক্ষতার সাথে "${certificateCourse.titleBn}" কোর্সের সকল মডিউল, ভিডিও লেসন এবং কুইজ মূল্যায়ন সম্পন্ন করেছেন।`
              : `has successfully mastered all practical modules, hands-on assignments, and curriculum requirements for "${certificateCourse.title}".`}
          </p>

          {/* Course Details & Signature */}
          <div className="mt-8 grid grid-cols-3 gap-4 items-end pt-4 border-t border-slate-800 text-left">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">
                {language === 'bn' ? 'ইস্যুর তারিখ' : 'Date of Issue'}
              </p>
              <p className="text-xs font-bold text-slate-200">{currentDate}</p>
            </div>

            <div className="text-center">
              <div className="inline-flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-[9px] font-mono text-amber-300 mt-1">{certificateId}</span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs font-serif font-bold text-amber-200 italic">
                {certificateCourse.instructor.name}
              </p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">
                {language === 'bn' ? 'কোর্স ইনস্ট্রাক্টর' : 'Lead Instructor'}
              </p>
            </div>
          </div>

        </div>

        {/* Footer Notes */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span>{language === 'bn' ? 'অনলাইন ভেরিফিকেশন লিংক সক্রিয়' : 'Verified digital credential'}</span>
          </span>
          <button
            onClick={() => setIsCertificateModalOpen(false)}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
          >
            {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};

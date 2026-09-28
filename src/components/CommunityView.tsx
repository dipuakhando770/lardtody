import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Send, ThumbsUp, User } from 'lucide-react';

export const CommunityView: React.FC = () => {
  const { user, language } = useApp();
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 'post-1',
      name: 'Md Nasir (You)',
      avatar: user.avatar,
      time: 'Just now',
      text: 'Starting the eBook Business with AI module! The prompt formulas in Lesson 1 are very clear.',
      likes: 12
    },
    {
      id: 'post-2',
      name: 'Tanvir Hossain',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      time: '2 hours ago',
      text: 'Welcome everyone to the Digital Product Business Combo Pack! Let us know your niche selections in the thread below.',
      likes: 34
    }
  ]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setPosts([
      {
        id: 'post-' + Date.now(),
        name: user.name + ' (You)',
        avatar: user.avatar,
        time: 'Just now',
        text: newPost.trim(),
        likes: 1
      },
      ...posts
    ]);
    setNewPost('');
  };

  return (
    <div className="flex-1 bg-white min-h-screen dark:bg-slate-950 p-6 sm:p-10 space-y-6">
      <div className="border-b border-slate-200 pb-4 dark:border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-emerald-500" />
          <span>VIP Student Community</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {language === 'bn' ? 'লার্নিকো ও লার্নটুডে শিক্ষার্থীদের ফোরাম ও আলোচনা গ্রুপ।' : 'Connect with peer learners and mentors.'}
        </p>
      </div>

      <form onSubmit={handleCreatePost} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900">
        <textarea
          rows={2}
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder={language === 'bn' ? 'কমিউনিটিতে একটি পোস্ট লিখুন...' : 'Share your progress or ask a question in the community...'}
          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{language === 'bn' ? 'পোস্ট করুন' : 'Post to Community'}</span>
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {posts.map((p) => (
          <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <img src={p.avatar} alt={p.name} className="h-8 w-8 rounded-full object-cover" />
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">{p.name}</p>
                <p className="text-[10px] text-slate-500">{p.time}</p>
              </div>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{p.text}</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold pt-2 border-t border-slate-100 dark:border-slate-800">
              <ThumbsUp className="h-3.5 w-3.5 text-indigo-600" />
              <span>{p.likes} Likes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

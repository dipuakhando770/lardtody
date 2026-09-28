/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { ActiveCoursesView } from './components/ActiveCoursesView';
import { CoursePlayerView } from './components/CoursePlayerView';
import { CourseCatalogView } from './components/CourseCatalogView';
import { BookmarksView } from './components/BookmarksView';
import { WebinarsView } from './components/WebinarsView';
import { MembershipView } from './components/MembershipView';
import { AiAvatarView } from './components/AiAvatarView';
import { CommunityView } from './components/CommunityView';
import { AddCourseModal } from './components/AddCourseModal';
import { CertificateModal } from './components/CertificateModal';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Left Permanent Sidebar matching Screenshot */}
      <Sidebar />

      {/* Main Content Router */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {currentView === 'activeCourses' && <ActiveCoursesView />}
        {currentView === 'player' && <CoursePlayerView />}
        {currentView === 'catalog' && <CourseCatalogView />}
        {currentView === 'store' && <CourseCatalogView />}
        {currentView === 'webinars' && <WebinarsView />}
        {currentView === 'membership' && <MembershipView />}
        {currentView === 'avatar' && <AiAvatarView />}
        {currentView === 'bookmarks' && <BookmarksView />}
        {currentView === 'community' && <CommunityView />}
      </div>

      {/* Embedded Modals (All render inside the same window) */}
      <AddCourseModal />
      <CertificateModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

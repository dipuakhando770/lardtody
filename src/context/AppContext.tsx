import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, User, LessonNote, DiscussionPost, QuizResult, Lesson } from '../types';
import { INITIAL_COURSES, INITIAL_DISCUSSIONS } from '../data/coursesData';

export type AppView = 'activeCourses' | 'player' | 'webinars' | 'membership' | 'avatar' | 'bookmarks' | 'community' | 'store' | 'catalog' | 'certificates';

interface AppContextType {
  user: User;
  isAuthenticated: boolean;
  language: 'bn' | 'en';
  theme: 'light' | 'dark';
  courses: Course[];
  activeCourse: Course;
  activeLesson: Lesson;
  currentView: AppView;
  notes: LessonNote[];
  discussions: DiscussionPost[];
  quizResults: Record<string, QuizResult>;
  searchQuery: string;
  isAuthModalOpen: boolean;
  isAddCourseModalOpen: boolean;
  isCertificateModalOpen: boolean;
  certificateCourse: Course | null;
  sidebarCollapsed: boolean;
  
  // Actions
  setLanguage: (lang: 'bn' | 'en') => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setCurrentView: (view: AppView) => void;
  setSearchQuery: (q: string) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsAddCourseModalOpen: (open: boolean) => void;
  setIsCertificateModalOpen: (open: boolean) => void;
  setCertificateCourse: (course: Course | null) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  login: (email: string, name?: string) => void;
  quickLoginDemo: (userType?: 'nasir' | 'demo') => void;
  logout: () => void;
  
  openCoursePlayer: (courseId: string, lessonId?: string) => void;
  selectLesson: (lessonId: string) => void;
  enrollCourse: (courseId: string) => void;
  toggleCompleteLesson: (lessonId: string, courseId: string) => void;
  toggleBookmark: (lessonId: string) => void;
  
  addNote: (courseId: string, lessonId: string, timestampSec: number, content: string) => void;
  deleteNote: (noteId: string) => void;
  
  addDiscussionPost: (courseId: string, lessonId: string, title: string, text: string) => void;
  addDiscussionReply: (postId: string, text: string) => void;
  
  submitQuiz: (quizId: string, courseId: string, scorePercent: number, passed: boolean) => void;
  addNewCustomCourse: (newCourse: Course) => void;
  
  // Helper calculations
  getCourseProgress: (courseId: string) => number;
  isLessonCompleted: (lessonId: string) => boolean;
  isLessonBookmarked: (lessonId: string) => boolean;
  getTotalEnrolledCourses: () => Course[];
  getAllCompletedCourses: () => Course[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Permanent auto-login default student user (Md Nasir)
const PERMANENT_USER: User = {
  id: 'user-nasir-main',
  name: 'Md Nasir',
  email: 'mdnasirhassan3@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
  role: 'student',
  enrolledCourseIds: ['course-ebook-ai', 'course-start-here', 'course-learntoday-active', 'course-react-fullstack'],
  completedLessonIds: ['les-eb-1'],
  studyStreakDays: 14,
  totalMinutesLearned: 480,
  joinDate: 'Lifetime Student',
  bookmarkedLessonIds: ['les-eb-1', 'les-sh-1']
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(PERMANENT_USER);
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [currentView, setCurrentView] = useState<AppView>('activeCourses');
  const [activeCourseId, setActiveCourseId] = useState<string>('course-ebook-ai');
  const [activeLessonId, setActiveLessonId] = useState<string>('les-eb-1');
  const [searchQuery, setSearchQuery] = useState('');

  const [notes, setNotes] = useState<LessonNote[]>([
    {
      id: 'note-1',
      userId: 'user-nasir-main',
      courseId: 'course-ebook-ai',
      lessonId: 'les-eb-1',
      timestampSec: 320,
      content: 'Important: Focus on high-intent problem solving niches for eBook sales.',
      createdAt: 'Today'
    }
  ]);

  const [discussions, setDiscussions] = useState<DiscussionPost[]>(INITIAL_DISCUSSIONS);
  const [quizResults, setQuizResults] = useState<Record<string, QuizResult>>({});

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [certificateCourse, setCertificateCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const login = (email: string, name?: string) => {
    setUser({
      id: 'user-nasir-main',
      name: name || 'Md Nasir',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      role: 'student',
      enrolledCourseIds: ['course-ebook-ai', 'course-start-here', 'course-learntoday-active', 'course-react-fullstack'],
      completedLessonIds: ['les-eb-1'],
      studyStreakDays: 14,
      totalMinutesLearned: 480,
      joinDate: 'Lifetime Student',
      bookmarkedLessonIds: ['les-eb-1', 'les-sh-1']
    });
    setIsAuthModalOpen(false);
  };

  const quickLoginDemo = () => {
    setUser(PERMANENT_USER);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    // Keeps user logged in as requested
    setUser(PERMANENT_USER);
  };

  const enrollCourse = (courseId: string) => {
    if (!user.enrolledCourseIds.includes(courseId)) {
      setUser(prev => ({
        ...prev,
        enrolledCourseIds: [...prev.enrolledCourseIds, courseId]
      }));
    }
    openCoursePlayer(courseId);
  };

  const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0];
  const activeLesson = React.useMemo(() => {
    for (const mod of activeCourse.modules) {
      const match = mod.lessons.find(l => l.id === activeLessonId);
      if (match) return match;
    }
    return activeCourse.modules[0]?.lessons[0] || {
      id: 'les-default',
      courseId: activeCourse.id,
      moduleId: 'mod-default',
      title: 'Active Lecture',
      titleBn: 'সক্রিয় লেকচার',
      duration: '15:00',
      durationSec: 900,
      videoUrl: 'https://www.youtube-nocookie.com/embed/SqcY0GlETPk',
      videoType: 'youtube' as const,
      description: 'Active classroom lesson.',
      descriptionBn: 'সক্রিয় ক্লাসরুম লেসন।',
      summaryPoints: [],
      summaryPointsBn: [],
      resources: [],
      timestamps: []
    };
  }, [activeCourse, activeLessonId]);

  const openCoursePlayer = (courseId: string, lessonId?: string) => {
    setActiveCourseId(courseId);
    if (lessonId) {
      setActiveLessonId(lessonId);
    } else {
      const targetCourse = courses.find(c => c.id === courseId);
      const firstLesson = targetCourse?.modules[0]?.lessons[0]?.id || 'les-eb-1';
      setActiveLessonId(firstLesson);
    }
    setCurrentView('player');
  };

  const selectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
  };

  const toggleCompleteLesson = (lessonId: string, courseId: string) => {
    const isDone = user.completedLessonIds.includes(lessonId);
    const updatedCompleted = isDone
      ? user.completedLessonIds.filter(id => id !== lessonId)
      : [...user.completedLessonIds, lessonId];
    
    setUser({
      ...user,
      completedLessonIds: updatedCompleted,
      totalMinutesLearned: user.totalMinutesLearned + (isDone ? -15 : 20)
    });
  };

  const toggleBookmark = (lessonId: string) => {
    const isBookmarked = user.bookmarkedLessonIds.includes(lessonId);
    setUser({
      ...user,
      bookmarkedLessonIds: isBookmarked
        ? user.bookmarkedLessonIds.filter(id => id !== lessonId)
        : [...user.bookmarkedLessonIds, lessonId]
    });
  };

  const addNote = (courseId: string, lessonId: string, timestampSec: number, content: string) => {
    if (!content.trim()) return;
    const newNote: LessonNote = {
      id: 'note-' + Date.now(),
      userId: user.id,
      courseId,
      lessonId,
      timestampSec,
      content: content.trim(),
      createdAt: 'Just now'
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
  };

  const addDiscussionPost = (courseId: string, lessonId: string, title: string, text: string) => {
    if (!text.trim()) return;
    const newPost: DiscussionPost = {
      id: 'disc-' + Date.now(),
      courseId,
      lessonId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      title: title || 'Question on this lesson',
      text: text.trim(),
      createdAt: 'Just now',
      likes: 0,
      replies: []
    };
    setDiscussions(prev => [newPost, ...prev]);
  };

  const addDiscussionReply = (postId: string, text: string) => {
    if (!text.trim()) return;
    setDiscussions(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [
            ...p.replies,
            {
              id: 'rep-' + Date.now(),
              userId: user.id,
              userName: user.name,
              userAvatar: user.avatar,
              text: text.trim(),
              createdAt: 'Just now'
            }
          ]
        };
      }
      return p;
    }));
  };

  const submitQuiz = (quizId: string, courseId: string, scorePercent: number, passed: boolean) => {
    setQuizResults(prev => ({
      ...prev,
      [quizId]: {
        quizId,
        courseId,
        userId: user.id,
        scorePercent,
        passed,
        attemptedAt: 'Just now'
      }
    }));
  };

  const addNewCustomCourse = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev]);
    setUser(prev => ({
      ...prev,
      enrolledCourseIds: [...prev.enrolledCourseIds, newCourse.id]
    }));
    openCoursePlayer(newCourse.id);
  };

  const isLessonCompleted = (lessonId: string) => {
    return user.completedLessonIds.includes(lessonId);
  };

  const isLessonBookmarked = (lessonId: string) => {
    return user.bookmarkedLessonIds.includes(lessonId);
  };

  const getCourseProgress = (courseId: string): number => {
    if (courseId === 'course-ebook-ai') return 10;
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    
    let totalLessons = 0;
    let completedCount = 0;
    
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        totalLessons++;
        if (user.completedLessonIds.includes(lesson.id)) {
          completedCount++;
        }
      }
    }
    if (totalLessons === 0) return 0;
    return Math.min(100, Math.round((completedCount / totalLessons) * 100));
  };

  const getTotalEnrolledCourses = (): Course[] => {
    return courses.filter(c => user.enrolledCourseIds.includes(c.id));
  };

  const getAllCompletedCourses = (): Course[] => {
    return getTotalEnrolledCourses().filter(c => getCourseProgress(c.id) === 100);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: true,
        language,
        theme,
        courses,
        activeCourse,
        activeLesson,
        currentView,
        notes,
        discussions,
        quizResults,
        searchQuery,
        isAuthModalOpen,
        isAddCourseModalOpen,
        isCertificateModalOpen,
        certificateCourse,
        sidebarCollapsed,
        
        setLanguage,
        setTheme,
        setCurrentView,
        setSearchQuery,
        setIsAuthModalOpen,
        setIsAddCourseModalOpen,
        setIsCertificateModalOpen,
        setCertificateCourse,
        setSidebarCollapsed,
        
        login,
        quickLoginDemo,
        logout,
        
        openCoursePlayer,
        selectLesson,
        enrollCourse,
        toggleCompleteLesson,
        toggleBookmark,
        
        addNote,
        deleteNote,
        
        addDiscussionPost,
        addDiscussionReply,
        
        submitQuiz,
        addNewCustomCourse,
        
        getCourseProgress,
        isLessonCompleted,
        isLessonBookmarked,
        getTotalEnrolledCourses,
        getAllCompletedCourses
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

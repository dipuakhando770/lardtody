export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'instructor' | 'admin';
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  studyStreakDays: number;
  totalMinutesLearned: number;
  joinDate: string;
  bookmarkedLessonIds: string[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'code' | 'link' | 'zip';
  url: string;
  size?: string;
}

export interface TimestampBookmark {
  time: number; // in seconds
  label: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  titleBn: string;
  duration: string; // e.g. "14:20"
  durationSec: number;
  videoUrl: string;
  videoType: 'youtube' | 'mp4' | 'embed';
  description: string;
  descriptionBn: string;
  summaryPoints: string[];
  summaryPointsBn: string[];
  resources: Resource[];
  timestamps: TimestampBookmark[];
  isFreePreview?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionBn: string;
  options: string[];
  optionsBn: string[];
  correctIndex: number;
  explanation: string;
  explanationBn: string;
}

export interface Quiz {
  id: string;
  title: string;
  titleBn: string;
  passingScore: number; // percentage, e.g. 70
  questions: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  titleBn: string;
  order: number;
  lessons: Lesson[];
  quiz?: Quiz;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  titleBn: string;
  avatar: string;
  bio: string;
  bioBn: string;
  coursesCount: number;
  studentsCount: number;
  rating: number;
}

export interface Course {
  id: string;
  title: string;
  titleBn: string;
  subtitle: string;
  subtitleBn: string;
  description: string;
  descriptionBn: string;
  thumbnail: string;
  coverImage?: string;
  category: 'web-dev' | 'design' | 'marketing' | 'python' | 'video' | 'freelancing';
  categoryName: string;
  categoryNameBn: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  levelBn: string;
  totalDuration: string;
  totalLessons: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeBn?: string;
  instructor: Instructor;
  modules: Module[];
  tags: string[];
  certificateAvailable: boolean;
  createdAt: string;
  isCustomCourse?: boolean;
}

export interface LessonNote {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  timestampSec: number;
  content: string;
  createdAt: string;
}

export interface DiscussionReply {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: string;
  isInstructor?: boolean;
}

export interface DiscussionPost {
  id: string;
  courseId: string;
  lessonId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  title: string;
  text: string;
  createdAt: string;
  likes: number;
  replies: DiscussionReply[];
}

export interface QuizResult {
  quizId: string;
  courseId: string;
  userId: string;
  scorePercent: number;
  passed: boolean;
  attemptedAt: string;
}

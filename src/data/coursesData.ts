import { Course, DiscussionPost } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-ebook-ai',
    title: 'Learning Bangladesh - eBook Business with AI: Write, Design & Sell',
    titleBn: 'লার্নিং বাংলাদেশ - eBook Business with AI: Write, Design & Sell',
    subtitle: 'Step-by-step masterclass on writing, designing and selling high-converting eBooks using ChatGPT and modern AI tools.',
    subtitleBn: 'চ্যাটজিপিটি ও আধুনিক এআই দিয়ে প্রফেশনাল ই-বুক লেখা, কভার ডিজাইন এবং আন্তর্জাতিক ও লোকাল মার্কেটে সেল করার পূর্ণাঙ্গ গাইড।',
    description: 'Learn how to generate bestselling non-fiction and technical eBook ideas, outline chapters with AI, design stunning layouts in Canva/Figma, and set up automated sales funnels.',
    descriptionBn: 'সম্পূর্ণ এআই অ্যাসিস্ট্যান্টের মাধ্যমে আকর্ষণীয় ই-বুক তৈরি, সোশ্যাল মিডিয়া মার্কেটিং ফানেল এবং অটোমেটেড পেমেন্ট গেটওয়ে দিয়ে বিক্রি করার কমপ্লিট স্ট্র্যাটেজি।',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop',
    category: 'marketing',
    categoryName: 'Digital Product Business Combo Pack',
    categoryNameBn: 'ডিজিটাল প্রোডাক্ট বিজনেস কম্বো প্যাক',
    level: 'All Levels',
    levelBn: 'সকলের জন্য',
    totalDuration: '18 hours',
    totalLessons: 8,
    rating: 4.95,
    reviewsCount: 1420,
    badge: '10% Completed',
    badgeBn: '১০% সম্পন্ন',
    certificateAvailable: true,
    createdAt: '2026-02-15',
    instructor: {
      id: 'inst-learniico-1',
      name: 'Learniico Mentor Team',
      title: 'Digital Business & AI Specialists',
      titleBn: 'ডিজিটাল বিজনেস ও এআই ট্রেইনার',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      bio: 'Instructors for Digital Product Business Combo Pack at Learniico / LearnToday.',
      bioBn: 'লার্নিকো ও লার্নটুডে প্ল্যাটফর্মের অভিজ্ঞ প্রশিক্ষক টিম।',
      coursesCount: 12,
      studentsCount: 35000,
      rating: 4.95,
    },
    tags: ['eBook', 'AI Business', 'ChatGPT', 'Passive Income', 'Learniico'],
    modules: [
      {
        id: 'mod-eb-1',
        title: 'Module 1: eBook Business Blueprint & Niche Research',
        titleBn: 'মডিউল ১: ই-বুক বিজনেস ব্লুপ্রিন্ট ও নিশ রিসার্চ',
        order: 1,
        lessons: [
          {
            id: 'les-eb-1',
            courseId: 'course-ebook-ai',
            moduleId: 'mod-eb-1',
            title: '1. Welcome to eBook Business with AI & Mindset',
            titleBn: '১. ই-বুক বিজনেসে স্বাগতম ও প্রফিটেবল নিশ সিলেকশন',
            duration: '18:40',
            durationSec: 1120,
            videoUrl: 'https://www.youtube-nocookie.com/embed/SqcY0GlETPk',
            videoType: 'youtube',
            description: 'Understanding digital product economics, researching high-demand topics, and using ChatGPT for market validation.',
            descriptionBn: 'ডিজিটাল প্রোডাক্ট ইকোনমিক্স, ডিমান্ড রিসার্চ এবং চ্যাটজিপিটি প্রম্পট দিয়ে প্রফিটেবল টপিক বাছাই।',
            summaryPoints: [
              'Finding high-ticket pain points people pay for',
              'AI prompt chaining for outline generation',
              'Legal & copyright considerations for AI books'
            ],
            summaryPointsBn: [
              'জনপ্রিয় ও বেশি বিক্রিত টপিক নির্বাচন',
              'চ্যাটজিপিটি দিয়ে সম্পূর্ণ বইয়ের সূচিপত্র ও ড্রাফট তৈরি',
              'কপিরাইট ও কোয়ালিটি নিয়ন্ত্রণ'
            ],
            timestamps: [
              { time: 0, label: 'Overview & Income Proof' },
              { time: 320, label: 'Niche Analysis with AI' },
              { time: 740, label: 'Drafting Table of Contents' }
            ],
            resources: [
              { id: 'res-eb-1', title: '50+ High Demand eBook Niches (PDF)', type: 'pdf', url: '#', size: '1.8 MB' },
              { id: 'res-eb-2', title: 'Master ChatGPT Prompts for Authors', type: 'code', url: '#', size: '24 KB' }
            ],
            isFreePreview: true
          },
          {
            id: 'les-eb-2',
            courseId: 'course-ebook-ai',
            moduleId: 'mod-eb-1',
            title: '2. Formatting, 3D Mockup Cover Design & Sales Page',
            titleBn: '২. ক্যানভা/ফিগমায় ৩ডি মকআপ কভার তৈরি ও সেলস ফানেল',
            duration: '24:15',
            durationSec: 1455,
            videoUrl: 'https://www.youtube-nocookie.com/embed/NCwa_xi0Uuc',
            videoType: 'youtube',
            description: 'Designing eye-catching 3D book covers, formatting PDFs for mobile reading, and setting up instant delivery.',
            descriptionBn: 'থ্রি-ডি মকআপ কভার ডিজাইন, মোবাইল ফ্রেন্ডলি পিডিএফ ফরম্যাটিং এবং অটোমেটেড ডেলিভারি সিস্টেম।',
            summaryPoints: [
              'Canva & Figma 3D mockup generator tricks',
              'High converting landing page copy formulas',
              'Setting up bKash/Nagad and international payment links'
            ],
            summaryPointsBn: [
              'ক্যানভায় প্রফেশনাল থ্রি-ডি কভার ডিজাইন',
              'হাই-কনভার্টিং সেলস পেজ ও কপিরাইটিং',
              'পেমেন্ট নেওয়ার পর অটোমেটেড ইমেইল ও পিডিএফ ডাউনলোড'
            ],
            timestamps: [
              { time: 0, label: 'Cover Design Principles' },
              { time: 480, label: '3D Mockup Generation' },
              { time: 920, label: 'Landing Page Setup' }
            ],
            resources: [
              { id: 'res-eb-3', title: 'eBook Landing Page Template (ZIP)', type: 'zip', url: '#', size: '4.5 MB' }
            ]
          },
          {
            id: 'les-eb-3',
            courseId: 'course-ebook-ai',
            moduleId: 'mod-eb-1',
            title: '3. Automated Sales Funnels & Facebook Ad Targeting',
            titleBn: '৩. অটোমেটেড সেলস ফানেল ও ফেসবুক অ্যাডস স্ট্র্যাটেজি',
            duration: '28:10',
            durationSec: 1690,
            videoUrl: 'https://www.youtube-nocookie.com/embed/5a22V5rDpnk',
            videoType: 'youtube',
            description: 'Setting up high ROAS Facebook campaigns for eBook sales with lowest cost per acquisition.',
            descriptionBn: 'কম খরচে ফেসবুক অ্যাডস রান করে প্রতিদিন ৫০+ ই-বুক সেল করার প্রমাণিত সিক্রেট পদ্ধতি।',
            summaryPoints: [
              'Pixel tracking & custom conversion events',
              'Retargeting website visitors with discounts',
              'Scaling profitable ad sets systematically'
            ],
            summaryPointsBn: [
              'পিক্সেল সেটআপ ও কনভার্শন ট্র্যাকিং',
              'রিটার্গেটিং অ্যাড ক্যাম্পেইন তৈরি',
              'প্রফিটেবল অ্যাড স্কেল করার নিয়ম'
            ],
            timestamps: [
              { time: 0, label: 'Ad Setup Overview' },
              { time: 420, label: 'Creative & Video Ads' },
              { time: 890, label: 'Audience Targeting' }
            ],
            resources: [
              { id: 'res-eb-4', title: 'Facebook Ad Copy Swipe File (PDF)', type: 'pdf', url: '#', size: '1.2 MB' }
            ]
          }
        ],
        quiz: {
          id: 'quiz-eb-1',
          title: 'eBook Business Assessment',
          titleBn: 'ই-বুক বিজনেস কুইজ পরীক্ষা',
          passingScore: 70,
          questions: [
            {
              id: 'q-eb-1',
              question: 'What is the most effective element to make a digital eBook look high-value?',
              questionBn: 'একটি ডিজিটাল ই-বুককে প্রফেশনাল ও আকর্ষণীয় দেখানোর সবচেয়ে কার্যকরী উপাদান কোনটি?',
              options: ['Plain text file', 'A photorealistic 3D book mockup and clear benefit-driven title', 'Adding 1000 pages of filler', 'Using no cover image'],
              optionsBn: ['সাধারণ টেক্সট ফাইল', 'একটি চমৎকার ৩ডি বুক মকআপ এবং আকর্ষণীয় টাইটেল', 'অপ্রয়োজনীয় ১০০০ পেজ যুক্ত করা', 'কভার ছবি ছাড়া রাখা'],
              correctIndex: 1,
              explanation: 'A high quality 3D mockup visually turns a digital file into a tangible product in the customer mindset.',
              explanationBn: 'থ্রি-ডি মকআপ কভার ডিজিটাল পণ্যকে কাস্টমারের কাছে মূল্যবান ও বাস্তবসম্মত পণ্যের অনুভূতি দেয়।'
            }
          ]
        }
      },
      {
        id: 'mod-eb-2',
        title: 'Module 2: Advanced Monetization & Digital Bundles',
        titleBn: 'মডিউল ২: অ্যাডভান্সড মনেটাইজেশন ও বান্ডেল অফার',
        order: 2,
        lessons: [
          {
            id: 'les-eb-4',
            courseId: 'course-ebook-ai',
            moduleId: 'mod-eb-2',
            title: '4. Creating Upsells, Order Bumps & 5x Revenue',
            titleBn: '৪. অর্ডার বাম্প ও আপসেল দিয়ে ৫ গুণ বেশি প্রফিট তৈরির উপায়',
            duration: '21:50',
            durationSec: 1310,
            videoUrl: 'https://www.youtube-nocookie.com/embed/SqcY0GlETPk',
            videoType: 'youtube',
            description: 'Maximize average order value by bundling audiobooks, templates, and video walkthroughs with your core eBook.',
            descriptionBn: 'মূল ই-বুকের সাথে অডিওবুক, টেমপ্লেট ও রিসোর্স যুক্ত করে প্রতি অর্ডারে সর্বোচ্চ রেভিনিউ পাওয়ার কৌশল।',
            summaryPoints: [
              'Setting up 1-click upsells on checkout',
              'Pricing psychology and urgency triggers',
              'Automated email sequence for abandoned checkouts'
            ],
            summaryPointsBn: [
              'চেকআউটে ১-ক্লিক আপসেল সেটআপ',
              'প্রাইসিং সাইকোলজি ও অফার বান্ডেল',
              'অটোমেটেড ইমেইল ও এসএমএস রিমাইন্ডার'
            ],
            timestamps: [
              { time: 0, label: 'Order Bump Secrets' },
              { time: 510, label: 'Creating High Value Upsells' },
              { time: 1020, label: 'Email Followup Automation' }
            ],
            resources: [
              { id: 'res-eb-5', title: 'Upsell Funnel Blueprint (PDF)', type: 'pdf', url: '#', size: '2.5 MB' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-start-here',
    title: 'Start Here: কোন কোর্স দিয়ে শুরু করবেন? - Digital Product Business Mastery',
    titleBn: 'Start Here: কোন কোর্স দিয়ে শুরু করবেন? - ডিজিটাল প্রোডাক্ট বিজনেস মাস্টারপ্ল্যান',
    subtitle: 'Master navigation roadmap for the Digital Product Business Combo Pack.',
    subtitleBn: 'ডিজিটাল প্রোডাক্ট বিজনেস কম্বো প্যাকের সকল কোর্সের পরিপূর্ণ গাইড ও শুরু করার রোডম্যাপ।',
    description: 'A comprehensive orientation showing the exact learning path, prerequisites, tools required, and step-by-step milestone execution for high-income digital product businesses.',
    descriptionBn: 'ডিজিটাল প্রোডাক্ট ব্যবসার সকল স্ট্র্যাটেজি, প্রয়োজনীয় টুলস এবং কোন কোর্সের পর কোনটি দেখবেন তার বিস্তারিত নির্দেশনা।',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1400&auto=format&fit=crop',
    category: 'marketing',
    categoryName: 'Digital Product Business Combo Pack',
    categoryNameBn: 'ডিজিটাল প্রোডাক্ট বিজনেস কম্বো প্যাক',
    level: 'Beginner',
    levelBn: 'বিগিনার ফ্রেন্ডলি',
    totalDuration: '6.5 hours',
    totalLessons: 4,
    rating: 5.0,
    reviewsCount: 890,
    badge: 'Start Now',
    badgeBn: 'শুরু করুন',
    certificateAvailable: true,
    createdAt: '2026-02-18',
    instructor: {
      id: 'inst-learniico-lead',
      name: 'Mentor Daniel Mott',
      title: 'Digital Product Business Coach',
      titleBn: 'ডিজিটাল প্রোডাক্ট বিজনেস কোচ',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      bio: 'Top digital educator with 5+ years of experience helping thousands launch online products.',
      bioBn: 'ডিজিটাল উদ্যোক্তা ও হাজারো শিক্ষার্থীর মেন্টর।',
      coursesCount: 6,
      studentsCount: 28000,
      rating: 5.0,
    },
    tags: ['Start Here', 'Roadmap', 'Digital Products', 'Learniico', 'Combo Pack'],
    modules: [
      {
        id: 'mod-sh-1',
        title: 'Module 1: Orientation & Roadmap to $1,000/month',
        titleBn: 'মডিউল ১: ওরিয়েন্টেশন ও সফলতার রোডম্যাপ',
        order: 1,
        lessons: [
          {
            id: 'les-sh-1',
            courseId: 'course-start-here',
            moduleId: 'mod-sh-1',
            title: '1. Course Orientation & Complete Study Strategy',
            titleBn: '১. কোর্স পরিচিতি ও কোন কোর্স দিয়ে আগে শুরু করবেন',
            duration: '14:20',
            durationSec: 860,
            videoUrl: 'https://www.youtube-nocookie.com/embed/5a22V5rDpnk',
            videoType: 'youtube',
            description: 'Why you should start with eBook and mini digital assets before moving to advanced video funnels.',
            descriptionBn: 'কোন কোর্সটি আগে দেখলে দ্রুত ইনকাম ও রেজাল্ট পাওয়া সম্ভব তার পূর্ণাঙ্গ রূপরেখা।',
            summaryPoints: [
              'Order of courses to follow inside combo pack',
              'Daily action checklist and accountability',
              'Accessing VIP community and mentor support'
            ],
            summaryPointsBn: [
              'কম্বো প্যাকের কোর্সগুলো ক্রমানুসারে দেখার নিয়ম',
              'দৈনিক কাজের চেকলিস্ট',
              'ভিআইপি কমিউনিটিতে যুক্ত হওয়ার নিয়ম'
            ],
            timestamps: [
              { time: 0, label: 'Welcome & Combo Pack Overview' },
              { time: 260, label: 'Step 1: eBook Creation' },
              { time: 540, label: 'Step 2: Facebook Ads & Traffic' }
            ],
            resources: [
              { id: 'res-sh-1', title: 'Digital Product Roadmap 2026 (PDF)', type: 'pdf', url: '#', size: '2.1 MB' }
            ],
            isFreePreview: true
          },
          {
            id: 'les-sh-2',
            courseId: 'course-start-here',
            moduleId: 'mod-sh-1',
            title: '2. Software & Tool Stack Setup (Free vs Paid)',
            titleBn: '২. প্রয়োজনীয় সফটওয়্যার ও টুলস সেটআপ গাইড',
            duration: '19:45',
            durationSec: 1185,
            videoUrl: 'https://www.youtube-nocookie.com/embed/NCwa_xi0Uuc',
            videoType: 'youtube',
            description: 'Everything you need to launch: AI tools, landing page builders, hosting, and payment gateways.',
            descriptionBn: 'বিনামূল্যে ও পেইড টুলস ব্যবহার করে স্বয়ংক্রিয় ডিজিটাল বিজনেস সেটআপ করার উপায়।',
            summaryPoints: [
              'Best free alternatives for landing pages',
              'Setting up bKash Merchant / Payment Gateway API',
              'Connecting custom domains and SSL'
            ],
            summaryPointsBn: [
              'ফ্রিতে ওয়েবসাইট ও সেলস পেজ তৈরি',
              'পেমেন্ট গেটওয়ে সেটআপ',
              'কাস্টম ডোমেন ও সিকিউরিটি কনফিগারেশন'
            ],
            timestamps: [
              { time: 0, label: 'Tool Overview' },
              { time: 450, label: 'Domain & Hosting Setup' },
              { time: 820, label: 'Payment Gateway Integration' }
            ],
            resources: [
              { id: 'res-sh-2', title: 'Tool Stack Checklist (PDF)', type: 'pdf', url: '#', size: '1.4 MB' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-learntoday-active',
    title: 'LearnToday Active Course Masterclass (Direct Portal Access)',
    titleBn: 'লার্নটুডে অ্যাক্টিভ কোর্স মাস্টারক্লাস (সরাসরি ক্লাসরুম পোর্টাল)',
    subtitle: 'Official course taken directly from LearnToday platform with full lesson access.',
    subtitleBn: 'লার্নটুডে ওয়েবসাইটের সক্রিয় কোর্স - সকল ভিডিও লেকচার, কারিকুলাম ও ডাইরেক্ট এক্সেস।',
    description: 'Direct interactive course player integrated with https://www.learntodayy.com/s/courses/6869380a2c6d1e6001b93725/take. Access full active course lessons, video streams, timetagged notes, and certificates.',
    descriptionBn: 'https://www.learntodayy.com/s/courses/6869380a2c6d1e6001b93725/take লিংক সম্বলিত সক্রিয় কোর্স। ভিডিও লেসন, সরাসরি পোর্টাল ভিউ, নোটস এবং প্রগ্রেস ট্র্যাকিং।',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1400&auto=format&fit=crop',
    category: 'web-dev',
    categoryName: 'Digital Product Business Combo Pack',
    categoryNameBn: 'ডিজিটাল প্রোডাক্ট বিজনেস কম্বো প্যাক',
    level: 'All Levels',
    levelBn: 'সকলের জন্য',
    totalDuration: '52 hours',
    totalLessons: 6,
    rating: 4.95,
    reviewsCount: 2350,
    badge: 'Active Enrolled',
    badgeBn: 'সক্রিয় কোর্স',
    certificateAvailable: true,
    createdAt: '2026-02-15',
    instructor: {
      id: 'inst-lt-1',
      name: 'LearnToday Instructor Team',
      title: 'Lead Technical Educators',
      titleBn: 'লার্নটুডে ইন্সট্রাক্টর টিম',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      bio: 'Official curriculum instructors at LearnToday Platform.',
      bioBn: 'লার্নটুডে প্ল্যাটফর্মের অফিসিয়াল কোর্স ও টেকনিক্যাল ট্রেইনার।',
      coursesCount: 12,
      studentsCount: 45000,
      rating: 4.95,
    },
    tags: ['Active Course', 'LearnToday', 'Masterclass', 'Full Access'],
    modules: [
      {
        id: 'mod-lt-1',
        title: 'Module 1: Orientation, Portal Access & Foundations',
        titleBn: 'মডিউল ১: ওরিয়েন্টেশন, পোর্টাল পরিচিতি ও ফান্ডামেন্টালস',
        order: 1,
        lessons: [
          {
            id: 'les-lt-1',
            courseId: 'course-learntoday-active',
            moduleId: 'mod-lt-1',
            title: '1. Course Overview & Direct Portal Navigation (6869380a2c6d1e6001b93725)',
            titleBn: '১. কোর্স পরিচিতি ও সরাসরি পোর্টাল ক্লাসরুম এক্সেস',
            duration: '15:40',
            durationSec: 940,
            videoUrl: 'https://www.youtube-nocookie.com/embed/SqcY0GlETPk',
            videoType: 'youtube',
            description: 'Orientation to the active course curriculum at https://www.learntodayy.com/s/courses/6869380a2c6d1e6001b93725/take. Setting up workspace and tracking lesson progress.',
            descriptionBn: 'লার্নটুডে অ্যাক্টিভ কোর্সের ওরিয়েন্টেশন এবং সরাসরি ক্লাসরুম ভিডিও প্লেয়ার ব্যবহারের পূর্ণাঙ্গ গাইড।',
            summaryPoints: [
              'Direct access to LearnToday course take link',
              'Integrated iframe and embedded classroom player',
              'Timetagged notes and progress synchronization'
            ],
            summaryPointsBn: [
              'লার্নটুডে অ্যাক্টিভ কোর্স লিংকের সরাসরি ইন্টিগ্রেশন',
              'আইফ্রেম ভিউ ও ইন্টারেক্টিভ ভিডিও প্লেয়ার',
              'টাইমট্যাগ সহ নোট সংরক্ষণ ও প্রগ্রেস ট্র্যাকিং'
            ],
            timestamps: [
              { time: 0, label: 'Course Welcome & Objectives' },
              { time: 240, label: 'Portal Structure & Navigation' },
              { time: 600, label: 'Video Player & Resources' }
            ],
            resources: [
              { id: 'res-lt-1', title: 'LearnToday Portal Direct Link', type: 'link', url: 'https://www.learntodayy.com/s/courses/6869380a2c6d1e6001b93725/take' }
            ],
            isFreePreview: true
          },
          {
            id: 'les-lt-2',
            courseId: 'course-learntoday-active',
            moduleId: 'mod-lt-1',
            title: '2. Core Strategy & Step-by-Step Implementation',
            titleBn: '২. মূল স্ট্র্যাটেজি ও প্রজেক্ট ইমপ্লিমেন্টেশন',
            duration: '22:30',
            durationSec: 1350,
            videoUrl: 'https://www.youtube-nocookie.com/embed/NCwa_xi0Uuc',
            videoType: 'youtube',
            description: 'Practical live execution of high converting digital assets and sales workflows.',
            descriptionBn: 'রিয়েল-লাইফ প্রজেক্ট ও ডিজিটাল অ্যাসেট তৈরির লাইভ প্র্যাকটিক্যাল গাইড।',
            summaryPoints: [
              'Hands-on implementation of core frameworks',
              'Avoiding common beginner mistakes',
              'Building long-term digital asset value'
            ],
            summaryPointsBn: [
              'লাইভ প্র্যাকটিক্যাল কাজ শুরু করার নিয়ম',
              'সাধারণ ভুলগুলো এড়িয়ে চলার কৌশল',
              'দীর্ঘমেয়াদী ডিজিটাল ব্র্যান্ড তৈরি'
            ],
            timestamps: [
              { time: 0, label: 'Framework Overview' },
              { time: 420, label: 'Step-by-Step Build' },
              { time: 960, label: 'Live Q&A & Wrap Up' }
            ],
            resources: [
              { id: 'res-lt-2', title: 'Master Implementation Guide (PDF)', type: 'pdf', url: '#', size: '3.2 MB' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-react-fullstack',
    title: 'Complete Full-Stack Web Development Masterclass 2026',
    titleBn: 'কমপ্লিট ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট মাস্টারক্লাস ২০২৬',
    subtitle: 'Learn React 19, TypeScript, Node.js, Next.js, and Modern Web APIs from scratch to production.',
    subtitleBn: 'রিঅ্যাক্ট ১৯, টাইপস্ক্রিপ্ট, নোডজেএস এবং নেক্সটজেএস শিখে প্রফেশনাল ওয়েব ডেভেলপার হোন।',
    description: 'A comprehensive curriculum designed to take you from beginner fundamentals to building enterprise-scale SaaS applications with modern React, database integrations, authentication, and cloud deployment.',
    descriptionBn: 'শুরু থেকে প্রফেশনাল লেভেল পর্যন্ত আধুনিক ওয়েব ডেভেলপমেন্টের সকল কনসেপ্ট, রিয়েল প্রজেক্ট এবং ব্যাকএন্ড আর্কিটেকচার শেখার সবচেয়ে জনপ্রিয় কোর্স।',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1400&auto=format&fit=crop',
    category: 'web-dev',
    categoryName: 'Web Development',
    categoryNameBn: 'ওয়েব ডেভেলপমেন্ট',
    level: 'All Levels',
    levelBn: 'সকলের জন্য',
    totalDuration: '48.5 hours',
    totalLessons: 4,
    rating: 4.9,
    reviewsCount: 1840,
    badge: 'Bestseller',
    badgeBn: 'বেস্টসেলার',
    certificateAvailable: true,
    createdAt: '2026-01-15',
    instructor: {
      id: 'inst-1',
      name: 'Tanvir Hossain',
      title: 'Lead Software Architect & Tech Educator',
      titleBn: 'লিড সফটওয়্যার আর্কিটেক্ট ও টেক ট্রেইনার',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      bio: '10+ years of experience building scalable distributed systems and training over 50,000 developers across Bangladesh & globally.',
      bioBn: '১০ বছরের বেশি সফটওয়্যার ইঞ্জিনিয়ারিং অভিজ্ঞতা এবং ৫০,০০০+ শিক্ষার্থীকে মেন্টরিং করার অভিজ্ঞতা।',
      coursesCount: 8,
      studentsCount: 34200,
      rating: 4.9,
    },
    tags: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS'],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Modern JavaScript & Frontend Fundamentals',
        titleBn: 'মডিউল ১: আধুনিক জাভাস্ক্রিপ্ট ও ফ্রন্টএন্ড ফান্ডামেন্টালস',
        order: 1,
        lessons: [
          {
            id: 'les-1-1',
            courseId: 'course-react-fullstack',
            moduleId: 'mod-1',
            title: '1. Welcome to LearnToday: Environment Setup & Roadmap',
            titleBn: '১. লার্নটুডেতে স্বাগতম: এনভায়রনমেন্ট সেটআপ ও রোডম্যাপ',
            duration: '12:45',
            durationSec: 765,
            videoUrl: 'https://www.youtube-nocookie.com/embed/SqcY0GlETPk',
            videoType: 'youtube',
            description: 'Get acquainted with the course platform, installing VS Code, Node.js runtime, Git setup, and best extension packages for 2026.',
            descriptionBn: 'কোর্সের প্ল্যাটফর্ম পরিচিতি, ভিএস কোড ও নোড জেএস ইন্সটলেশন এবং আধুনিক এক্সটেনশন কনফিগারেশন।',
            summaryPoints: [
              'Installed Node.js LTS and VS Code extensions',
              'Setup Git repository and SSH keys',
              'Understanding course roadmap and project milestones'
            ],
            summaryPointsBn: [
              'নোড জেএস ও প্রয়োজনীয় ভিএস কোড এক্সটেনশন ইন্সটল করা',
              'গিট ও গিটহাব কনফিগারেশন',
              'সম্পূর্ণ কোর্সের রোডম্যাপ ও প্রজেক্টের ধারণা'
            ],
            timestamps: [
              { time: 0, label: 'Introduction' },
              { time: 140, label: 'VS Code Setup & Settings' },
              { time: 380, label: 'Node & NPM Installation' },
              { time: 620, label: 'Course Resources & Discord Group' }
            ],
            resources: [
              { id: 'res-1', title: 'VS Code Recommended Settings (JSON)', type: 'code', url: '#', size: '12 KB' }
            ],
            isFreePreview: true
          }
        ]
      }
    ]
  }
];

export const INITIAL_DISCUSSIONS: DiscussionPost[] = [
  {
    id: 'disc-lt-1',
    courseId: 'course-ebook-ai',
    lessonId: 'les-eb-1',
    userId: 'user-nasir-1',
    userName: 'Md Nasir Hassan',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    title: 'How do I generate chapter outlines quickly?',
    text: 'What is the recommended prompt sequence for non-fiction eBooks?',
    createdAt: 'Just now',
    likes: 8,
    replies: [
      {
        id: 'rep-lt-1',
        userId: 'inst-learniico-1',
        userName: 'Learniico Mentor',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
        text: 'First define the reader avatar, then list 7 core roadblocks they face, and generate 1 chapter per roadblock.',
        createdAt: 'Just now',
        isInstructor: true
      }
    ]
  }
];

import badgeCertifiedDeveloper from './assets/badge-certified-developer.png'
import badgeDatabaseAssociate from './assets/badge-database-associate.jpg'
import badgeDatabaseProfessional from './assets/badge-database-professional.jpg'
import iconBook from './assets/icon-book.svg'
import iconTrophy from './assets/icon-trophy.svg'
import { PageItem } from '@/data/learn/index'
import iconRealTimeAnalytics from '@/pages/learn/assets/icon-real-time-analytics.svg'

export default {
  title: 'Real-time analytics',
  slug: 'real-time-analytics',
  icon: iconRealTimeAnalytics,
  h1: 'Real-time analytics with ClickHouse',
  intro:
    'Learn how to power real-time dashboards, alerts, and event-driven apps with ClickHouse.',
  lmsUrl: 'https://learn.clickhouse.com/visitor_class_catalog/category/115904',
  level: '3 levels',
  modules: '10 modules',
  credentials: '3',
  duration: '10 hours',
  sections: [
    {
      items: [
        {
          icon: { src: iconBook },
          link: 'https://learn.clickhouse.com/visitor_catalog_class/show/1872073',
          title: 'Level 1: Real-time analytics with ClickHouse',
          description: `In level 1 of this three-part learning path, you’ll learn how ClickHouse is blazing fast for analyzing massive datasets in real time, and tips and tricks for getting data in and starting a POC.
          
**Skill level:** Beginner

**What you’ll learn:** Level 1 consists of the following three modules, including video lectures, hands-on labs, and quizzes:
- Module 1: Introduction to ClickHouse
- Module 2: Deep dive into ClickHouse architecture
- Module 3: Inserting data into ClickHouse`,
          panel: {
            title: 'Become a ClickHouse Database Associate',
            description:
              'By completing modules 1-3 and passing the quiz at the end of each module you will become a ClickHouse Database Associate.',
            image: {
              src: badgeDatabaseAssociate,
              alt: 'ClickHouse Database Associate',
              className: 'self-stretch object-contain bg-white md:!w-40'
            }
          }
        },
        {
          icon: { src: iconBook },
          link: 'https://learn.clickhouse.com/visitor_catalog_class/show/1896608/Real-time-Analytics-with-ClickHouse-Level-2',
          title: 'Level 2: Real-time analytics with ClickHouse',
          description: `In level 2 of this three-part learning path, you’ll gain the skills needed to solve real problems and build useful workflows with ClickHouse.
          
**Skill level:** Intermediate

**What you’ll learn:** Level 2 consists of the following four modules,  including video lectures, hands-on labs, and quizzes:
- Module 4: Modeling data with ClickHouse
- Module 5: Analyzing data with ClickHouse
- Module 6: Joining data with ClickHouse
- Module 7: Deleting and updating data`,
          panel: {
            title: 'Become a ClickHouse Database Professional',
            description:
              'By completing modules 4-7 and passing the quiz at the end of each module you will become a ClickHouse Database Professional.',
            image: {
              src: badgeDatabaseProfessional,
              alt: 'ClickHouse Database Professional',
              className: 'self-stretch object-contain bg-white md:!w-40'
            }
          }
        },
        {
          icon: { src: iconBook },
          link: 'https://learn.clickhouse.com/visitor_catalog_class/show/1914307',
          title: 'Level 3: Real-time analytics with ClickHouse',
          description: `In level 3 of this three-part learning path, you’ll gain the skills and expertise to design, optimize, and run ClickHouse at scale.
          
**Skill level:** Advanced

**What you’ll learn:** Level 3 consists of the following three modules,  including video lectures, hands-on labs, and quizzes:
- Module 8: Query acceleration techniques
- Module 9: Sharding and replication
- Module 10: Managing data in ClickHouse`,
          panel: {
            title: 'Become a recognized ClickHouse expert',
            description:
              'After completing all three levels of the Real-time Analytics with ClickHouse Learning Path, you’ll have the hands-on knowledge needed to become a recognized ClickHouse expert.'
          }
        },
        {
          icon: { src: iconTrophy },
          title: 'ClickHouse Certification',
          link: '/learn/certification',
          panel: {
            description: `Validate your skills with our official ClickHouse Certification. Get certified with the ClickHouse Certified Developer Exam.

<span class="text-primary-300 group-hover:underline">Find out more -></span>`,
            image: {
              src: badgeCertifiedDeveloper,
              alt: 'ClickHouse Certified Developer',
              className: 'self-stretch object-contain bg-white md:!w-40'
            }
          }
        }
      ]
    }
  ]
} satisfies PageItem

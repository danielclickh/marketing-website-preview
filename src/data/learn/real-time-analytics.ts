import { PageItem } from '@/data/learn/index'
import iconRealTimeAnalytics from '@/pages/learn/assets/icon-real-time-analytics.svg'

export default {
  title: 'Real-time analytics',
  slug: 'real-time-analytics',
  icon: iconRealTimeAnalytics,
  h1: 'Real-time analytics with ClickHouse',
  intro:
    'Learn how to power real-time dashboards, alerts, and event-driven apps with ClickHouse.',
  lmsUrl: 'https://learn.clickhouse.com/visitor_catalog_class/show/1872073',
  level: '3 levels',
  modules: '10 modules',
  quizzes: '3',
  duration: '10 hours',
  sections: [
    {
      title: 'Level 1',
      description:
        'In level 1 of this three-part learning path, you’ll learn how ClickHouse is blazing fast for analyzing massive datasets in real time, and tips and tricks for getting data in and starting a POC.',
      items: [
        {
          type: 'module',
          title: 'Module 1: Introduction to ClickHouse'
        },
        {
          type: 'module',
          title: 'Module 2: Deep dive into ClickHouse architecture'
        },
        {
          type: 'module',
          title: 'Module 3: Inserting data into ClickHouse'
        }
      ]
    },
    {
      title: 'Level 2',
      description:
        'In level 2 of this three-part learning path, you’ll gain the skills needed to solve real problems and build useful workflows with ClickHouse. ',
      items: [
        {
          type: 'module',
          title: 'Module 4: Modeling data with ClickHouse'
        },
        {
          type: 'module',
          title: 'Module 5: Analyzing data with ClickHouse'
        },
        {
          type: 'module',
          title: 'Module 6: Joining data with ClickHouse'
        },
        {
          type: 'module',
          title: 'Module 7: Deleting and updating data'
        }
      ]
    }
  ]
} satisfies PageItem

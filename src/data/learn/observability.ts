import badgeObservabilityAssociate from '@/data/learn/assets/badge-observability-associate.jpg'
import badgeObservabilityProfessional from '@/data/learn/assets/badge-observability-professional.jpg'
import iconBook from '@/data/learn/assets/icon-book.svg'
import iconTrophy from '@/data/learn/assets/icon-trophy.svg'
import { PageItem } from '@/data/learn/index'
import iconObservability from '@/pages/learn/assets/icon-observability.svg'

export default {
  title: 'Observability',
  slug: 'observability',
  icon: iconObservability,
  h1: 'ClickStack: The high-performance observability stack',
  intro:
    'Ingest logs, metrics, and traces to monitor systems and power observability dashboards.',
  lmsUrl: 'https://learn.clickhouse.com/visitor_catalog_class/show/1883620',
  level: '3 levels',
  modules: '10',
  credentials: '3',
  duration: '10 hours',
  sections: [
    {
      items: [
        {
          icon: { src: iconBook },
          link: 'https://learn.clickhouse.com/visitor_catalog_class/show/1883620',
          title: 'Level 1: Observability at scale with ClickStack',
          description: `In level 1 of this three-part learning path, you’ll learn how to deploy a complete observability stack using ClickHouse, OpenTelemetry, and HyperDX.
          
**Skill level:** Beginner

**What you’ll learn:** Level 1 consists of the following three modules, including video lectures, hands-on labs, and quizzes:
- Module 1: Introduction to ClickStack
- Module 2: Ingesting data
- Module 3: Visualizing data`,
          panel: {
            title: 'Become a ClickHouse Observability Associate',
            description:
              'By completing modules 1-3 and passing the quiz at the end of each module you will become a ClickHouse Observability Associate.',
            image: {
              src: badgeObservabilityAssociate,
              alt: 'ClickHouse Observability Associate',
              className: 'self-stretch object-contain bg-white md:!w-40'
            }
          }
        },
        {
          icon: { src: iconBook },
          badge: 'Coming soon',
          title: 'Level 2: Using ClickHouse for Observability',
          description: `In level 2 of this three-part learning path, you’ll gain the skills needed to customize ClickHouse to your own Observability needs.
          
**Skill level:** Intermediate

**What you’ll learn:** Level 2 consists of the following four modules, including video lectures, hands-on labs, and quizzes:
- Module 4: ClickHouse architecture and data types
- Module 5: Data enrichment
- Module 6: Query acceleration techniques
- Module 7: Alerting`,
          panel: {
            title: 'Become a ClickHouse Observability Professional',
            description:
              'By completing modules 4-7 and passing the quiz at the end of each module you will become a ClickHouse Observability Professional.',
            image: {
              src: badgeObservabilityProfessional,
              alt: 'ClickHouse Observability Professional',
              className: 'self-stretch object-contain bg-white md:!w-40'
            }
          }
        },
        {
          icon: { src: iconBook },
          badge: 'Coming soon',
          title: 'Level 3: Scaling ClickStack',
          description: `In level 3 of this three-part learning path, you’ll gain the skills and expertise to deploy ClickStack at Scale.
          
**Skill level:** Advanced

**What you’ll learn:** Level 3 consists of the following three modules,  including video lectures, hands-on labs, and quizzes:
- Module 8: Advanced data analysis
- Module 9: Integrating with other tools
- Module 10: Multi-region observability`,
          panel: {
            title: 'Become a recognized ClickHouse expert',
            description:
              'After completing all three levels of the ClickStack: The high-performance observability stack Learning Path, you’ll have the hands-on knowledge needed to become a recognized ClickHouse expert.'
          }
        },
        {
          icon: { src: iconTrophy },
          title: 'ClickHouse Certification',
          description: `Validate your skills with our official ClickHouse Certification. Get certified with the ClickHouse Certified Developer Exam.

<span class="text-primary-300 group-hover:underline">Find out more -></span>`,
          link: '/learn/certification'
        }
      ]
    }
  ]
} satisfies PageItem

import IconCalendar from './assets/icon-calendar'
import IconDatabase from './assets/icon-database'
import IconFrame from './assets/icon-frame'
import IconGauge from './assets/icon-gauge'
import IconHandCoins from './assets/icon-hand-coins'
import IconPeople from './assets/icon-people'
import IconPerson from './assets/icon-person'
import IconPieChart from './assets/icon-pie-chart'
import IconStack from './assets/icon-stack'
import IconStopwatch from './assets/icon-stopwatch'
import LogoAdgreetz from './assets/logo-adgreetz'
import LogoAdmixer from './assets/logo-admixer'
import LogoClearbit from './assets/logo-clearbit'
import LogoCloudflare from './assets/logo-cloudflare'
import LogoCognitiv from './assets/logo-cognitiv'
import LogoContentsquare from './assets/logo-contentsquare'
import LogoCorsearch from './assets/logo-corsearch'
import LogoDarwinium from './assets/logo-darwinium'
import LogoDassana from './assets/logo-dassana'
import LogoDeepl from './assets/logo-deepl'
import LogoDenic from './assets/logo-denic'
import LogoDidi from './assets/logo-didi'
import LogoExitlag from './assets/logo-exitlag'
import LogoHifi from './assets/logo-hifi'
import LogoInstacart from './assets/logo-instacart'
import LogoJuspay from './assets/logo-juspay'
import LogoLangchain from './assets/logo-langchain'
import LogoLyft from './assets/logo-lyft'
import LogoMinted from './assets/logo-minted'
import LogoOngage from './assets/logo-ongage'
import LogoQuickcheck from './assets/logo-quickcheck'
import LogoSony from './assets/logo-sony'
import LogoSynq from './assets/logo-synq'
import LogoTrip from './assets/logo-trip'
import LogoVantage from './assets/logo-vantage'
import LogoVimeo from './assets/logo-vimeo'
import thumbAnthropic from './assets/thumb-anthropic.jpeg'
import thumbLyft from './assets/thumb-lyft.jpeg'
import thumbTesla from './assets/thumb-tesla.jpeg'
import YouTubeVideo from '@/components-cleaned/YouTubeVideo'

export type EntryCategory = string

export type EntryStat = {
  icon: React.ComponentType
  stat: string
  label: string
}

export type Entry = {
  body: React.ReactNode | string
  logo?: React.ComponentType
  categories: EntryCategory[]
  stats?: EntryStat[]
  featured: boolean
  embed?: React.ReactNode | string
}

export function getCategories(): EntryCategory[] {
  const mergedCategories = getContent().flatMap((entry) => entry.categories)

  // Remove duplicates (Array.from silences typescript error)
  return [...Array.from(new Set(mergedCategories))]
}

export function getContent(): Entry[] {
  return [
    // Langchain
    {
      featured: false,
      body: '“We’ve had a positive experience with ClickHouse. It allowed us to scale LangSmith to production workloads and provide a service where users can log all of their data. We couldn’t have accomplished this without ClickHouse.” [Read blog](/blog/langchain-why-we-choose-clickhouse-to-power-langchain?loc=homepage)',
      logo: LogoLangchain,
      categories: ['Real-time analytics']
    },
    // Cloudflare
    {
      featured: false,
      body: '“ClickHouse helps us efficiently and reliably analyze logs across trillions of Internet requests to identify malicious traffic and provide customers with rich analytics.” [Read blog](https://blog.cloudflare.com/http-analytics-for-6m-requests-per-second-using-clickhouse/)',
      logo: LogoCloudflare,
      categories: ['Real-time analytics'],
      stats: [
        {
          icon: IconFrame,
          stat: '1.5T',
          label: 'Page views analyzed / mo'
        },
        {
          icon: IconPerson,
          stat: '2.5B',
          label: 'Visitors analyzed / mo'
        },
        {
          icon: IconStack,
          stat: '11M',
          label: 'Rows ingested / sec'
        }
      ]
    },

    // Sony
    {
      featured: false,
      body: '“At Sony LIV, we ingest tens of millions of video streaming events into ClickHouse Cloud and run queries to generate complex dashboards for analysis. This allows our operations team to monitor, alert & troubleshoot the QOS and QOE of our customers in real-time. ClickHouse Cloud has helped us to optimize costs and ensure the high availability and resilience of our services.”',
      logo: LogoSony,
      categories: ['Observability'],
      stats: [
        {
          icon: IconStack,
          stat: '10M+',
          label: 'Streaming events ingested'
        },
        {
          icon: IconHandCoins,
          stat: 'Cost',
          label: 'Efficiency'
        }
      ]
    },

    // Didi
    {
      featured: false,
      body: '“Migrating logs from Elasticsearch to ClickHouse has not only significantly reduced storage costs but also provided us with a faster querying experience.” [Read blog](/blog/didi-migrates-from-elasticsearch-to-clickHouse-for-a-new-generation-log-storage-system)',
      logo: LogoDidi,
      categories: ['Observability'],
      stats: [
        {
          icon: IconStack,
          stat: '40GB',
          label: ' per second'
        },
        {
          icon: IconHandCoins,
          stat: '30%',
          label: 'cost savings'
        },
        {
          icon: IconGauge,
          stat: '4x',
          label: 'faster queries'
        }
      ]
    },

    // Trip.com
    {
      featured: false,
      body: `Trip.com was using Elasticsearch for their observability data until they made the switch to ClickHouse. The result? 40GB per second, 30% savings in costs, and queries that are up to 30x faster!
 [Read blog](/blog/how-trip.com-migrated-from-elasticsearch-and-built-a-50pb-logging-solution-with-clickhouse)`,
      logo: LogoTrip,
      categories: ['Observability'],
      stats: [
        {
          icon: IconStack,
          stat: '85 Trillion',
          label: 'rows'
        },
        {
          icon: IconDatabase,
          stat: '50+ PB',
          label: 'data storage'
        },
        {
          icon: IconGauge,
          stat: '30x',
          label: 'faster queries'
        }
      ]
    },

    // Open house: Anthropic
    {
      featured: true,
      body: (
        <>
          <p className='mb-4 text-balance text-2xl'>
            “ClickHouse played an instrumental role in helping us develop and
            ship Claude 4.”
          </p>
          <p className='text-2xl'>
            <strong>Anthropic</strong>
          </p>
        </>
      ),
      embed: <YouTubeVideo id='SrLKbzdFEWA' thumbnail={thumbAnthropic} />,
      categories: ['Observability']
    },

    // Open house: Tesla
    {
      featured: true,
      body: (
        <>
          <p className='mb-4 text-balance text-2xl'>
            “ClickHouse checked every box. We have availability, we have speed,
            we have durability. We have everything we could want.”
          </p>
          <p className='text-2xl'>
            <strong>Tesla</strong>
          </p>
        </>
      ),
      embed: <YouTubeVideo id='z5t3b3EAc84' thumbnail={thumbTesla} />,
      categories: ['Observability']
    },

    // Clearbit
    {
      featured: false,
      body: "“There's that feeling of new tech where everything just feels like it's going right. Can we get the data in there quick enough? Yes. Can we query the data in a way that is going to have a responsive UI? Yes. Is the cost gonna kill us? No.”",
      logo: LogoClearbit,
      categories: ['Real-time analytics'],
      embed:
        "<iframe src=\"https://player.vimeo.com/video/863656379?h=ec5de7be6d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&autoplay=0\" frameBorder='0' allow='autoplay; fullscreen; picture-in-picture'></iframe>",
      stats: [
        {
          icon: IconGauge,
          stat: '5-6x',
          label: 'Faster data ingestion'
        },
        {
          icon: IconHandCoins,
          stat: '10x',
          label: 'Cost savings'
        }
      ]
    },

    // Lyft
    {
      featured: false,
      body: '“We needed something to slice and dice real-time data, like rides and driver hours across cities and regions where Lyft runs. Using ClickHouse resulted into a lot of performance benefits for us with huge cost savings for the org.” [Read blog](https://eng.lyft.com/druid-deprecation-and-clickhouse-adoption-at-lyft-120af37651fd)',
      logo: LogoLyft,
      categories: ['Business intelligence'],
      embed:
        "<iframe src=\"https://player.vimeo.com/video/903236689?h=62b37e3795&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&autoplay=0\" frameBorder='0' allow='autoplay; fullscreen; picture-in-picture'></iframe>",
      stats: [
        {
          icon: IconStack,
          stat: '10M+',
          label: 'Rows ingested daily'
        },
        {
          icon: IconDatabase,
          stat: '20TB',
          label: 'Data read daily'
        },
        {
          icon: IconHandCoins,
          stat: 'Huge',
          label: 'Cost savings'
        }
      ]
    },

    // Vantage
    {
      featured: false,
      body: '“Moving over to ClickHouse we were able to cut that (Redshift) bill in half … That 30 second query now takes a couple seconds or under a second under a second … every page loads just faster”',
      logo: LogoVantage,
      categories: ['Real-time analytics'],
      stats: [
        {
          icon: IconGauge,
          stat: '500x',
          label: 'Query speed improvement'
        },
        {
          icon: IconHandCoins,
          stat: '50%',
          label: 'Cost savings'
        }
      ]
    },

    // Vimeo
    {
      featured: false,
      body: '“In the post-evaluation of each database against our criteria (with metrics ranging from query performance to cost), ClickHouse emerged as the unrivalled frontrunner. It excelled across the board, even astonishingly so in certain domains, and proved more cost-efficient.” [Read blog](https://medium.com/vimeo-engineering-blog/clickhouse-is-in-the-house-413862c8ac28)',
      logo: LogoVimeo,
      categories: ['Media & entertainment'],
      stats: [
        {
          icon: IconFrame,
          stat: '100B+',
          label: 'Sessions analyzed / year'
        },
        {
          icon: IconGauge,
          stat: '10x',
          label: 'Improved query speed'
        },
        {
          icon: IconDatabase,
          stat: '2-3x',
          label: 'Better storage efficiency'
        }
      ]
    },

    // Cognitiv
    {
      featured: false,
      body: 'Cognitiv uses ClickHouse to power their ML offline feature store for its blazing speed and resource efficiency. “ClickHouse was able to efficiently process queries that previously had taken hours or even days to complete. This was hugely valuable for Cognitiv’s data team, allowing them to rapidly iterate and refine their machine learning models.” [Read blog](/blog/transforming-ad-tech-how-cognitiv-uses-clickhouse-to-build-better-machine-learning-models?loc=homepage)',
      logo: LogoCognitiv,
      categories: ['ML & GenAI']
    },
    // Corsearch
    {
      featured: false,
      body: 'Corsearch chose ClickHouse as their vector database after evaluating alternatives, including specialized vector DBs. And now, as Chase, their VP of Engineering, explains, “by utilizing expert models and embeddings, we detect substantive changes in web pages and identify connections between pages that share similar characteristics.” [Read blog](/blog/corsearch-replaces-mysql-with-clickhouse-for-content-and-brand-protection?loc=homepage)',
      logo: LogoCorsearch,
      categories: ['ML & GenAI']
    },
    // Admixer
    {
      featured: false,
      body: '“ClickHouse was perfect as Big Data Storage for our ML models.” [Read blog](/blog/admixer-aggregates-over-1-billion-unique-users-a-day-using-clickhouse?loc=homepage)',
      logo: LogoAdmixer,
      categories: ['ML & GenAI'],
      stats: [
        {
          icon: IconStack,
          stat: '100 Billion',
          label: 'Records inserted per day'
        },
        {
          icon: IconPeople,
          stat: '1 Billion',
          label: 'Unique users aggregated daily'
        }
      ]
    },

    // QuickCheck
    {
      featured: false,
      body: '"We collect tens of thousands of data points from customers’ phones and other more traditional sources. ClickHouse is used as a way to process all of these SMS messages and extract valuable information used for the scoring and fraud models." [Read blog](/blog/how-quickcheck-uses-clickhouse-to-bring-banking-to-the-unbanked?loc=homepage)',
      logo: LogoQuickcheck,
      categories: ['Financial services'],
      stats: [
        {
          icon: IconStack,
          stat: '100+ Million',
          label: 'Rows of individual loan data'
        },
        {
          icon: IconPieChart,
          stat: 'Live dashboards',
          label: 'Powering financial, fraud, and monitoring analysis'
        }
      ]
    },

    // Ongage
    {
      featured: false,
      body: '"When we tested how much time the same reports would take with ClickHouse, people were amazed. We ran the same data, and in a blink of an eye, we had the results." [Read blog](/blog/ongages-strategic-shift-to-clickhouse-for-real-time-email-marketing?loc=homepage)',
      logo: LogoOngage,
      categories: ['Marketing & sales']
    },

    // AdGreetz
    {
      featured: false,
      body: '"With Snowflake, we were using the standard plan, small compute, which cost nearly six times more than ClickHouse Cloud. We got several seconds query time and no materialized views. With ClickHouse Cloud’s production instance, we are getting sub-second query time along with materialized views. The decision to switch was a no-brainer for us.” [Read blog](/blog/adgreetz-processes-millions-of-daily-ad-impressions?loc=homepage)',
      logo: LogoAdgreetz,
      categories: ['Marketing & sales'],
      stats: [
        {
          icon: IconHandCoins,
          stat: '6x',
          label: 'Cost savings compared to Snowflake'
        },
        {
          icon: IconStopwatch,
          stat: '< 1 sec',
          label: 'Query response times'
        }
      ]
    },

    // Juspay
    {
      featured: false,
      body: '“ClickHouse solves most of our problems very efficiently at a small fraction of the price in terms of infrastructure. This is a far better advantage for us in our books” [Read blog](/blog/juspay-analyzes-payment-transactions-in-real-time-with-clickhouse?loc=homepage)',
      logo: LogoJuspay,
      categories: ['Financial services'],
      stats: [
        {
          icon: IconHandCoins,
          stat: '10x',
          label: 'Cost reduction'
        }
      ]
    },
    {
      featured: false,
      body: '“ClickHouse is a fast and highly performant analytical database, widely used across Instacart to power other use-cases such as critical retailer and ads dashboards, calculating results for A/B testing, and machine learning signals.” <a href="https://tech.instacart.com/real-time-fraud-detection-with-yoda-and-clickhouse-bd08e9dbe3f4?utm_source=clickhouse" target="_blank">Read blog</a>',
      logo: LogoInstacart,
      categories: ['E-commerce & retail']
    },
    // Contentsquare
    {
      featured: false,
      body: '“Moving from Elasticsearch to ClickHouse was a long journey, but this is one of the best tech decisions we ever took.” [Read blog](/blog/contentsquare-migration-from-elasticsearch-to-clickhouse?loc=homepage)',
      logo: LogoContentsquare,
      categories: ['E-commerce & retail'],
      stats: [
        {
          icon: IconHandCoins,
          stat: '11x',
          label: 'More cost effective'
        },
        {
          icon: IconGauge,
          stat: '10x',
          label: 'Performance improvement'
        },
        {
          icon: IconCalendar,
          stat: '13 month',
          label: 'Data retention'
        }
      ]
    },

    // HIFI
    {
      featured: false,
      body: '“ClickHouse’s performance exceeds all other column-oriented database management systems. It processes billions of rows and tens of gigabytes of data per server per second.” [Read blog](/blog/hifis-migration-from-bigquery-to-clickhouse?loc=homepage)',
      logo: LogoHifi,
      categories: ['Media & entertainment'],
      stats: [
        {
          icon: IconStack,
          stat: 'Billions',
          label: 'of rows'
        },
        {
          icon: IconStopwatch,
          stat: '10s of GBs',
          label: 'of data processed / second'
        }
      ]
    },

    // DeepL
    {
      featured: false,
      body: '"We aggregate the user’s history in ClickHouse and use it as a data store for training and inference. Even when reading 10s of millions of rows, the performance was very nice and not the bottleneck when training new models." [Read blog](/blog/deepls-journey-with-clickhouse?loc=homepage)',
      logo: LogoDeepl,
      categories: ['ML & GenAI']
    },

    // DENIC
    {
      featured: false,
      body: '"After Testing Hadoop and Spark, We Chose ClickHouse" [Read blog](/blog/denic-improves-query-times-by-10x-with-clickhouse?loc=homepage)',
      logo: LogoDenic,
      categories: ['ML & GenAI']
    },

    // Synq
    {
      featured: false,
      body: '“With dbt execution orchestrated in various intervals, we can also leverage ClickHouse for internal BI use cases. We’ve found this setup very practical, as we can flexibly create new analytical views of our customer data without moving it from our production operational systems.” [Read blog](/blog/building-a-unified-data-platform-with-clickhouse?loc=homepage)',
      logo: LogoSynq,
      categories: ['Business intelligence']
    },
    // Minted

    // Minted
    {
      featured: false,
      body: '“We use Clickhouse Cloud to monitor millions of real-time web performance data points, to ensure we’re getting faster all the time. The platform delivers fast and reliable data management, while also proving to be cost efficient and user-friendly.”',
      logo: LogoMinted,
      categories: ['E-commerce & retail']
    },

    // Darwinium
    {
      featured: false,
      body: '“With ClickHouse, the data pipeline logic is simplified, and is only dealing with the “streaming” aspect of the write as opposed to all of these complexities. ClickHouse thus enables a simpler write design pattern just like any other new age data lake systems like Hudi etc. but with a more simplistic developer experience.” [Read blog](/blog/fast-feature-rich-and-mutable-clickhouse-powers-darwiniums-security-and-fraud-analytics-use-cases?loc=homepage)',
      logo: LogoDarwinium,
      categories: ['Fraud & cybersecurity']
    },

    // Dassana
    {
      featured: false,
      body: '"We evaluated more than a dozen different big data systems before settling on ClickHouse. No system comes close to ClickHouse when it comes to the flexibility ClickHouse provides" [Read blog](/blog/clickhouse-powers-dassanas-security-data-lake?loc=homepage)',
      logo: LogoDassana,
      categories: ['Fraud & cybersecurity']
    },

    // ExitLag
    {
      featured: false,
      body: '“The benefits were immediate, with faster data processing and accurate analytics that allowed me to make strategic decisions with confidence. ClickHouse opened new horizons for the growth and success of my company, raising our executive vision to levels never reached before.” [Read blog](/blog/boosting-game-performance-exitlag-quest-for-a-better-data-management-system?loc=homepage)',
      logo: LogoExitlag,
      categories: ['Gaming']
    },

    // Open house: Lyft
    {
      featured: true,
      body: (
        <>
          <p className='mb-4 text-balance text-2xl'>
            “We needed something to slice and dice real-time data, like rides
            and driver hours across cities and regions where Lyft runs. Using
            ClickHouse resulted into a lot of performance benefits for us with
            huge cost savings for the org.”
          </p>
          <p className='text-2xl'>
            <strong>Lyft</strong>
          </p>
        </>
      ),
      embed: <YouTubeVideo id='DWkuhCBA7B4' thumbnail={thumbLyft} />,
      categories: []
    }
  ]
}

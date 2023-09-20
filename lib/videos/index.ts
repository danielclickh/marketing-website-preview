import { Video, VideoCategory } from './types'
import { slugify } from '../utils/strings'

export function getVideos(): Video[] {
  return [
    {
      slug: 'vantage',
      title: 'Vantage & ClickHouse',
      subTitle: 'Brooke McKim\nCo-founder and CTO, Vantage',
      description:
        "Vantage streamlines cloud cost management for businesses. Brooke shares how transitioning to ClickHouse Cloud not only optimized Vantage's operations but also cut their Redshift bill in half.",
      thumbnail: 'https://img.youtube.com/vi/8FUfyvoqDTg/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/8FUfyvoqDTg?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['ClickHouse Cloud']
    },
    {
      slug: 'clearbit',
      title: 'Clearbit & ClickHouse',
      subTitle: 'Harlow Ward\nCo-founder and CTO, Clearbit',
      description:
        'Clearbit needed a real-time database to handle their massive clickstream data volume and power their UI. Harlow shares why ClickHouse Cloud ticked all the boxes.',
      thumbnail: 'https://img.youtube.com/vi/3mS-RSKfGWQ/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/3mS-RSKfGWQ?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['ClickHouse Cloud']
    },
    {
      slug: 'statsig',
      title: 'Statsig & ClickHouse',
      subTitle: 'Jason Wang\nSoftware Engineer, Statsig',
      description:
        'Statsig is an experimentation and A/B testing company, handling millions of events every second and billions daily. Jason shares why they landed on ClickHouse Cloud for their real-time analytics.',
      thumbnail: 'https://img.youtube.com/vi/6V_66oiln00/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/6V_66oiln00?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['ClickHouse Cloud']
    },
    {
      slug: 'self-serve-analytics-on-petabytes-of-data-microsoft',
      title:
        "Fast Interactive Self-Serve Analytics on Petabytes of Data - Microsoft's Journey with ClickHouse",
      subTitle:
        'Sathish Manivannan\nSenior Director Data & Analytics\n\nLin Tang\nPrincipal Software Engineering Manager',
      description:
        'This presentation on ClickHouse Power Data Analytics Solutions in WebXT.',
      thumbnail: 'https://img.youtube.com/vi/r1ZqjU8ZbNs/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/r1ZqjU8ZbNs?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'disney-plus-clickhouse',
      title: "Disney+ClickHouse, Disney's Flexible ELT Pipelines in ClickHouse",
      subTitle: 'Roni Lazimi\nSoftware Engineer, Disney+',
      description:
        'This talk was given at the ClickHouse Community Meetup in Manhattan on December 6, 2022.',
      thumbnail: 'https://img.youtube.com/vi/CVVp6N8Xeoc/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/CVVp6N8Xeoc?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'microsoft-clarity-and-clickhouse',
      title: 'Microsoft Clarity and ClickHouse',
      subTitle: 'Narendra Rana\nPrincipal Data Scientist',
      description:
        'Democratizing data and analytics for Bing, MSN, Edge & More\n\nThis presentation on ClickHouse Power Data Analytics Solutions in WebXT @ Microsoft',
      thumbnail: 'https://img.youtube.com/vi/rUVZlquVGw0/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/rUVZlquVGw0?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'building-the-future-of-reporting-at-rokt',
      title: 'Building the future of reporting at Rokt',
      subTitle: 'Vadim Semenov\nRokt',
      description:
        'This talk was given at the ClickHouse Community Meetup in Manhattan on December 6, 2022',
      thumbnail: 'https://img.youtube.com/vi/BEP07Edor-0/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/BEP07Edor-0?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'serving-5m-analytics-queries-a-month-with-clickhouse',
      title: 'Serving 5m analytics queries a month, with ClickHouse',
      subTitle: 'Tim Glaser\nCo-founder & CTO, Posthog',
      description:
        'This presentation was given at the ClickHouse community meeutp in London.',
      thumbnail: 'https://img.youtube.com/vi/9VKfiz-MzvQ/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/9VKfiz-MzvQ?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'building-user-facing-and-internal-applications-with-clickhouse',
      title: 'Building user-facing and internal applications with ClickHouse',
      subTitle: 'Petr Janda\nSynq.io',
      description:
        'This presentation was given at the ClickHouse community meeutp in London.',
      thumbnail: 'https://img.youtube.com/vi/Q4xAJnv-UM0/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/Q4xAJnv-UM0?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },

    {
      slug: 'observability-with-clickhouse',
      title: 'Observability with ClickHouse',
      subTitle: 'Boris Tane\nBaselime.io',
      description:
        'A "behind the scenes" view into building an observability solution with ClickHouse. This presentation was given at the ClickHouse community meeutp in London.',
      thumbnail: 'https://img.youtube.com/vi/00gW8txIP5g/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/00gW8txIP5g?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },

    {
      slug: 'from-redshift-to-clickhouse',
      title: 'Our Journey from Redshift to ClickHouse Cloud',
      subTitle: 'Brooke McKim\nCo-founder and CTO, Vantage',
      description:
        'In this talk -- given at the ClickHouse NYC Meetup on April 26, 2023 -- Brooke McKim (Co-founder and CTO of Vantage) shares their journey from Redshift to ClickHouse Cloud.',
      thumbnail: 'https://img.youtube.com/vi/gBgXcHM_ldc/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/gBgXcHM_ldc?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories', 'ClickHouse Cloud']
    },

    {
      slug: 'clickhouse-journey-in-contentsquare',
      title: 'ClickHouse journey in Contentsquare',
      subTitle: 'Doron Hoffman & Guram Sigua\nContentsquare',
      description:
        'This talk was given at the ClickHouse Community Meetup in Tel Aviv on January 16, 2023.',
      thumbnail: 'https://img.youtube.com/vi/zvuCBAl2T0Q/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/zvuCBAl2T0Q?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },

    {
      slug: 'big-sensitive-data-warehouse-deutsche-bank-clickhouse',
      title:
        'Big Sensitive Data Warehouse in regulated environments on ClickHouse',
      subTitle: 'Pavel Yakunin\nDeutsche Bank',
      description:
        'This is a re-recording of a talk that was given at the ClickHouse Community Meetup in Berlin on 5 December 5, 2022',
      thumbnail: 'https://img.youtube.com/vi/O3GJ6jag3Hc/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/O3GJ6jag3Hc?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },

    {
      slug: 'how-to-get-started-with-clickhouse',
      title: 'How to Get Started with ClickHouse',
      subTitle: 'Rich Raposa\nDirector, Global Learning, ClickHouse',
      description:
        'Download ClickHouse, run the server, connect to it using the client, create a table based on a file in S3, ingest that data into your table, and write some queries.',
      thumbnail: 'https://img.youtube.com/vi/6mmQUOmA-T0/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/6mmQUOmA-T0?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'how-primary-keys-work-in-clickhouse',
      title: 'How Primary Keys Work in ClickHouse',
      subTitle: 'Rich Raposa\nDirector, Global Learning, ClickHouse',
      description:
        "Primary keys in ClickHouse are not what you're used to in other DBMSs. Picking a good primary key for your MergeTree tables is critical in optimizing query performance, so it's important to understand how they work. We include an explanation of the primary index and granules.",
      thumbnail: 'https://img.youtube.com/vi/dnWqYjrlV1g/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/dnWqYjrlV1g?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'how-to-ingest-files-into-clickhouse',
      title: 'How to Ingest Files into ClickHouse',
      subTitle: 'Rich Raposa\nDirector, Global Learning, ClickHouse',
      description:
        'ClickHouse has a great collection of table functions for reading files from all types of different locations, including files on the web, S3, GCS and Azure Blob Storage. ClickHouse also reads data in dozens of different formats, like CSV, TSV, JSON, Parquet, Avro, and more. Learn how to combine these two capabilities to read a file from basically anywhere and in any format.',
      thumbnail: 'https://img.youtube.com/vi/vhrSxW15su4/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/vhrSxW15su4?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'how-common-table-engines-work-in-clickhouse',
      title: 'How Common Table Expressions (CTEs) Work in ClickHouse',
      subTitle: 'Rich Raposa\nDirector, Global Learning, ClickHouse',
      description:
        'Learn how to use common table expressions (CTEs) in ClickHouse, including how to use a query result as a CTE.',
      thumbnail: 'https://img.youtube.com/vi/DZ5nPZpqVng/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/DZ5nPZpqVng?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'how-to-upsert-rows-into-clickhouse',
      title: 'How to Upsert Rows into ClickHouse',
      subTitle: 'Rich Raposa\nDirector, Global Learning, ClickHouse',
      description:
        "Yes - you can upsert a row in ClickHouse! It behaves differently than with other databases, so it's important to understand how upserts are implemented using the ReplacingMergeTree table engine, including tips on how to avoid using FINAL in a query.",
      thumbnail: 'https://img.youtube.com/vi/2ygBtU4gKFc/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/2ygBtU4gKFc?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'how-to-keep-a-running-total-in-clickhouse',
      title: 'How to Keep a Running Total in ClickHouse',
      subTitle: 'Rich Raposa\nDirector, Global Learning, ClickHouse',
      description:
        'ClickHouse has a handy table engine named SummingMergeTree that can be used to keep a running total of values grouped by whatever columns you want.',
      thumbnail: 'https://img.youtube.com/vi/5j4Gg8sJqCw/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/5j4Gg8sJqCw?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'how-to-use-query-parameters-in-clickhouse',
      title: 'How to Use Query Parameters in ClickHouse',
      subTitle: 'Rich Raposa\nDirector, Global Learning, ClickHouse',
      description:
        'Query parameters allow you to write generic queries that contain abstract placeholders instead of concrete identifiers. In this video, we discuss the details of how to define and use query parameters in ClickHouse.',
      thumbnail: 'https://img.youtube.com/vi/mAvE7ZKVja4/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/mAvE7ZKVja4?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'how-to-query-and-ingest-parquet-files-in-clickhouse',
      title: 'How to Query and Ingest Parquet Files with ClickHouse',
      subTitle: 'Rich Raposa\nDirector, Global Learning, ClickHouse',
      description:
        "Do you have Parquet files that you want to insert into a ClickHouse table? That's easy to do with ClickHouse, no matter where your Parquet files are stored.",
      thumbnail: 'https://img.youtube.com/vi/dvhPPGI_D6c/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/dvhPPGI_D6c?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'how-to-a-clickhouse-query-using-projections',
      title: 'How to Optimize a ClickHouse Query using Projections',
      subTitle: 'Rich Raposa\nDirector, Global Learning, ClickHouse',
      description:
        'Projections are a query-optimization feature of MergeTree tables in ClickHouse that store data in a different format than the defined sort order. Useful use cases include the ability to sort the data in a different order than the primary key, and also to pre-aggregate columns. One nice benefit of projections over materialized views is that a projection does not require a separate table, so users simply query the original table and ClickHouse decides at query time if a projection can improve the performance.',
      thumbnail: 'https://img.youtube.com/vi/BaQDPA9pi2U/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/BaQDPA9pi2U?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    }
  ]
}

export function getVideo(slug: string): Video | null {
  return getVideos().find((video) => video.slug === slug) || null
}

export function getCategories(): Map<string, VideoCategory> {
  const categories = new Map()

  getVideos()
    .flatMap((video) => video.categories)
    .forEach((category) => {
      categories.set(slugify(category), category)
    })

  return categories
}

export function getCategory(slug: string): VideoCategory | null {
  return getCategories().get(slug) || null
}

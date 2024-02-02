import { Video, VideoCategory } from './types'
import { slugify } from '../utils/strings'

export function getVideos(): Video[] {
  return [
    {
      slug: 'querying-archive-files-with-clickhouse',
      title: 'Querying archive files with ClickHouse',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        'In this video, we’ll learn how to query archive files directly using ClickHouse. We’ll start by learning about the ‘One’ input format that returns a list of files that match a glob expression on a ZIP file. We then show how to describe and ingest different CSV files into ClickHouse, before joining the datasets together. And along the way we learn how to deal with inconsistencies in the CSV data.',
      thumbnail: 'https://img.youtube.com/vi/CiKfRMAhs3M/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/CiKfRMAhs3M?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'lyft-user-story',
      title: 'ClickHouse & Lyft',
      subTitle: 'Ritesh Varyani\nSenior Software Engineer, Lyft',
      description:
        '"ClickHouse has been great for us. It has solved all the use cases we have thrown at it"',
      thumbnail: 'https://img.youtube.com/vi/xKN9FoQYqWo/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/xKN9FoQYqWo?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'clearbit-user-story',
      title: 'ClickHouse & Clearbit',
      subTitle: 'Harlow Ward\nCo-founder and CTO, Clearbit',
      description:
        '"There is that feeling of new tech where everything just feels like it\'s going right."',
      thumbnail: 'https://img.youtube.com/vi/oygw8bAvhAY/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/oygw8bAvhAY?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'vantage-user-story',
      title: 'ClickHouse & Vantage',
      subTitle: 'Brooke McKim\nCo-founder and CTO, Vantage',
      description:
        '"By moving over to ClickHouse we were basically able to cut that (Redshift) bill in half."',
      thumbnail: 'https://img.youtube.com/vi/V14L4NlqSY8/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/V14L4NlqSY8?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'statsig-user-story',
      title: 'ClickHouse & Statsig',
      subTitle: 'Jason Wang\nSoftware Engineer, Statsig',
      description:
        '"We wanted something not only just simple to use, but also simple to manage."',
      thumbnail: 'https://img.youtube.com/vi/LlSovwS_oQg/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/LlSovwS_oQg?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'importing-numpy-array-files-into-clickhouse',
      title: 'Importing Numpy array files into ClickHouse',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "In this video, we'll learn how to import Numpy array files into ClickHouse. We'll be using the LAION multi modal dataset, which provides Numpy files for text and image embeddings, as well as metadata in Parquet format. We'll join the data from these files together using the recently added PASTE JOIN.",
      thumbnail: 'https://img.youtube.com/vi/_7mpIeig8Hw/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/_7mpIeig8Hw?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'what-if-energy-cost-analysis-with-streamlit-and-clickhouse',
      title: 'What-If energy cost analysis with Streamlit and Clickhouse',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "In this video, we'll learn how to build an interactive Streamlit application using chdb to analyze household energy usage data. We'll generate plot.ly charts showing the cost of energy usage over the last year, as well as doing what-if analysis to compare energy costs across timeframes and tariffs.",
      thumbnail: 'https://img.youtube.com/vi/2Tra0DU1tfM/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/2Tra0DU1tfM?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'fast-answers-in-cancer-research',
      title: 'Fast Answers in Cancer Research',
      subTitle: 'Aaron Lisman\nMemorial Sloan Kettering',
      description:
        'This presentation was given at the ClickHouse Community Meetup in NYC on 12 December, 2023. - https://www.meetup.com/clickhouse-new-york-user-group/events/296488779/',
      thumbnail: 'https://img.youtube.com/vi/y32-WWZrppQ/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/y32-WWZrppQ?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'optimizing-data-orchestration-for-analytics-platforms',
      title:
        'Optimizing Data Orchestration for Analytics Platforms Connecting to ClickHouse',
      subTitle: 'Gary Lin\nExplo',
      description:
        'This presentation was given at the ClickHouse Community Meetup in NYC on 12 December, 2023. - https://www.meetup.com/clickhouse-new-york-user-group/events/296488779/',
      thumbnail: 'https://img.youtube.com/vi/ti26ag10hq4/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/ti26ag10hq4?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'how-building-llm-prompt-sdk-led-us-to-typesafe-clickhouse-queries',
      title:
        'How building an LLM prompt SDK led us to typesafe ClickHouse queries',
      subTitle: 'Nicole White\nAutoblocks',
      description:
        'This presentation was given at the ClickHouse Community Meetup in NYC on 12 December, 2023. - https://www.meetup.com/clickhouse-new-york-user-group/events/296488779/',
      thumbnail: 'https://img.youtube.com/vi/G60wENTfW2o/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/G60wENTfW2o?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'extending-an-observability-platform-for-200b-logs',
      title: 'Extending an Observability Platform for 200B Logs',
      subTitle: 'Angelo Saraceno\nRailway',
      description:
        'This presentation was given at the ClickHouse Community Meetup in NYC on 12 December, 2023. - https://www.meetup.com/clickhouse-new-york-user-group/events/296488779/',
      thumbnail: 'https://img.youtube.com/vi/r6exhJkJcbw/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/r6exhJkJcbw?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'funnel-analytics-and-distributed-queries-in-clickhouse',
      title: 'Funnel Analytics and Distributed Queries in ClickHouse',
      subTitle: 'Degena Woldemariam\nKlaviyo',
      description:
        'This presentation was given at the ClickHouse Community Meetup in Boston on 11 December, 2023. - https://www.meetup.com/clickhouse-boston-user-group/events/296488840/',
      thumbnail: 'https://img.youtube.com/vi/4gQz4324e2I/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/4gQz4324e2I?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'learning-databases-and-learning-languages',
      title: 'Learning Databases and Learning Languages',
      subTitle: 'Tyler Hannan\nSenior Director, Developer Advocacy, ClickHouse',
      description:
        'This presentation was given at the ClickHouse Community Meetup in Boston on 11 December, 2023. - https://www.meetup.com/clickhouse-boston-user-group/events/296488840/',
      thumbnail: 'https://img.youtube.com/vi/ZICoTYUPFq4/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/ZICoTYUPFq4?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['ClickHouse']
    },
    {
      slug: 'scaling-graphite-with-clickhouse',
      title: 'Scaling Graphite with ClickHouse',
      subTitle: 'Josh Bradley\nFastly',
      description:
        'This presentation was given at the ClickHouse Community Meetup in Boston on 11 December, 2023. - https://www.meetup.com/clickhouse-boston-user-group/events/296488840/',
      thumbnail: 'https://img.youtube.com/vi/n3vAheF81hI/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/n3vAheF81hI?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'scaling-the-data-integration-mountain',
      title: 'Scaling the Data Integration Mountain: Tools, Tricks, and Tales',
      subTitle: 'Alex Simoes\nDatawheel',
      description:
        'This presentation was given at the ClickHouse Community Meetup in Boston on 11 December, 2023. - https://www.meetup.com/clickhouse-boston-user-group/events/296488840/',
      thumbnail: 'https://img.youtube.com/vi/phe8tADsil0/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/phe8tADsil0?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
    },
    {
      slug: 'clickhouse-overview',
      title: 'ClickHouse Overview - Alexey Milovidov interview with CSDN',
      subTitle: 'Alexey Milovidov\nCTO, ClickHouse',
      description:
        'Alexey Milovidov, our CTO, shares the story of ClickHouse in greater detail.',
      thumbnail: 'https://img.youtube.com/vi/OrqzWhz3yts/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/OrqzWhz3yts?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['ClickHouse']
    },
    {
      slug: 'bringing-open-source-and-cloud-together',
      title: 'ClickHouse: Bringing Open Source and Cloud Together',
      subTitle: 'Yury Izrailevsky\nPresident, Product & Technology, ClickHouse',
      description:
        'Our own Yury Izrailevsky (President, Product & Technology) shares the vision of ClickHouse and bringing Open Source and Cloud together in this meetup talk recorded in Beijing.',
      thumbnail: 'https://img.youtube.com/vi/g7LWpIEu678/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/g7LWpIEu678?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['ClickHouse']
    },
    {
      slug: 'transforming-log-data-with-clickhouse-materialized-views',
      title: 'Transforming log data with ClickHouse materialized views',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "In this video, we'll learn how to transform log entries using ClickHouse materialized views. We start with a bunch of log files in S3 and then show how to pull out the individual components using a regular expression and store them in a MergeTree table. We conclude by seeing that our solution can also handle any new files added to the S3 bucket.",
      thumbnail: 'https://img.youtube.com/vi/JLk-pcWZSGc/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/JLk-pcWZSGc?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'funnel-analysis-with-clickhouse',
      title: 'Funnel Analysis with ClickHouse',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "In this video, we'll learn about conducting funnel analysis using ClickHouse. With the help of a UK weather dataset, we'll explore the UK's changeable weather, searching for the number of times that different combinations of weather conditions have happened over the last few years.",
      thumbnail: 'https://img.youtube.com/vi/2RlODumivgk/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/2RlODumivgk?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'working-with-arrays-in-clickhouse',
      title: 'Working with Arrays in ClickHouse',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "In this video, we'll learn all about working with arrays in ClickHouse. Starting with an overview of the array functions documentation, we dive into practical examples using a weather measurements dataset. Key topics include querying, grouping, and manipulating arrays to extract valuable insights like maximum and minimum temperatures, weather conditions, and more. The functions covered in this video include array_slice, array_max, array_min, array_filter, array_join, array_flatten, array_compact, and array_distinct.",
      thumbnail: 'https://img.youtube.com/vi/JKHAdCFtYDg/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/JKHAdCFtYDg?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'loading-s3-data-into-clickhouse',
      title: 'Continuously loading S3 data into ClickHouse',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "In this video, we'll learn how to continuously load data into ClickHouse from AWS S3, using the S3Queue table engine. We start by exploring the config required on the serve to enable this functionality, before examining the S3 bucket that we're going to load into ClickHouse. We walk through the two modes of ingestion that we can use and adjust the flush frequency so that data is available in ClickHouse quicker. Finally, we use shadowtraffic.io to generate some more data and stream it into our S3 bucket, before checking that it's made its way into ClickHouse.",
      thumbnail: 'https://img.youtube.com/vi/lnbWFjfZxZ4/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/lnbWFjfZxZ4?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'exploring-parquet-metadata-with-clickhouse',
      title: 'Exploring Parquet Metadata with ClickHouse',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "In this video, we'll learn how to query the metadata of Parquet files using ClickHouse. The video demonstrates how to access and manipulate a dataset named Diffusion DB from Hugging Face, containing metadata for 14 million images generated by the Stable Diffusion AI tool. We'll look at various metadata details like row groups, column data, compressed and uncompressed sizes, and much more. We'll also look at how to use 'array join' and 'untuple' to manipulate and interpret the data more effectively.",
      thumbnail: 'https://img.youtube.com/vi/HzVCdUnlHqg/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/HzVCdUnlHqg?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'ingesting-data-from-redpanda-into-clickhouse',
      title: 'Ingesting data from Redpanda into ClickHouse',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "In this video, we'll learn how to ingest data from RedPanda into Clickhouse using Clickhouse's Kafka engine. The tutorial guides viewers through setting up a RedPanda streaming data platform, creating a topic for wiki events, and using the rpk and kcat tools to administer and ingest data into Redpanda. We also learn how to setup ClickHouse to ingest streaming data and run a couple of queries to identify frequent updaters and differentiate between bots and humans.",
      thumbnail: 'https://img.youtube.com/vi/1O27sis1nLE/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/1O27sis1nLE?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'the-case-for-a-real-time-data-warehouse',
      title: "One Size Can't Fit All - The Case for a Real-Time Data Warehouse",
      subTitle: 'Tanya Bragin\nVP Product, ClickHouse',
      description:
        'We owe a lot to the cloud data warehouses, but their era of hegemony is coming to an end. The cloud data warehouses accomplished what many considered impossible: shifting huge analytical workloads from proprietary mainframe-like self-managed solutions to the cloud. This evolution ultimately resulted in a close examination of how warehoused data could be used to build increasingly interactive data-driven applications and led to an increasing trend to unbundle the cloud data warehouse, now deployed in a more open and interconnected environment.',
      thumbnail: 'https://img.youtube.com/vi/8cIKXnSHNRU/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/8cIKXnSHNRU?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['ClickHouse']
    },
    {
      slug: 'querying-remote-parquet-files-with-clickhouse',
      title: 'Querying remote Parquet files with ClickHouse',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "In this video, we'll learn how to query remote Parquet files using ClickHouse with a focus on a Hugging Face dataset called Mid-Journey Messages. This dataset contains metadata about images generated by the Mid-Journey GenAI image service, stored in Parquet files. We will explore setting up parameters in the ClickHouse local CLI, handling redirects, and will learn how ClickHouse uses HTTP range headers for efficient data querying.",
      thumbnail: 'https://img.youtube.com/vi/nnvtLLFy8fc/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/nnvtLLFy8fc?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'downsampling-time-series-data-with-plot-ly-and-ClickHouse',
      title: 'Downsampling time series data with Plot.ly and ClickHouse',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "ClickHouse recently added support for the Largest Triangle Three Buckets (LTTB) algorithm, a powerful technique for downsampling time series data. And in this video, we'll learn how to use it with help from the SF Bay Area bike share dataset from Kaggle. Once we've imported the data, we'll learn how to visualise the number of free docks in Plot.ly for one of the bike stations using raw data, downsampling using the average function, and finally the Largest Triangle Three Buckets algorithm.",
      thumbnail: 'https://img.youtube.com/vi/wMhVb3sl6yQ/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/wMhVb3sl6yQ?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'sql-dynamic-column-selection-in-clickhouse',
      title: 'SQL Dynamic Column Selection in ClickHouse',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "In this video, we'll learn about dynamic column selection in SQL with ClickHouse, using the New York taxi dataset. We’ll learn how to use the COLUMNS clause to return columns by regex, before showing how to apply functions to aggregate data and format results. We'll also learn how to modify the values of columns, as well as excluding fields that we don't want.",
      thumbnail: 'https://img.youtube.com/vi/moabRqqHNo4/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/moabRqqHNo4?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'working-with-materialized-views',
      title: 'An intro to Materialized Views in ClickHouse',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "In this video, we explore materialized views in ClickHouse using a dataset of PyPI download events. Materialized views in ClickHouse don't store data themselves but perform transformations on data as it is inserted. We illustrate this process using the PyPI dataset, showing how it can efficiently aggregate daily download counts per project.",
      thumbnail: 'https://img.youtube.com/vi/QUigKP7iy7Y/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/QUigKP7iy7Y?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'querying-pandas-with-clickhouse',
      title: 'Querying Pandas with ClickHouse',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "In this video, we'll learn how to query Pandas DataFrames using chdb, a Python library powered by ClickHouse. With help from Canadian house prices and cities datasets, we'll learn how to query individual DataFrames, how to join them together, and how to generate a new DataFrame from the results.",
      thumbnail: 'https://img.youtube.com/vi/udlfgc5eVTY/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/udlfgc5eVTY?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'authenticating-in-clickhouse-with-an-ssh-key',
      title: 'Authenticating in ClickHouse with an SSH Key',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "In this video, we're looking at how to connect to Clickhouse using SSH keys, a feature introduced in Clickhouse 23.9. We'll walk through user setup, SSH key generation, and discuss the benefits of this method. We'll also touch on using config files for easier access.",
      thumbnail: 'https://img.youtube.com/vi/Rhe-kUyrFUE/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/Rhe-kUyrFUE?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'greatest-common-denominator-codec-clickhouse-23-9',
      title: 'Greatest Common Denominator Codec in ClickHouse 23.9',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "In this video, we'll explore the GCD (Greatest Common Denominator) codec in Clickhouse 23.9, a feature that works well for optimizing storage of large numbers that change in big increments. We'll ingest a Forex dataset and see the difference when storing data with and without this codec.",
      thumbnail: 'https://img.youtube.com/vi/vaY5LQ7a_Dk/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/vaY5LQ7a_Dk?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'processing-json-in-clickhouse',
      title: 'Processing JSON in ClickHouse',
      subTitle: 'Mark Needham\nPrincipal Product Marketing Manager, ClickHouse',
      description:
        "In this video, we'll learn about the JSON inference feature that was added in ClickHouse 23.9, with help from a PyPI dataset. The video covers how to download and inspect the dataset, compares the inference capabilities between ClickHouse 23.8 and 23.9, and demonstrates creating and querying a table. The new version eliminates the need for manual schema definition, making the process more efficient and user-friendly.",
      thumbnail: 'https://img.youtube.com/vi/gCg5ISOujtc/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/gCg5ISOujtc?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
    },
    {
      slug: 'managing-clickhouse-dictionaries-at-cloudflare',
      title: 'Managing ClickHouse Dictionaries at Cloudflare',
      subTitle: 'James Morrison\nSystems Engineer, Cloudflare',
      description:
        'James Morrison of Cloudflare discusses managing ClickHouse dictionaries at scale. He traces its history at Cloudflare and details how these essential tools for data queries have evolved in size and source.',
      thumbnail: 'https://img.youtube.com/vi/0A8nTASRERo/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/0A8nTASRERo?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User stories']
    },
    {
      slug: 'switching-from-elasticsearch-to-clickhouse',
      title:
        'Stream pipeline monitoring: Switching from Elasticsearch to ClickHouse',
      subTitle: 'Ricky Thomas\nCo-founder & CTO, Streamkap',
      description:
        'Ricky Thomas of Streamkap highlighted their shift from Elasticsearch to ClickHouse for real-time metrics in their streaming CDC pipelines. He also introduced ClickHouse as a new supported destination.',
      thumbnail: 'https://img.youtube.com/vi/WFF6hhQU3VQ/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/WFF6hhQU3VQ?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User stories']
    },
    {
      slug: 'building-real-time-applications-with-clickhouse',
      title:
        'Building Real-time Applications with ClickHouse Materialized Views',
      subTitle:
        'Dale McDiarmid\nPrincipal Product Marketing Engineer, ClickHouse',
      description:
        "Dale McDiarmid from ClickHouse explored the concept of building real-time applications using materialized views. Emphasizing ClickHouse's strength in handling fast queries across billions of rows, he explained how materialized views can be used to summarize data, significantly enhancing query performance.",
      thumbnail: 'https://img.youtube.com/vi/j_kKKX1bguw/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/j_kKKX1bguw?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to', 'Materialized Views']
    },
    {
      slug: 'clickpipes-demo',
      title:
        'ClickPipes for Kafka - ClickHouse Cloud Managed Ingestion Service',
      subTitle: 'Dale McDiarmid & Ryadh Dahimene\nClickHouse',
      description:
        'ClickPipes is a managed integration platform for ClickHouse Cloud that makes ingesting data from a diverse set of sources as simple as clicking a few buttons. Designed for the most demanding workloads, ClickPipes’s robust and scalable architecture ensures consistent performance and reliability.',
      thumbnail: 'https://img.youtube.com/vi/rSUHqyqdRuk/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/rSUHqyqdRuk?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['ClickHouse Cloud', 'ClickPipes']
    },

    {
      slug: 'vantage',
      title: 'Vantage Cuts Costs 50%: Redshift to ClickHouse Cloud Migration',
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
      title:
        "10x Cost Reduction: Clearbit's Postgres to ClickHouse Cloud Migration",
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
      title:
        "Managing Billions of events: Statsig's Switch from Druid to ClickHouse Cloud",
      subTitle: 'Jason Wang\nSoftware Engineer, Statsig',
      description:
        'Statsig is an experimentation and A/B testing company, handling millions of events every second and billions daily. Jason shares why they landed on ClickHouse Cloud for their real-time analytics.',
      thumbnail: 'https://img.youtube.com/vi/6V_66oiln00/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/6V_66oiln00?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['ClickHouse Cloud']
    },
    {
      slug: 'rebuilding-segmentation-with-clickhouse',
      title: 'Rebuilding Segmentation with ClickHouse',
      subTitle: 'Patrick McGrath\nKlaviyo',
      description:
        'This presentation was given at the ClickHouse summer meetup in Boston on  18 July https://www.meetup.com/clickhouse-boston-user-group/events/293913596/',
      thumbnail: 'https://img.youtube.com/vi/a9nHW93Ehi8/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/a9nHW93Ehi8?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['User Stories']
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
      slug: 'how-to-compute-running-aggregation-in-clickhouse',
      title: 'How to Compute a Running Aggregation in ClickHouse',
      subTitle: 'Rich Raposa\nDirector, Global Learning, ClickHouse',
      description:
        "Using aggregate functions in a materialized view in ClickHouse can lead to surprising results if you don't define them properly. The AggregatingMergeTree table engine requires special column types for representing and storing intermediate (running) totals of aggregations like avg, max, min, uniq, count, and all the other aggregate functions in ClickHouse.",
      thumbnail: 'https://img.youtube.com/vi/-Ma2ohy_6lM/maxresdefault.jpg',
      embed:
        '<iframe src="https://www.youtube-nocookie.com/embed/-Ma2ohy_6lM?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>',
      categories: ['How to']
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

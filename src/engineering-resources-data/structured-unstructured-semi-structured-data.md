---
title: 'Structured, unstructured, and semi-structured data'
slug: 'structured-unstructured-semi-structured-data'
excerpt: 'In this guide, we explore the three main forms of data: structured data with rigid schemas like database tables, unstructured data like text and images with no predefined format, and semi-structured data like JSON that combines elements of both while maintaining flexibility.'
index: 9
lastUpdated: '2025-04-11'
---

Data comes in different forms, each requiring different approaches for storage and analysis. This guide explores the three main types of data: structured, unstructured, and semi-structured.

We'll examine their characteristics, see practical examples of each type, and see how modern data systems like ClickHouse handle them.

## Structured data

Structured data represents information organized in its most rigid and predictable form. It follows a pre-defined schema where every record conforms to the same format, with a fixed set of columns and clear data types for each field. While individual records may contain null values, the overall structure remains consistent across all entries, making it highly organized and easily queryable. This data type typically resides in relational databases, where table schemas must be defined before data can be inserted.

The choice of database system often depends on the intended workload. Online Transaction Processing (OLTP) systems, which handle day-to-day transactions and require rapid processing of many small operations, frequently use databases like PostgreSQL.

In contrast, Online Analytical Processing (OLAP) systems, designed for complex queries and analysis of large datasets, employ [column databases](https://clickhouse.com/engineering-resources/what-is-columnar-database) like ClickHouse.

➡️ For more on OLAP and OLTP, see the [OLTP vs OLAP guide](https://clickhouse.com/engineering-resources/oltp-vs-olap).

We can use [Change Data Capture](https://en.wikipedia.org/wiki/Change_data_capture) (CDC) to synchronize data between these systems, ensuring analytical databases remain current while not impacting operational performance.

Beyond traditional databases, structured data has evolved to embrace modern storage needs. Open data formats like [Apache Parquet](https://clickhouse.com/engineering-resources/avro-vs-parquet#what-is-parquet) have become efficient solutions for storing structured data, particularly in big data environments. These formats optimize for analytical workloads by organizing data in columns rather than rows, enabling faster query performance and better compression.

Open table formats Apache Iceberg, Delta Lake, or Apache Hudi are becoming increasingly popular. These table formats manage collections of Parquet files and provide additional functionality, like ACID transactions, time travel (accessing historical versions), and the ability to efficiently handle updates and deletes across large datasets.

### Examples of structured data

Structured data appears in many everyday business operations and systems. Financial transactions form a perfect example, where each record must contain specific fields like transaction date, amount, account numbers, and transaction type. Customer records in a CRM system represent another typical case, with fixed fields for contact information and customer status. Product inventory systems track SKUs, names, prices, and stock levels, while employee records maintain consistent fields for IDs, names, departments, and salaries. Sales data, website user registrations, sensor readings, and point-of-sale transactions represent classic examples of structured data where every record follows the same precise format.

Let's look at a sample sales data table to illustrate how structured data maintains consistent columns across all records.

| sale_date  | product_id | product_name        | quantity | unit_price | total_amount |
| ---------- | ---------- | ------------------- | -------- | ---------- | ------------ |
| 2024-01-15 | P001       | Gaming Monitor      | 2        | 299.99     | 599.98       |
| 2024-01-15 | P002       | Wireless Mouse      | 5        | 49.99      | 249.95       |
| 2024-01-16 | P001       | Gaming Monitor      | 1        | 299.99     | 299.99       |
| 2024-01-16 | P003       | Mechanical Keyboard | 3        | 129.99     | 389.97       |
| 2024-01-17 | P002       | Wireless Mouse      | 4        | 49.99      | 199.96       |

In this example, every record follows the same structure with identical columns, making it easy to calculate total sales for each product, find the most popular items by quantity, analyze sales trends by date, and compare unit prices across products. The predictable nature of structured data makes it ideal for business operations that demand precise record-keeping and fast analysis.

## Unstructured data

Unstructured data is information that doesn't follow a predefined data model or schema. It comes in various formats and cannot be easily organized in traditional databases. Unlike structured data, which fits neatly into rows and columns, unstructured data comes in various formats and cannot be easily organized in traditional databases.

It's estimated that [approximately 90% of all data generated today falls into this category](https://blog.box.com/90-your-data-unstructured-and-its-full-untapped-value), making it a crucial consideration for modern data management.

### Examples of unstructured data

Unstructured data sources are diverse and growing rapidly in our increasingly digital world.

Human-generated unstructured data includes everyday communications like emails, text documents, and social media posts. These contain natural language text, often with informal writing styles, emoticons, and context-dependent meanings. Other forms include phone recordings, which capture voice conversations, text messages with their unique shorthand, and documents ranging from formal reports to casual notes.

Machine-generated unstructured data presents its own set of challenges and opportunities. CCTV systems continuously generate video footage, while satellites produce vast amounts of imagery data used in everything from weather forecasting to urban planning. IoT devices and sensors contribute to this data deluge, generating continuous streams of readings and measurements. System log files, while somewhat structured in format, often contain unstructured text within their entries, making them a hybrid case that requires specialized processing.

### Working with unstructured data

Unstructured data requires specialized processing to extract meaningful insights. While it doesn't naturally fit into traditional organizational schemes, modern techniques help us discover patterns and derive value from various content forms- text, images, audio, or other media types. The approach varies significantly depending on the data type, with each requiring its specialized tools and techniques.

Text processing represents one of the most common and well-developed areas of unstructured data analysis. Modern systems begin with basic full-text search and indexing, making content discoverable, but quickly move into more sophisticated territory with Natural Language Processing (NLP). Through NLP, organizations can automatically understand the context and meaning within their text data, identifying everything from key entities like people and organizations to the emotional tone of customer feedback. The development of [text embeddings](https://clickhouse.com/blog/vector-search-clickhouse-p1) has revolutionized this field, converting written content into numerical vectors that capture semantic meaning, enabling computers to understand relationships between concepts rather than just matching keywords.

The emergence of generative AI and large language models has further transformed how we work with unstructured text data. These models can understand and analyze text and generate human-like responses, summarize lengthy documents, translate between languages, and even assist in content creation. This capability has opened new possibilities for automated customer service, content moderation, and document analysis while also providing powerful tools for extracting structured information from unstructured text through techniques like zero-shot and few-shot learning. Organizations can now automatically generate metadata, create taxonomies, and classify content with unprecedented accuracy and scale.

Visual and audio data present their unique processing challenges and opportunities. For images, modern AI approaches like [OpenAI's CLIP algorithm](https://openai.com/index/clip/) create embeddings that enable both image-to-image and text-to-image searching, effectively bridging the gap between visual and textual content. Image processing can also extract text through Optical Character Recognition (OCR), turning screenshots, scanned documents, and photos containing text into searchable content.

Audio processing has similarly evolved, with models like [OpenAI's Whisper](https://openai.com/index/whisper/) converting speech to text with remarkable accuracy. This transcription can be enhanced with speaker diarization to identify who's speaking when in conversations. Voice analysis can detect emotional states and sentiment, particularly valuable for applications like call center analytics. Once converted to text, this audio content becomes amenable to all the text processing techniques described above, creating a rich set of structured data from initially unstructured sources.

## Semi-structured data

Having explored both structured and unstructured data, semi-structured data represents a flexible middle ground between these extremes. While it maintains some organizational elements, it offers more flexibility than rigidly structured formats while providing more organization than entirely unstructured data.

Semi-structured data is characterized by its variable nature. Unlike structured data, where every record must conform to a fixed schema, semi-structured data allows for variation between records. Some records might contain fields others lack, and data can be nested at multiple levels. This flexibility makes it particularly well-suited for real-world scenarios where data doesn't always fit into neat, predefined categories.

JSON and Avro have emerged as the dominant formats for semi-structured data, particularly in modern web applications and APIs. These formats allow for complex hierarchical structures while maintaining human readability. For example, a customer record in JSON might include detailed purchase history for some customers, social media preferences for others, and varying levels of contact information \- all within the same dataset.

Application logging demonstrates that the boundaries between data types aren't always clear-cut. Some systems implement [structured logging](https://clickhouse.com/engineering-resources/structured-logging), producing semi-structured output in JSON format with consistent fields like timestamp and severity level but variable message content and metadata. Other logging systems might generate plain text that follows an implicit structure but requires parsing to extract meaningful fields. This highlights how the same data type can exist in different forms depending on implementation choices.

Modern database systems have [evolved to handle semi-structured data more efficiently](https://clickhouse.com/engineering-resources/json-database). ClickHouse, for example, has introduced [a native JSON data type](https://clickhouse.com/blog/a-new-powerful-json-data-type-for-clickhouse) that allows for querying semi-structured data with performance comparable to traditional structured data. This development reflects a broader trend in data management systems, which adapt to more flexible data formats while maintaining high performance.

### Examples of semi-structured data

Semi-structured data is commonly found in web applications, APIs, and modern data platforms. E-commerce product catalogs provide an excellent example, as different product categories require different attributes. With its varying content types and nested comments, social media data represents another common case. Event tracking data, IoT device readings, and application logs frequently use semi-structured formats to handle varying data requirements.

Here's an example of semi-structured product data in JSON format, showing how different products can have different attributes:

```
{"id": "P001", "name": "Gaming Monitor", "category": "Electronics", "price": 299.99, "specifications": {"screen_size": "27 inch", "resolution": "2560x1440", "refresh_rate": "165Hz", "panel_type": "IPS"}, "in_stock": true}

{"id": "P002", "name": "Cotton T-Shirt", "category": "Clothing", "price": 19.99, "available_sizes": ["S", "M", "L", "XL"], "colors": ["black", "white", "navy"], "material": "100% cotton"}

{"id": "P003", "name": "Coffee Beans", "category": "Food", "price": 14.99, "weight": "1kg", "origin": "Ethiopia", "roast_level": "Medium", "organic": true, "tasting_notes": ["chocolate", "berry", "citrus"]}
```

Notice how each product has some common fields (id, name, category, price) but also contains category-specific attributes. The electronics product has technical specifications, the clothing item has sizes and colors, and the food product has attributes like origin and tasting notes. This flexibility would be difficult to achieve with traditional structured data formats.

## Working with structured, unstructured, and semi-structured data in ClickHouse

ClickHouse can handle each data type described in this guide, though it's best known for its exceptional performance with structured data.

### ClickHouse and structured data

A typical workflow involves ingesting data from various sources \- often JSON or CSV files \- and extracting the relevant fields into strongly typed columns during ingestion. This approach enables high-performance analytical queries over structured data.

Let’s look at an example of structured data in the shape of the [Reddit comments dataset](https://clickhouse.com/docs/en/getting-started/example-datasets/reddit-comments). This dataset contains a variety of different fields, and we can store it in the following ClickHouse table:

```sql
CREATE TABLE reddit
(
   subreddit LowCardinality(String),
   subreddit_id LowCardinality(String),
   subreddit_type Enum(
    'public' = 1, 'restricted' = 2, 'user' = 3,
    'archived' = 4, 'gold_restricted' = 5, 'private' = 6
   ),
   author LowCardinality(String),
   body String CODEC(ZSTD(6)),
   created_date Date DEFAULT toDate(created_utc),
   created_utc DateTime,
   retrieved_on DateTime,
   id String,
   parent_id String,
   link_id String,
   score Int32,
   total_awards_received UInt16,
   controversiality UInt8,
   gilded UInt8,
   collapsed_because_crowd_control UInt8,
   collapsed_reason Enum(
     '' = 0, 'comment score below threshold' = 1, 'may be sensitive content' = 2,
     'potentially toxic' = 3, 'potentially toxic content' = 4
  ),
   distinguished Enum('' = 0, 'moderator' = 1, 'admin' = 2, 'special' = 3),
   removal_reason Enum('' = 0, 'legal' = 1),
   author_created_utc DateTime,
   author_fullname LowCardinality(String),
   author_patreon_flair UInt8,
   author_premium UInt8,
   can_gild UInt8,
   can_mod_post UInt8,
   collapsed UInt8,
   is_submitter UInt8,
   _edited String,
   locked UInt8,
   quarantined UInt8,
   no_follow UInt8,
   send_replies UInt8,
   stickied UInt8,
   author_flair_text LowCardinality(String)
)
ENGINE = MergeTree
ORDER BY (subreddit, created_date, author);
```

We can then run the following query to ingest the data:

```sql
INSERT INTO reddit
   SELECT *
   FROM s3(
       'https://clickhouse-public-datasets.s3.eu-central-1.amazonaws.com/reddit/original/RC_2017-12.xz',
       'JSONEachRow'
   );
```

And if we want to count the number of unique subreddits there were in December 2017, the following query will do the job:

```sql
SELECT uniqExact(subreddit)
FROM reddit;
```

```
┌─uniqExact(subreddit)─┐
│                91613 │
└──────────────────────┘

1 row in set. Elapsed: 1.572 sec. Processed 85.97 million rows, 367.43 MB (54.71 million rows/s., 233.80 MB/s.)
```

### ClickHouse and unstructured data

While ClickHouse is primarily designed for analytical workloads, it can be essential in managing unstructured data. Text content can be stored in String columns and, when combined with modern embedding techniques, can become part of an effective retrieval system.

For example, we recently created a [Hacker News/StackOverflow chatbot](https://clickhouse.com/blog/building-hackernews-stackoverflow-chatbot-with-llamaindex-and-clickhouse) and stored embeddings for each Hacker News record alongside the text content:

```sql
CREATE TABLE hackernews
(
    `id` String,
    `doc_id` String,
    `comment` String,
    `text` String,
    `vector` Array(Float32),
    `node_info` Tuple(start Nullable(UInt64), end Nullable(UInt64)),
    `metadata` String,
    `type` Enum8(
        'story' = 1, 'comment' = 2, 'poll' = 3, 'pollopt' = 4, 'job' = 5
    ),
    `by` LowCardinality(String),
    `time` DateTime,
    `title` String,
    `post_score` Int32,
    `dead` UInt8,
    `deleted` UInt8,
    `length` UInt32,
    `parent` UInt32,
    `kids` Array(UInt32)
)
ENGINE = MergeTree
ORDER BY (toDate(time), length, post_score);
```

We can then apply the same embedding algorithm to a user question and then query ClickHouse to find the most similar records.

### ClickHouse and semi-structured data

ClickHouse’s [native JSON data type](https://clickhouse.com/docs/en/sql-reference/data-types/newjson) provides an elegant solution for working with semi-structured data. This approach achieves high performance while maintaining the flexibility that makes semi-structured data valuable.

We can create the following table to ingest a dataset of the [activity on the BlueSky social network](https://clickhouse.com/blog/building-a-medallion-architecture-for-bluesky-json-data-with-clickhouse):

```sql
CREATE TABLE bluesky.bluesky
(
	`data` JSON(SKIP `commit.record.reply.root.record`, SKIP `commit.record.value.value`),
	`kind` LowCardinality(String),
	`bluesky_ts` DateTime64(6),
	`_rmt_partition_id` LowCardinality(String)
)
ENGINE = MergeTree
PARTITION BY toStartOfInterval(bluesky_ts, toIntervalMonth(1))
ORDER BY (kind, bluesky_ts);
```

We can then write the following query to compute the most common types of commit events:

```
SELECT data.commit.collection AS collection, count() AS c, uniq(data.did) AS users
FROM bluesky
WHERE kind = 'commit'
GROUP BY ALL
ORDER BY c DESC
LIMIT 10;
```

```
┌─collection───────────────┬─────────c─┬───users─┐
│ app.bsky.feed.like   	   │ 269979403 │ 5270604 │
│ app.bsky.graph.follow	   │ 150891706 │ 5631987 │
│ app.bsky.feed.post   	   │  46886207 │ 3083647 │
│ app.bsky.feed.repost 	   │  33249341 │ 1956986 │
│ app.bsky.graph.block 	   │   9789707 │  993578 │
│ app.bsky.graph.listitem  │   3231676 │  102020 │
│ app.bsky.actor.profile   │   1731669 │ 1280895 │
│ app.bsky.graph.listblock │	263667 │  105310 │
│ app.bsky.feed.threadgate │	215715 │   49871 │
│ app.bsky.feed.postgate   │ 	 99625 │   19960 │
└──────────────────────────┴───────────┴─────────┘

10 rows in set. Elapsed: 6.445 sec. Processed 516.53 million rows, 45.50 GB (80.15 million rows/s., 7.06 GB/s.)
Peak memory usage: 986.51 MiB.
```

## In summary

Data comes in three primary forms: structured, unstructured, and semi-structured. Structured data follows rigid schemas with predefined columns and data types, making it ideal for traditional business operations like sales transactions and inventory management. Unstructured data lacks predefined organization, encompassing everything from text documents to images and audio files. In contrast, semi-structured data offers a middle ground through formats like JSON, providing some organization while maintaining flexibility.

Modern data systems like ClickHouse have evolved to handle all three types effectively. They excel at processing structured data in columnar formats, can work with semi-structured data through native JSON support, and can store unstructured content while supporting modern retrieval techniques through vector embeddings. This versatility reflects the growing need to work effectively with all data types while maintaining high performance.

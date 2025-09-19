---
title: 'What is a JSON database?'
slug: 'json-database'
excerpt: "In this guide, we'll learn about JSON, the types of databases that can store JSON, and how to work with JSON data in ClickHouse."
index: 5
lastUpdated: '2025-04-11'
---

There isn’t really such a thing as a JSON (JavaScript Object Notation) database, but there are databases that are designed to work well with JSON data or have strong JSON support.

JSON is a text-based data interchange format that [has become the lingua franca of data exhaust](https://x.com/medriscoll/status/1831900730254582115) over the last decade \- APIs return JSON, it is used to represent the state in [single-page applications](https://clickhouse.com/blog/building-single-page-applications-with-clickhouse-and-http), and metrics or logs are often generated in this format.

## What is JSON?

[JSON](https://en.wikipedia.org/wiki/JSON) is a lightweight data-interchange format that is easy for humans to read and write and for machines to parse and generate. Initially specified by Douglas Crockford in the early 2000s, JSON, which derives its notation from JavaScript, quickly became popular as a language-independent format. By the late 2000s, it had become the de facto standard for transferring application state and facilitating client-server interactions.

JSON documents comprise key/value pairs, where the key is a string, and the value can be a string, an integer, a boolean, an array, or an object. An example of a JSON document representing an order on an e-commerce website is shown below:

```json
{
  "orderId": "ORD-12345",
  "orderDate": "2023-05-15T14:30:00Z",
  "customer": {
    "id": "CUST-789",
    "name": "Alice Johnson",
    "email": "alice.johnson@email.com"
  },
  "items": [
    {
      "productId": "BOOK-001",
      "title": "The Great Gatsby",
      "price": 12.99,
      "quantity": 1
    },
    {
      "productId": "BOOK-002",
      "title": "To Kill a Mockingbird",
      "price": 14.99,
      "quantity": 2
    }
  ],
  "totalAmount": 42.97,
  "status": "processing"
}
```

JSON documents don’t have a schema, which means we could have another document representing an order with slightly different fields. For example, perhaps we don’t have the customer's name, so the `customer.name` field would be missing.

JSON's semi-structured nature provides flexibility, making it easy to modify and extend data structures without altering existing records. It also supports rapid prototyping and agile development.

## JSON database examples

Now that we’ve learned about JSON, let’s explore how to store data in this format. Several different types of databases can store and retrieve data in JSON format. In this section, we’ll learn more about those.

### Document databases

Document databases like CouchDB and MongoDB emerged in the late 2000s/early 2010s. These databases store data in JSON-like documents, allowing for flexible, schema-less data modeling. Their main selling point was the ease with which users could store JSON and retrieve individual documents.

This made them a perfect fit for storing application state in interactive Javascript-heavy web pages, which became popular with the emergence of [jQuery](https://en.wikipedia.org/wiki/JQuery) and later [AngularJS](https://en.wikipedia.org/wiki/AngularJS) and [React](<https://en.wikipedia.org/wiki/React_(JavaScript_library)>). Social media websites like Twitter gained popularity around the same time and offered JSON APIs to access their data, which users would then store in their document database of choice.

Although MongoDB and CouchDB were the early contenders in this category, others include Couchbase, CosmosDB, and Firestore.

### Relational databases with JSON support

The two most popular open-source relational databases, PostgreSQL and MySQL, initially didn’t have JSON support, and it took them a while to catch up.

PostgreSQL added native support for JSON in [version 9.2](https://www.cloudbees.com/blog/unleash-the-power-of-storing-json-in-postgres), released in September 2012\. They went on to add support for indexes in a subsequent release. MySQL followed suit, adding its own JSON data type in [version 5.7.8](https://dev.mysql.com/doc/relnotes/mysql/5.7/en/news-5-7-8.html#mysqld-5-7-8-json), released in August 2015\.

These databases are still predominantly used for storing data in rows and columns and retrieving a single or small number of rows. The JSON type allows them to store semi-structured data, but they don’t have as many features for working with JSON as the document databases.

### Real-time analytics databases with JSON support

In the late 2010s and early 2020s, real-time analytics databases like Apache Druid, Apache Pinot, Rockset, and ClickHouse emerged. These databases use column-based storage and focus on optimizing large-scale analytics queries across billions of rows or more.

They all have functionality for extracting a schema from JSON documents, which works well if all the JSON documents have the same schema.

However, data is often semi-structured for common use cases like observability and logging, which means these databases also had to add support for a JSON data type.

When storing the data, they need to ensure that it’s stored in a way that allows nested JSON queries to be executed quickly—it’s not good enough to store the data as a String and push the work to query time.

## JSON in ClickHouse

ClickHouse added a JSON data type in version 22.6 in June 2022, but this [implementation had some limitations](https://github.com/ClickHouse/ClickHouse/issues/54864) and was replaced by [a new JSON data type](https://clickhouse.com/docs/en/sql-reference/data-types/newjson) in [version 24.8](https://clickhouse.com/blog/clickhouse-release-24-08) in August 2024\.

The new data type [addresses the following challenges](https://clickhouse.com/blog/a-new-powerful-json-data-type-for-clickhouse):

1. True column-oriented storage \- Implement a column-oriented storage system for JSON data to enable efficient compression and fast, vectorized operations.
2. Dynamically changing data without type unification \- Handle JSON paths with different data types without unifying them into a common type.
3. Prevention of an avalanche of column data files on disk \- Avoid creating excessive column files on disk for unique JSON paths.
4. Dense storage \- Store values of unique JSON paths in a dense, non-redundant way.

It’s an experimental feature at the moment, so you’ll need to enable the following flag to use it:

```sql
SET allow_experimental_json_type = 1;
```

Once you’ve done that, you can create a table with one or more fields of type `JSON`. We will import [a JSON file containing football/soccer events](https://raw.githubusercontent.com/statsbomb/open-data/refs/heads/master/data/events/15946.json) from the [StatsBomb open dataset](https://github.com/statsbomb/open-data/blob/master/data/events/15946.json). It only contains a few thousand events, but it’ll be enough to see how the JSON type works.

We’ll create the following table:

```sql
CREATE TABLE events
(
    matchId String,
    json JSON,
    possession_team_id String MATERIALIZED getSubcolumn(
      json, 'possession_team.id')
)
ENGINE = MergeTree
ORDER BY possession_team_id;
```

And then import the data:

```sql
INSERT INTO events
SELECT
    ‘15946’ AS matchId,
    json
FROM url(
  'https://raw.githubusercontent.com/statsbomb/open-data/refs/heads/master/data/events/15946.json',
  JSONAsObject
);
```

We can then write the following query to find the most common event types:

```sql
SELECT
    json.type.name,
    count()
FROM events
GROUP BY ALL
ORDER BY count() DESC
LIMIT 10;

┌─json.type.name─┬─count()─┐
│ Pass           │    1163 │
│ Ball Receipt*  │    1058 │
│ Carry          │     890 │
│ Pressure       │     212 │
│ Ball Recovery  │      89 │
│ Duel           │      53 │
│ Clearance      │      37 │
│ Goal Keeper    │      34 │
│ Block          │      32 │
│ Shot           │      28 │
└────────────────┴─────────┘
```

## Frequently asked questions

Let’s review some commonly asked questions about storing JSON in databases.

### What is the best database for JSON?

That depends on what you do with the JSON data once it’s in the database\! If you’re retrieving single documents, a database like MongoDB or Couchbase might be the best choice. If you’re running analytical queries over many JSON documents, ClickHouse might be a better choice.

### Is JSON SQL or NoSQL?

You can store JSON data in both NoSQL and SQL databases. Examples of NoSQL databases that can store JSON are MongoDB and Couchbase. Examples of SQL databases that can store JSON are PostgreSQL and ClickHouse.

### Can you query JSON with SQL?

Yes, ClickHouse lets you query JSON data with SQL For example, imagine that we have JSON documents like this:

```json
{
  "duration": 0,
  "id": "9f6e2ecf-6685-45df-a62e-c2db3090f6c1",
  "index": "1",
  "minute": "0",
  "period": "1",
  "play_pattern": { "id": "1", "name": "Regular Play" },
  "possession": "1",
  "possession_team": { "id": "217", "name": "Barcelona" },
  "second": "0",
  "tactics": { "formation": "442", "lineup": [] },
  "team": { "id": "217", "name": "Barcelona" },
  "timestamp": "00:00:00.000",
  "type": { "id": "35", "name": "Starting XI" }
}
```

We could store this data in a table, `events`, with the following schema:

```text
┌─name───────────────┬─type───┐
│ matchId            │ String │
│ json               │ JSON   │
│ possession_team_id │ String │
└────────────────────┴────────┘
```

We can then write the following query to find the most popular event types:

```sql
SELECT json.type.name, count() AS count
FROM events
GROUP BY ALL
ORDER BY count DESC
LIMIT 10;
```

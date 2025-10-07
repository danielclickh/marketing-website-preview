---
title: 'Build a dashboard in Python with ClickHouse and Streamlit'
slug: 'python-dashboard-streamlit'
excerpt: "In this guide, you'll learn how to build a Python dashboard using ClickHouse and Streamlit. We'll create a real-world example that visualizes Bluesky social media data, walking through everything from basic setup to interactive visualizations. Perfect for data scientists and analysts who want to share their insights through custom dashboards."
index: 10
lastUpdated: '2025-06-02'
---

Let's face it - if you're working with data, Python is probably your go-to language. It's got all the tools you need: Pandas for wrangling data, Polars for lightning-fast processing, NumPy for number crunching, and scikit-learn for when you want to get fancy with machine learning.

But here's the thing \- once you've done all that awesome analysis, you need a way to share it with others. And let's be honest, sending Jupyter notebooks around isn't exactly the most elegant solution. What you really need is a slick dashboard that people can actually use.

That's where Python dashboard frameworks come in. These days, you don't need front-end skills to create something impressive. [Low-code frameworks](https://clickhouse.com/engineering-resources/real-time-data-visualization#low-code-tools) like Gradio, Streamlit, Dash, and others have made it easy to turn your Python scripts into interactive dashboards or [data apps](https://clickhouse.com/engineering-resources/data-application) without breaking a sweat.

In this guide, we're going to build a dashboard using Python that combines ClickHouse's processing power with Streamlit's user-friendly interface. While there are tons of [great visualization libraries](http://clickhouse.com/engineering-resources/real-time-data-visualization#python-visualization-libraries) out there - like Matplotlib, Seaborn, Bokeh, and Altair - we'll be using plot.ly for our charts because it plays really nicely with Streamlit and gives us interactive visualizations right out of the box. Whether you're just starting with Python dashboarding or looking for fresh ideas, we'll walk through everything step by step, creating something that looks professional but doesn't require a computer science degree to build.

By the time we're done, you'll have your own custom dashboard.py that you can show off to your colleagues or use as a starting point for your next project.

To help whet your appetite, this is what we're going to build:

![Dashboard image 1](/images/engineering-resources/0_dashboard_full.png)

## Meet the data: Exploring Bluesky's social network

Now, every good dashboard needs interesting data to visualize. While you could import your own dataset, we're going to skip the data preparation headaches and jump straight into the fun part - building our dashboard. We'll be working with a fascinating real-world dataset from one of the newest players in social media: Bluesky.

If you haven't heard of it yet, Bluesky is like X (formerly Twitter), but with a twist - it's completely open-source and decentralized. What makes it particularly interesting for us data folks is that it provides free access to real-time events like posts and interactions. This means we can analyze actual social media data as it flows through the network.

We've already done the heavy lifting for you by taking data from Bluesky's [Jetstream API](https://docs.bsky.app/blog/jetstream) and loading it into the [ClickHouse SQL playground](https://clickhouse.com/blog/announcing-the-new-sql-playground). If you're curious about how we processed and structured this data, you can check out our detailed walkthrough in ['Building a Medallion architecture for Bluesky data with ClickHouse'](https://clickhouse.com/blog/building-a-medallion-architecture-for-bluesky-json-data-with-clickhouse).

Ready to dive in? First, let's get you set up with the data. You'll need to [download ClickHouse](https://clickhouse.com/docs/en/install) and connect to the playground:

<pre><code type='click-ui' language='bash'>
clickhouse client -m \
  -h sql-clickhouse.clickhouse.com \
  -u demo -d bluesky \
  --secure
</code></pre>

We can run the following command to get a list of tables:

<pre><code type='click-ui' language='sql'>
SHOW TABLES 
WHERE engine != 'MaterializedView';
</code></pre>

```
    ┌─name──────────────────────────────┐
 1. │ bluesky                           │
 2. │ bluesky_dedup                     │
 3. │ bluesky_dlq                       │
 4. │ bluesky_queue                     │
 5. │ bluesky_raw                       │
 6. │ bluesky_raw_v2                    │
 7. │ cid_to_text                       │
 8. │ displayName_per_user              │
 9. │ displayName_per_user_dict         │
10. │ events_per_hour_of_day            │
11. │ handle_per_user                   │
12. │ handle_per_user_dict              │
13. │ latest_partition                  │
14. │ likes_per_post                    │
15. │ likes_per_post_about_clickhouse   │
16. │ likes_per_user                    │
17. │ posts_per_language                │
18. │ reposts_per_post                  │
19. │ reposts_per_post_about_clickhouse │
20. │ reposts_per_user                  │
21. │ test_100                          │
22. │ test_100_2                        │
23. │ top_post_types                    │
    └───────────────────────────────────┘
```

The `bluesky` table contains all the messages, so let's write a query to return the total number of records:

<pre><code type='click-ui' language='sql'>
select count() AS messages
FROM bluesky;
</code></pre>

```text
   ┌───messages─┐
1. │ 1109828120 │ -- 1.11 billion
   └────────────┘
```

We're going to work with several of these tables throughout the rest of the article, so let's acquaint ourselves with the data.

<pre><code type='click-ui' language='sql'>
SELECT name, type
FROM system.columns
WHERE (database = 'bluesky') AND (`table` = 'bluesky')
FORMAT Vertical;
</code></pre>

```text
Row 1:
──────
name: data
type: JSON(max_dynamic_paths=100, SKIP `commit.record.reply.root.record`, SKIP `commit.record.value.value`)

Row 2:
──────
name: kind
type: LowCardinality(String)

Row 3:
──────
name: bluesky_ts
type: DateTime64(6)

Row 4:
──────
name: _rmt_partition_id
type: LowCardinality(String)
```

This table stores the raw JSON from the BlueSky API.
We can have a look at an individual record by running the following query:

<pre><code type='click-ui' language='sql'>
SELECT *
FROM bluesky
LIMIT 1
FORMAT Vertical
</code></pre>

```
Row 1:
──────
data:              {"account":{"active":true,"did":"did:plc:mlodkcskzk6q7off7pnys6c3","seq":"2182925349","time":"2024-12-23T14:00:02.518Z"},"did":"did:plc:mlodkcskzk6q7off7pnys6c3","kind":"account","time_us":"1734962402817482"}
kind:              account
bluesky_ts:        2024-12-23 14:00:02.518000
_rmt_partition_id: 1734962400
```

There are many several types messages, indicated by the `kind` property.

```text
   ┌─kind─────┬────count()─┐
1. │ account  │    2191988 │
2. │ identity │    1946995 │
3. │ commit   │ 1158651060 │
   └──────────┴────────────┘
```

Let's have a look at one more table - `events_per_hour_of_day`, which does exactly what the name suggests!
It has the following fields:

```
Row 1:
──────
name: event
type: LowCardinality(String)

Row 2:
──────
name: hour_of_day
type: UInt8

Row 3:
──────
name: count
type: SimpleAggregateFunction(sum, UInt64)
```

We can count the number of different events generated in the 12th hour of the day by writing the following query:

<pre><code type='click-ui' language='sql'>
SELECT event, sum(count)
FROM events_per_hour_of_day
WHERE hour_of_day = 12
GROUP BY ALL
</code></pre>

```text
    ┌─event─────────┬─sum(count)─┐
 1. │ like          │   19978903 │
 2. │ generator     │       1771 │
 3. │ block         │     584722 │
 4. │ profile       │      90941 │
 5. │ directMessage │         30 │
 6. │ threadgate    │      22029 │
 7. │ post          │    3871798 │
 8. │ postgate      │      11686 │
 9. │ listitem      │     175360 │
10. │ repost        │    2487915 │
11. │ listblock     │       7346 │
12. │ follow        │   11253723 │
13. │ starterpack   │       1113 │
14. │ ref           │          7 │
15. │ list          │       3444 │
16. │ direct        │         10 │
17. │ share         │         10 │
    └───────────────┴────────────┘
```

## Creating your first Python dashboard with Streamlit

Now that we understand our data source, it's time for the fun part - building our Python dashboard! We'll start simple and gradually add more features as we go. Our dashboard will eventually visualize Bluesky's social data, but first, let's get the basic structure in place.

We're going to create two files: `dashboard.py` and `queries.py`. This separation helps keep our code organized - `dashboard.py` will handle the visualization and interface components, while `queries.py` will store our queries (we'll add those later).

Let's start with a minimal setup in `dashboard.py`:

<pre><code type='click-ui' language='python'>
import streamlit as st

st.set_page_config(layout="wide")
st.title("Python BlueSky dashboard with ClickHouse and Streamlit")
</code></pre>

For now, we'll leave `queries.py` empty - we'll populate it with our ClickHouse queries once we've got our basic dashboard structure working.
To see our dashboard in action, we're going to launch Streamlit using the [uv package manager](https://github.com/astral-sh/uv), which in my experience offers faster package installation and better dependency management than pip:

<pre><code type='click-ui' language='bash'>
uv run \
--with streamlit \
streamlit run dashboard.py
</code></pre>

```
  You can now view your Streamlit app in your browser.

  Local URL: http://localhost:8501
  Network URL: http://192.168.86.23:8501
  External URL: http://82.35.72.115:8501
```

The web browser will open a page at http://localhost:8501, showing your new dashboard.

![Dashboard image 1](/images/engineering-resources/1_dashboard_full.png)

Right now it's pretty bare bones, but don't worry - we're about to make it a lot more interesting!

We're going to query ClickHouse using [`clickhouse-connect`](https://clickhouse.com/docs/en/integrations/python), so we'll kill the Streamlit command that we ran before and add in `clickhouse-connect` as a dependency, as shown in the following command:

Next, we need to set up our connection to ClickHouse. For this, we'll use [`clickhouse-connect`](https://clickhouse.com/docs/en/integrations/python), Python's official client library for ClickHouse.

Let's update our development environment to include this package.
First, stop the currently running Streamlit server (press Ctrl/Cmd+C in your terminal). Then, run the following command to restart Streamlit with both packages installed:

<pre><code type='click-ui' language='bash'>
uv run \
--with clickhouse-connect \
--with streamlit \
streamlit run dashboard.py --server.headless True
</code></pre>

A quick note about the command: the `--server.headless True` flag prevents Streamlit from opening a new browser tab (since we already have one open from before).

Let's now make our dashboard more interesting by adding some real-time metrics about Bluesky activity.
We'll create a simple but informative panel that shows how many events are being generated on the platform, both in total and over recent time periods.

First, let's set up our queries in `queries.py`:

<pre><code type='click-ui' language='python'>
all_messages = """
SELECT count() AS messages
FROM bluesky.bluesky
"""

last_24_hours = """
SELECT
    countIf(bluesky_ts > (now() - ((24 * 60) * 60))) AS last24Hours,
    countIf(
      (bluesky_ts <= (now() - ((24 * 60) * 60))) AND 
      (bluesky_ts > (now() - ((48 * 60) * 60)))
    ) AS previous24Hours
FROM bluesky.bluesky
"""
</code></pre>

The first query is straightforward - it simply counts all events in our Bluesky dataset. But the second query is where things get interesting. Let's break it down:

- `countIf(bluesky_ts > (now() - ((24 * 60) * 60)))` counts events from the last 24 hours
  - `now()` gives us the current timestamp
  - We subtract 24 hours worth of seconds (`24 * 60 * 60 = 86400 seconds`)
  - `countIf` only counts rows where the condition is true
- The second `countIf` looks at the previous 24-hour period:
  - It counts events between 24 and 48 hours ago
  - This gives us our comparison period for calculating the trend

By comparing these two periods, we can see if activity is increasing or decreasing. Streamlit will automatically handle the visual presentation of this comparison with an up or down arrow in our dashboard.

And then let's come back to `dashboard.py` and add the following import at the top of the file:

<pre><code type='click-ui' language='python'>
import clickhouse_connect
</code></pre>

Next, we'll establish a connection to the ClickHouse playground. This gives us read-only access to the Bluesky dataset:

<pre><code type='click-ui' language='python'>
client = clickhouse_connect.get_client(
  host='sql-clickhouse.clickhouse.com', 
  username='demo',
  secure=True
)
</code></pre>

Now for the exciting part - let's add some metrics to our dashboard! We'll create a section that shows total platform activity and recent trends:

<pre><code type='click-ui' language='python'>
st.markdown("## How much are people using it?")
st.markdown("How many messages have been generated so far?")

all_messages = client.query_df(queries.all_messages)
last_24_hours_messages = client.query_df(queries.last_24_hours)  

left, right = st.columns(2)
with left:
  st.metric(label="Total events", value=f"{all_messages['messages'][0]:,}")

with right:
  delta = (
    int(last_24_hours_messages['last24Hours'][0])-
    int(last_24_hours_messages['previous24Hours'][0]
  )
  st.metric(
    label="Events in the last 24 hours", 
    value=f"{last_24_hours_messages['last24Hours'][0]:,}",
    delta=f"{delta):,}"
  )  
</code></pre>

This code creates two metrics cards side by side:

- On the left, we show the total number of events ever recorded
- On the right, we display events from the last 24 hours, along with a delta showing the change from the previous 24-hour period

The delta indicator will automatically show green for increases and red for decreases, giving us an instant visual cue about platform growth trends.

When you refresh your browser, you'll see your dashboard has come to life with real data! Let's look at what we've created:

![Dashboard image 3](/images/engineering-resources/2_dashboard_full.png)

Our dashboard now shows two key metrics:

- Total Events: Over 1.1 billion events have been recorded on Bluesky! This gives us a sense of the platform's overall scale.
- 24-Hour Activity: We can see about 54 million events in the last day, with the red arrow indicating a decrease of roughly 3.3 million events compared to the previous 24 hours.

This is just our first visualization, but it's already telling us an interesting story about platform activity. The comparison between time periods helps us understand if engagement is growing or declining.

Now that we know how many people are using BlueSky, let's dig deeper into when they're most active. We'll create two visualizations side by side that tell us different parts of the story: daily patterns and longer-term trends.

First, let's add these queries to our `queries.py` file:

<pre><code type='click-ui' language='python'>
time_of_day = """
SELECT event, hour_of_day, sum(count) as count
FROM bluesky.events_per_hour_of_day
WHERE event in ['post', 'repost', 'like']
GROUP BY event, hour_of_day
ORDER BY hour_of_day
"""

events_by_day = """
SELECT
    toStartOfDay(bluesky_ts)::Date AS day, 
    count() AS count
FROM bluesky.bluesky
GROUP BY ALL
ORDER BY day ASC
"""
</code></pre>

These queries will help us understand:

- Hour-by-hour activity patterns for different types of engagement (posts, reposts, and likes)
- Daily event totals to spot trends over time

Now let's update our dashboard to create some interactive visualizations using plot.ly.

<pre><code type='click-ui' language='python'>
st.markdown("## When do people use BlueSky?")
st.markdown("What's the most popular time for people to like, post, and re-post?")

left, right = st.columns(2)

with left:
  df = client.query_df(queries.time_of_day)
  fig = px.bar(df, 
    x="hour_of_day", y="count", color="event", 
    labels={
        "hour_of_day": "Hour of Day", 
        "count": "Event Count", 
        "event": "Event Type"
    },
    color_discrete_map={"like": "light blue", "post": "red", "repost": "green"}
  )
  fig.update_layout(
      legend=dict(
          orientation="h",
          yanchor="bottom",
          y=1.1,
          xanchor="center",
          x=0.5
      )
  )
  st.plotly_chart(fig)

with right:
  df = client.query_df(queries.events_by_day)
  st.plotly_chart(px.bar(df, 
    x="day", y="count", 
    labels={"day": "Day", "count": "Event Count"},
  ))
</code></pre>

Let's break down what we're creating:

1. Hourly Activity Chart (left side):
   - Shows when people are most active throughout the day
   - Breaks down activity by type (posts, reposts, and likes)
   - Uses different colors to distinguish between activity types
   - Horizontal legend at the top for better readability
2. Daily Trends Chart (right side):
   - Shows total activity per day
   - Helps identify overall growth trends
   - Reveals any weekly patterns or special events

![Dashboard image 4](/images/engineering-resources/3_dashboard_full.png)

Let's break down what these visualizations reveal:

Hourly Activity Patterns (Left Chart):

- Peak activity occurs during the evening hours (around hour 15-22)
- The early morning hours (2-5) show the lowest activity
- Likes (blue) make up the majority of interactions
- Posts (red) and reposts (green) follow similar patterns but at lower volumes
- There's a clear "wake-up" period where activity starts ramping up

Daily Trends (Right Chart):

- We can see activity levels over the past few weeks
- There's significant day-to-day variation
- The platform saw peak activity around January 5th
- Recent days show relatively stable engagement levels

## Additional examples and wrap-up

The [code repository](https://github.com/ClickHouse/examples/tree/main/blog-examples/python-dashboard-streamlit) includes several more visualizations and features that we haven't covered in this guide - including post types, most liked users, and posts by language.
While we won't walk through these examples individually, you can explore them in the code and adapt them for your own needs.

## What we're learned

Through this guide, you've learned how to:

- Build an interactive Python dashboard from scratch using Streamlit
- Connect to and query real-time data from ClickHouse
- Create engaging visualizations using plot.ly
- Display both metrics and trends in an intuitive way
- Structure your code for maintainability (separating queries from visualization logic)

This `dashboard.py` example demonstrates just a fraction of what's possible when combining Python, ClickHouse, and Streamlit. You could extend this further by:

- Adding user filters and interactive controls
- Creating more complex visualizations
- Implementing real-time updates
- Adding authentication
- Deploying your dashboard to a production environment

Whether you're building a data visualizer for social media analytics, business metrics, or any other dataset, the pattern remains the same: connect to your data source, write clear queries, and create intuitive visualizations that tell your data's story.

Ready to build your own Python dashboard? Fork our repository and start customizing it for your needs. And if you create something interesting, we'd love to see it!

<!-- words to include:

* python dashboard
* dashboard.py
* dashboarding in python
* python dashboard framework
* visualizer python
* create dashboard in python
* python dashboard examples -->

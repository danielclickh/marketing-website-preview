---
title: Metabase and ClickHouse
description: Connect Metabase to ClickHouse.
menu:
  docs:
    parent: "integration"
weight: 20

---


**Overview:** In this lesson, you will analyze data that has details about Spotify usage (the artists and how many daily streams of their songs occurred). The data is already indexed for you, so the focus will be on configuring Metabase to connect to ClickHouse. 

According to their website, _Metabase brings your data to life in beautiful visualizations with an intuitive interface that makes data exploration feel like second nature — opening data up for everyone, not just analysts and developers_.

After setting it all up, I have to agree! Metabase approaches visualizations from the concept of **_answering questions_**, instead of building charts and graphs. It is fairly intuitive, no SQL is needed, and the UI feels smooth and responsive.

Let's get started!

***

### Prerequisites

- You will be running a couple of Docker images, so you will need **Docker** installed if you want to follow along.

*** 

## 1. Startup ClickHouse

We have built a Docker image that already has ClickHouse installed, along with a table that contains the Spotify data: 

{{< detail-tag "Show instructions" "1" >}}

1. Run the appropriate command for your environment to startup the Docker container:

- On **Linux**, you will need to use the `--network host` option:
    ```bash
    docker run -it  --name clickhouse-spotify --network host -p 9000:9000 -p 9009:9009 -p 8123:8123 --platform linux/amd64 --ulimit nofile=262144:262144 learnclickhouse/public-repo:clickhouse-spotify-21.10
    ```

    On all other environments, use this command:
    ```bash
    docker run -it  --name clickhouse-spotify -p 9000:9000 -p 9009:9009 -p 8123:8123 --platform linux/amd64 --ulimit nofile=262144:262144 learnclickhouse/public-repo:clickhouse-spotify-21.10
    ```

2. Wait about 30 seconds for the **clickhouse-spotify** container to startup and also for the data to get inserted into the **spotify** database.

3. Point your web browser to <a href="http://localhost:8123/play" target="_blank">http://localhost:8123/play</a>. You should see the embedded ClickHouse Play UI:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/clickhouseui.png" width="100%" alt="" />


4. Let's run a few queries to understand what the dataset looks like. Copy-and-paste the following query into the UI, then click the **Run** button (or press **Ctrl/Cmd+Enter**):
    ```sql
    SHOW TABLES IN spotify
    ```

    You should see a table named **songs**.

5. The following command shows the schema of **songs**:
    ```sql
    DESCRIBE spotify.songs
    ```

6. View some of the data in the tables. This query displays 100 days' worth of streaming data:
    ```sql
    SELECT * FROM spotify.songs LIMIT 100
    ```

7. To see the most popular songs, sort by the **Streams** column:
    ```sql
    SELECT * FROM spotify.songs 
    ORDER BY Streams DESC
    ```

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/topstreams.png" width="100%" alt="Top streams for Spotify" />

It looks like 2017 was a good year Kendrick Lamar, Post Malone, Taylor Swift and Drake.

{{< /detail-tag >}}

*** 

## 2.  Download the ClickHouse plugin for Metabase

Now that you have Metabase running, it requires a plugin to connect to ClickHouse.

{{< detail-tag "Show instructions" "2" >}}

1. The plugin is a JAR file that needs to end up in the **plugins** folder of your Metabase deployment. For this tutorial, you will download the driver and mount it to the Docker container. Create a new folder to work in:
    ```bash
    mkdir -p ~/metabase/plugins
    chown 777 ~/metabase/plugins
    ```

2. For this tutorial we used version 0.7.5 from the Metabase ClickHouse Driver repository on GitHub. Download the JAR file using this URL:
    ```
    https://github.com/enqueue/metabase-clickhouse-driver/releases/tag/0.7.5
    ```
    
3. Save it in the **~/metabase/plugins** folder.

That's it! You will use the plugin in the next step...

{{< /detail-tag >}}

*** 

## 3.  Startup Metabase

Metabase has a nice Docker image for running Metabase locally.

{{< detail-tag "Show instructions" "3" >}}


{{% notice note %}}
It appears that the Docker image from Metabase does not run on the new M1 Macs, so if you are following along you will need to use a different platform, or run a local Metabase instance outside of Docker.
{{% /notice %}}


1. Use the **mount** flag to specify the location of the **plugins** folder. **_You must use the full path to your new plugins folder._** In the following command, replace **username** with the correct path to your **plugins** folder. 

- On **Linux**, the command will look like:
    ```bash
    docker run --network host -d -p 3000:3000 \
      --mount type=bind,source=/home/username/metabase/plugins,destination=/plugins \
      --name metabase metabase/metabase
    ```

- On Mac the command is:
    ```bash
    docker run -d -p 3000:3000 \
      --mount type=bind,source=/Users/username/metabase/plugins,destination=/plugins \
      --name metabase metabase/metabase
    ```

2. It takes a minute for Metabase to startup, but if you run the following command you can watch the progress:
    ```bash
    docker logs -f metabase
    ```

3. Once Metabase is running, access it at <a href="http://localhost:3000/" target="_blank">http://localhost:3000</a>. You will see the welcome screen:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/metabasewelcome.png" width="100%" alt="Welcome to Metabase" border="1px" />

4. You will be asked a bunch of questions - so work your way through the initial setup wizard. When prompted to select a database, you need to click on "**I'll add my data later**":

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/addlater.png" width="100%" alt="Add Database Later" />

5. Complete the setup to work your way into the app:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/mainscreen.png" width="100%" alt="Metabase Main Screen" />


{{< /detail-tag >}}


*** 

## 4.  Connect Metabase to ClickHouse

Let's see how to connect Metabase to the Spotify database in ClickHouse.

{{< detail-tag "Show instructions" "4" >}}

1. Click on the gear icon in the top-right corner and select **Admin** to visit your **Metabase Admin** page.

2. Click on **Add a database**:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/add-database.png" width="100%" alt="Add a database" border="1px" />

3. If your driver installation worked, you will see **ClickHouse** in the **Database type**. Select **ClickHouse** and add the following settings (**leave the password field blank**):

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/connect-settings.png" width="100%" alt="Connection settings" border="1px" />


4. Select the **Save** button at the bottom and you should see a confirmation that the database was added:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/database-added.png" width="100%" alt="Database is added" />

5. Click the **Explore this data** button and Metabase will scan your database and build some visualizations based on the content. When it's ready, click on **A look at your Songs table**:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/metabot.png" width="100%" alt="Metabot" border="1px" />

6. Notice the default dashboard pulled some of the more obvious metrics from the **songs** table:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/default-dashboard.png" width="100%" alt="Default dashboard" border="1px" />

7. Save the auto-generated dashboard by clicking the **Save this** button. The dashboard will be saved as **A look at your Songs table**.

{{< /detail-tag >}}

***

## 5.  Build a Dashboard in Metabase

Let's build a dashboard of our own.

{{< detail-tag "Show instructions" "5" >}}

1. Click the large **+** icon in the top-right corner and select **New dashboard**. Name it **Spotify Dashboard**:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/new-dashboard.png" width="100%" alt="New dashboard" border="1px" />

2. Metabase cleverly refers to their visualizations as **_questions_**. To add a visualization, select the **Ask a question** button in the top-right area of the toolbar:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/ask-question.png" width="100%" alt="Ask a question" border="1px" />

3. Let's display a simple table that lists the artists with the most number of streams. Select **Simple question** and you will be prompted for a data source. Select **My ClickHouse Database**, then select the **Songs** table:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/songs-table.png" width="100%" alt="The songs table" border="1px" />

4. You will see a table view of some of the records. We need to group by artist to answer our question, so click the **Summarize** button:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/summarize-button.png" width="100%" alt="Click the Summarize button" border="1px" />

5. Change the metric to **Sum** and select the **Streams** field. (You will see a sum of all streams!) Select **Artist** to **Group by** and a table view of all streams by artist appears:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/groupby-artist.png" width="100%" alt="Group by artist" border="1px" />

6. Notice the ordering is currently by artist. Click on the top of the **Sum of Streams** column and change it to sort descending, then click the **Save** button:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/save-button.png" width="100%" alt="Save button" border="1px" />

7. Give your question a name:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/save-question.png" width="100%" alt="Save question" border="1px" />

8. When prompted, save the question to your **Spotify Dashboard** and you will be taken to that dashboard:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/spotify-dashboard.png" width="100%" alt="Spotify dashboard" border="1px" />

9. Following the same steps, create a line chart that answers **_"What are the average number of streams per day?"_**:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/avg-streams.png" width="100%" alt="Average streams" border="1px" />

10. Create a simple metric for **_the total number of streams all-time_**:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/total-streams.png" width="100%" alt="Total streams" border="1px" />

11. Let's figure out how Taylor Swift did for the month of October, 2017. Ask a new question, but select **Custom question** this time. Select the **Songs** table from your ClickHouse database.

12. You will see the following screen. Add two filters: **Artist** is **Taylor Swift**, and **Date** field is between **10/01/2017** and **10/31/2017**. Click the **Summarize** button and change the metric to be the sum of the **Streams** field, then **group the results by day**:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/taylorswift1.png" width="100%" alt="Taylor Swift" border="1px" />

13. Select the **Visualize** button to view the resulting line chart:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/taylorswift2.png" width="100%" alt="Taylor Swift" border="1px" />

14. Save and add the line chart to your Spotify dashboard.

15. Let's answer more question: **_which artists have had the most streams on any given day in 2017?_** This can be answered with an **ANY** query. Start by selecting **Ask a question**, then select **Native query** this time.

16. Select **My ClickHouse Database**.

17. Copy-and-paste the following query into the text area:
    ```sql
    SELECT DISTINCT Artist FROM spotify.songs 
    WHERE Streams = ANY (
        SELECT max(Streams) FROM spotify.songs GROUP BY Date
    ) 
    ```

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/native-query.png" width="100%" alt="Taylor Swift" border="1px" />

18. Click the **Play** button (see the screenshot above) and the results will appear in a table.

19. **Save** it to your Spotify dashboard:

<img src="https://clickhouse.com/learn/lessons/connect-metabase-to-clickhouse/images/final-dashboard.png" width="100%" alt="Taylor Swift" border="1px" />

20. Now that have a feel for both Metabase and the Spotify dataset, feel free to play around and answer as many questions as you can.

**Congratulations on connecting Metabase to ClickHouse!!** We hope you enjoyed this lesson and found it useful and informative.

{{< /detail-tag >}}

***

**What's next:** Check out the following lessons to continue your journey: 

- The <a href="https://clickhouse.com/learn/lessons/logsvector">Ingest Nginx Logs into ClickHouse using Vector</a> lesson demonstrates how to stream a log file into ClickHouse
- Check out <a href="https://clickhouse.com/learn/lessons/whatsnew-clickhouse-21.10">What's New in ClickHouse 21.10</a>
- View all of our lessons on the <a href="https://clickhouse.com/learn/">Learn ClickHouse</a> home page


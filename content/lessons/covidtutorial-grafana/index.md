---
title: "Analyzing Covid-19 Data with Grafana and ClickHouse"
description: "A tutorial on how to connect Grafana to ClickHouse to build visualizations and analyze data."
lead: ""
date: 
lastmod: 
draft: false
images: []
toc: true

duration: "20 minutes"
audience: "Anyone interested in learning how to connect Grafana to ClickHouse for building visualizations and dashboards"

---

**Overview:** In this lesson, you will learn how to analyze data in ClickHouse using Grafana. The data is already indexed for you, so the focus will be on how to configure Grafana to connect to ClickHouse. 

Let's get started!

***

### Prerequisites

- You will need **Docker** installed and running so that you can start up a Docker Compose file

*** 

## 1. Start ClickHouse and Grafana

You are going to run a preconfigured ClickHouse server in a Docker container that will already have the Covid-19 data inserted into a table, and in a different Docker container you are going to run an out-of-the-box Grafana instance.  

{{< detail-tag "Show instructions" "1" >}}

1. Let's start by creating a local folder to work in (feel free to name the folder anything you like):
    ```bash
    mkdir ~/clickhouse-covid19
    cd ~/clickhouse-covid19
    ```

2. Create a new file named **docker-compose.yml**, and copy-and-paste the following into it:
    ```yml
    version: '3.7'
    services:
      clickhouse-covid19:
        image: learnclickhouse/public-repo:clickhouse-covid19-21.9
        container_name: clickhouse-covid19
        hostname: clickhouse-covid19
        ports:
          - "9000:9000"
          - "8123:8123"
          - "9009:9009"
        restart: always
        ulimits:
          memlock:
            soft: -1
            hard: -1
          nofile:
            soft: 262144
            hard: 262144
        deploy:
          resources:
            limits:
              memory: 2g

      grafana:
        image: grafana/grafana:8.1.5-ubuntu
        container_name: grafana
        hostname: grafana
        ports:
          - "3000:3000"
        environment:
          - GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS=vertamedia-clickhouse-datasource
        restart: always
        deploy:
          resources:
            limits:
              memory: 2g
    ```

{{% notice note %}}
As you can see, the **grafana** image is just being pulled from Grafana's Docker Hub, so we are starting with a brand new instance of Grafana. On the other hand, **clickhouse-covid19-21.9** is a special image built just for this lesson that inserts the Covid-19 data into a table on startup.
{{% /notice %}}

3. From a terminal, run the following command from the folder where you created **docker-compose.yml**:
    ```bash
    docker-compose up
    ```

4. It will take a minute - the entrypoint script has a delay to ensure that ClickHouse starts up before the database is created and populated. After a minute, <a href="http://localhost:8123/play" target="_blank">open the Play UI</a> and run the following command:
    ```sql
    SELECT count(*) FROM covid19db.daily_totals
    ```

You should see 118,603 rows:

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/selectcount.png" width="100%" alt="" />

{{< /detail-tag >}}

*** 

## 2.  View the Covid-19 data

 Now that you have ClickHouse running, let's take a look at the Covid-19 data that was inserted.

{{< detail-tag "Show instructions" "2" >}}

1. The **covid19db** database has a single table named **daily_totals**. <a href="http://localhost:8123/play" target="_blank">From the Play UI</a>, run the following command to view the schema of **daily_totals**:
    ```sql
    DESCRIBE covid19db.daily_totals
    ```

2. Each row contains daily Covid-19 numbers from various countries. For example, the following query to view some rows:
    ```sql
    SELECT * FROM covid19db.daily_totals LIMIT 100
    ```

3. The following query shows the number of new cases by day in the United States, with the highest totals first:
    ```sql
    SELECT new_cases, date 
    FROM covid19db.daily_totals 
    WHERE location = 'United States' 
    ORDER BY new_cases DESC
    ```

Feel free to run some queries to get a better sense of the data - it has a lot of columns.

{{< /detail-tag >}}

*** 

## 3.  Install the Grafana Plugin for ClickHouse

Before Grafana can talk to ClickHouse, you need to install the appropriate Grafana plugin...

{{< detail-tag "Show instructions" "3" >}}

1. Login to Grafana at <a href="http://localhost:3000/" target="_blank">http://localhost:3000/</a>. The username and password are both **admin**. You will be prompted to change the password - but notice there is a link to skip that step if desired.

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/grafanalogin.png" width="100%" alt="" />

2. Select the **Configuration** menu (the gear icon in the left column) and select **Data sources**. Select the **Add data source** button and search for ClickHouse - notice the list is empty:

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/datasources.png" width="100%" alt="" />

3. You need to install the Grafana plugin for ClickHouse, which can be done from the command line. Run the following command to connect to the **grafana** Docker container:
    ```bash
    docker exec -it grafana /bin/bash
    ```

4. At the prompt, install the plugin with the following command:
    ```bash
    grafana-cli plugins install vertamedia-clickhouse-datasource
    ```

5. Notice you need to restart Grafana before the plugin is available. Start by typing in **exit** to get out of the Docker container:
    ```bash
    exit
    ```

6. Now run the following command to restart the Grafana container:
    ```bash
    docker restart grafana
    ```

7. To verify the plugin is working, go back to Grafana and reload the <a href="http://localhost:3000/datasources" target="_blank">page for defining data sources</a>. This time when you select the **Add data source** button - you should see ClickHouse in the list:

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/verifyplugin.png" width="100%" alt="" />

In the next step, you will define a new data source for ClickHouse.

{{< /detail-tag >}}

*** 

## 4.  Configure a ClickHouse data source in Grafana

Now that you have the ClickHouse plugin installed, let's define a data source in Grafana that connects to the **covid19db** database.

{{< detail-tag "Show instructions" "4" >}}

1. From the **Add data source** page in Grafana, click the **Select** button next to ClickHouse. The following dialog appears:

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/datasource1.png" width="100%" alt="" />

2. Enter the following values:

- **Name:** `my-clickhouse-ds`
- **URL:** `http://clickhouse-covid19:8123`

and make sure the **Default** option is selected.

3. Scroll down and click the **Save and test** button. You should see a **Data source is working** message:

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/datasource2.png" width="100%" alt="" />

4. Click the **Back** button and your new data source should appear on the list:

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/datasource3.png" width="100%" alt="" />

You are now ready to build a dashboard!

{{< /detail-tag >}}


*** 

## 5.  Build a Dashboard

 Now that you have a **data source** configured, let's build a dashboard...

{{< detail-tag "Show instructions" "5" >}}

1. From the menu, click on the **Dashboards** menu and select the **Manage** icon. Then select the **New Dashboard** button: 

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/newdashboard.png" width="100%" alt="" />

2. Dashboards are initially empty. Click the **Add an empty panel** button to create a new panel.

3. Using the time picker, change the time interval to the last 2 years:

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/dashboard1.png" width="100%" alt="" />

4. Next you will select a database table. Make sure the **Data source** is **my-clickhouse-ds**, then click the **Edit** icon (the one that looks like a pencil):

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/dashboard2.png" width="100%" alt="" />

5. Modify the query as follows:

- select **covid19db** for the database
- select **daily_totals** for the table
- select **Column:DateTime64** for the data type and **time_stamp** as the field for the time selector

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/dashboard3.png" width="100%" alt="" />

6. Click the **Go to Query** button to view the query. Notice the metric is a simple **count()**, and the line chart should populate with the number of daily events. Change the name of the panel to **Number of Events** then click the **Apply** button:

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/dashboard4.png" width="100%" alt="" />

7. The panel will appear on your new dashboard:

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/dashboard5.png" width="100%" alt="" />

8. Add another panel, but this time change the query to show the number of new cases every day:

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/dashboard6.png" width="100%" alt="" />

9. Name the panel **Daily New Cases** and click **Apply** to add it to your dashboard:

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/dashboard7.png" width="100%" alt="" />

10. You can add multiple query results on the same panel. From the dashboard, click on the name **Daily New Cases** and select **Edit** from the drop-down menu to return back to the **Edit panel** page.

11. Click the **+ Query** button below the first query:

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/dashboard8.png" width="100%" alt="" />

12. Instead of **count()**, compute the **SUM(new_tests_smoothed)** for query B:

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/dashboard9.png" width="100%" alt="" />

13. Change the name to **Daily New Cases vs. Tests** and click **Apply** to view the updated panel:

<img src="https://clickhouse.com/learn/lessons/covidtutorial-grafana/images/dashboard10.png" width="100%" alt="" />

14. By the way, you can save your dashboard by clicking the **Save dashboard** icon in the top-right toolbar - you will be prompted for a name as well.

15. Feel free to add some more panels and experiment with other visualizations like pie charts, bar charts, heat maps and all the other fun features of Grafana.

Congratulations on connecting Grafana to ClickHouse!! You have opened up a whole new world of blazing fast data analytics.

{{< /detail-tag >}}

***


**What's next:** Check out the following lessons to continue your journey: 

- The <a href="https://clickhouse.com/learn/lessons/logsvector">Ingest Nginx Logs into ClickHouse using Vector</a> lesson demonstrates how to stream a log file into ClickHouse
- Check out <a href="https://clickhouse.com/learn/lessons/whatsnew-clickhouse-21.10">What's New in ClickHouse 21.10</a>
- View all of our lessons on the <a href="https://clickhouse.com/learn/">Learn ClickHouse</a> home page


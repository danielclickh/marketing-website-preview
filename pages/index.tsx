import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Footer } from "../components/Footer";
const imagePrefix =
  process.env.NODE_ENV === "development" ? "" : "https://clickhouse.com/learn";

export default function Home() {
  return (
    <>
      <Head>
        <title>Learn | ClickHouse</title>
      </Head>
      <div>
        <div className='hero-container'>
          <div className='hero-background' />
          <div className='hero-content'>
            <div className='hero-title'>
              ClickHouse <span className='hero-title-gradient'>Academy</span>
            </div>
            <div className='hero-subtitle'>
              Become a ClickHouse expert with our free official ClickHouse
              training
            </div>
            <div className='video-placeholder'>
              <div
                style={{ position: "relative", height: "100%", width: "100%" }}
              >
                <iframe
                  src='https://player.vimeo.com/video/756877867?h=c58e171729&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
                  frameBorder='0'
                  allow='autoplay; fullscreen; picture-in-picture'
                  allowFullScreen
                  style={{
                    position: "relative",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                  }}
                  title='Getting Started.mp4'
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <Link href='https://learn.clickhouse.com/visitor_class_catalog'>
          <div className='cta-find-course'>
            <button className='button'>Find a course</button>
          </div>
        </Link>
        <div className='section'>
          <div className='card-container'>
            <div className='section-category'>
              <div>POPULAR FREE COURSES</div>
            </div>
            <div className='card-inner-container'>
              <Link href='https://learn.clickhouse.com/visitor_catalog_class/show/913420/'>
                <div className='card'>
                  <div className='card--icon-container'>
                    <Image
                      alt='image'
                      src={`${imagePrefix}/icon-card-table.svg`}
                      width={27}
                      height={27}
                      className='card--icon'
                    />
                  </div>
                  <div className='card--title'>Getting started</div>
                  <div className='card--title-border'></div>
                  <div className='card--content'>
                    Get up and running quickly with ClickHouse! In this course,
                    you will learn how to create a new service, an understanding
                    of how primary keys work in ClickHouse, how to define a
                    table, how to insert data, and how to run queries on your
                    tables.
                  </div>
                  <div className='card--footer-divider'></div>
                  <div className='card--footer'>
                    <Image
                      alt='image'
                      src={`${imagePrefix}/icon-clock.svg`}
                      height={20}
                      width={20}
                      className='card--footer-icon'
                    />
                    25 minutes
                  </div>
                </div>
              </Link>
              <Link href='https://learn.clickhouse.com/visitor_catalog_class/show/912833/'>
                <div className='card'>
                  <div className='card--icon-container'>
                    <Image
                      alt='image'
                      src={`${imagePrefix}/icon-card-table.svg`}
                      width={27}
                      height={27}
                      className='card--icon'
                    />
                  </div>
                  <div className='card--title'>Data ingestion</div>
                  <div className='card--title-border'></div>
                  <div className='card--content'>
                    In this course, you will learn techniques for getting data
                    into your ClickHouse service, including how to insert a
                    CSV/TSV file, how to insert data from another database, and
                    how to use the various table functions and table engines for
                    ingesting data.
                  </div>
                  <div className='card--footer-divider'></div>
                  <div className='card--footer'>
                    <Image
                      alt='image'
                      src={`${imagePrefix}/icon-clock.svg`}
                      height={20}
                      width={20}
                      className='card--footer-icon'
                    />
                    20 minutes
                  </div>
                </div>
              </Link>
              <Link href='https://learn.clickhouse.com/visitor_catalog_class/show/1043451/'>
                <div className='card'>
                  <div className='card--icon-container'>
                    <Image
                      alt='image'
                      src={`${imagePrefix}/icon-card-table.svg`}
                      width={27}
                      height={27}
                      className='card--icon'
                    />
                  </div>
                  <div className='card--title'>Materialized views</div>
                  <div className='card--title-border'></div>
                  <div className='card--content'>
                    Creating views is an important step in optimizing your OLAP
                    applications. In this course, you will learn how to define
                    materialized views, including views that use the
                    SummingMergeTree and AggregatingMergeTree table engines.
                  </div>
                  <div className='card--footer-divider'></div>
                  <div className='card--footer'>
                    <Image
                      alt='image'
                      src={`${imagePrefix}/icon-clock.svg`}
                      height={20}
                      width={20}
                      className='card--footer-icon'
                    />
                    25 minutes
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className='cta-browse-more-courses'>
            <Link href='https://learn.clickhouse.com/visitor_class_catalog'>
              Browse more free training -&gt;
            </Link>
          </div>
        </div>
        <div className='section section-learning-paths'>
          <div className='section-learning-paths--content'>
            <div className='section-category' style={{ marginBottom: "16px" }}>
              <div>STEP-BY-STEP</div>
            </div>
            <div className='section-title'>
              <div>Learning paths</div>
            </div>
            <div className='section-description' style={{ marginTop: "40px" }}>
              Become a subject matter expert through our recommended series of
              courses that will best help you build knowledge progressively.
            </div>
          </div>
          <div className='section-learning-paths--cards gap-4'>
            <Link href='https://learn.clickhouse.com/visitor_catalog_class/show/1049584/'>
              <div className='card'>
                <div className='card--icon-container'>
                  <Image
                    alt='image'
                    src={`${imagePrefix}/icon-card-table.svg`}
                    width={27}
                    height={27}
                    className='card--icon'
                  />
                </div>
                <div className='card--title'>
                  ClickHouse Developer Learning Path
                </div>
                <div className='card--title-border'></div>
                <div className='card--content'>
                  Become a ClickHouse Developer expert, from getting started to
                  a deep dive into the architecture of ClickHouse to advanced
                  topics like deduplication, materialized views, and
                  projections.
                </div>
                <div className='card--footer-divider'></div>
                <div className='card--footer'>
                  <Image
                    alt='image'
                    src={`${imagePrefix}/icon-clock.svg`}
                    height={20}
                    width={20}
                    className='card--footer-icon'
                  />
                  2 hours
                </div>
              </div>
            </Link>
            <Link href='https://learn.clickhouse.com/visitor_catalog_class/show/913421/'>
              <div className='card'>
                <div className='card--icon-container'>
                  <Image
                    alt='image'
                    src={`${imagePrefix}/icon-card-table.svg`}
                    width={27}
                    height={27}
                    className='card--icon'
                  />
                </div>
                <div className='card--title'>ClickHouse Cloud Onboarding</div>
                <div className='card--title-border'></div>
                <div className='card--content'>
                  Start your journey to becoming a ClickHouse Cloud expert by
                  learning how to get started in the Cloud, the architecture of
                  ClickHouse, how to create tables, and how to ingest data.
                </div>
                <div className='card--footer-divider'></div>
                <div className='card--footer'>
                  <Image
                    alt='image'
                    src={`${imagePrefix}/icon-clock.svg`}
                    height={20}
                    width={20}
                    className='card--footer-icon'
                  />
                  1.5 hours
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div
          className='section section-professional-cert'
          style={{ marginTop: "120px" }}
        >
          <div>
            <div className='badge'>COMING SOON</div>
          </div>
          <div style={{ marginTop: "40px", marginBottom: "40px" }}>
            <div className='section-title'>Professional certification</div>
          </div>
          <div className='section-description text-align-center'>
            Let the world know you’re a ClickHouse subject matter expect! We’re
            working on building the first official ClickHouse certification
            program, and we will share the news on social media when the exams
            are ready for beta testers.
          </div>
          <div style={{ marginTop: "40px" }}>
            <Link href='https://twitter.com/clickhousedb'>
              <button className='twitter-button'>
                Follow us on Twitter{" "}
                <Image
                  alt='image'
                  style={{ marginLeft: "10px" }}
                  src={`${imagePrefix}/icon-twitter.svg`}
                  width={24}
                  height={20}
                />
              </button>
            </Link>
          </div>
        </div>
        <div className='section' style={{ marginTop: "120px" }}>
          <div>
            <div className='section-title' style={{ marginBottom: "72px" }}>
              Upcoming live events
            </div>
          </div>
          <div className='events-container'>
            <div className='event-item'>
              <div className='event-item--image'>
                <Image
                  alt='image'
                  src={`${imagePrefix}/clickhouse_workshop.png`}
                  width={342}
                  height={196}
                />
              </div>
              <div className='event-item--title'>ClickHouse Workshop</div>
              <div className='event-item--description'>
                A deep dive into ClickHouse for developers and architects new to
                ClickHouse. This free, hands-on, live-training event covers
                modeling data, ingestion, views, analyzing data, manaaging data,
                optimizing ClickHouse, and more.
              </div>
              <div className='event-item--details'>
                <div className='event-item--date'>
                  <Image
                    alt='image'
                    src={`${imagePrefix}/icon-calendar.svg`}
                    height={20}
                    width={20}
                    className='event-item--icon'
                  />
                  December 14 &amp; 15, 2022
                </div>
                <div className='event-item--time'>
                  <Image
                    alt='image'
                    src={`${imagePrefix}/icon-clock.svg`}
                    height={20}
                    width={20}
                    className='event-item--icon'
                  />
                  8:00 - 11:00 a.m. PST both days
                </div>
              </div>
              <Link href='https://clickhouse.com/company/events/clickhouse-onboarding-workshop'>
                <div className='event-item--register-cta'>
                  Register now -&gt;
                </div>
              </Link>
            </div>
          </div>
          <Link href='https://clickhouse.com/company/news-events'>
            <div style={{ marginTop: "70px", marginBottom: "150px" }}>
              <button className='button'>View all live events</button>
            </div>
          </Link>
        </div>
        <Script src='https://player.vimeo.com/api/player.js'></Script>
      </div>
    </>
  );
}

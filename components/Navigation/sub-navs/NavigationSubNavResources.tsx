import React, { useState } from 'react'
import { galaxyOnClick } from '../../../lib/galaxy/galaxy'
import { NavigationLink } from '../parts'
import NavigationChevron from '../parts/NavigationChevron'
import NavigationSubNav from '../parts/NavigationSubNav'

const SUBNAV_CLOSE_DELAY = 250

export default function NavigationSubNavResources() {
  const [activeSubNav, setActiveSubNav] = useState<null | string>(null)

  const isSubNavActive = (name: string) => activeSubNav === name

  return (
    <ul className='relative px-4 md-mid:py-2'>
      <li>
        <NavigationLink
          href='/user-stories'
          onClick={galaxyOnClick('topNav.resourcesMenu.userStoriesSelect')}
          className='block w-full'>
          User stories
        </NavigationLink>
      </li>
      <li>
        <NavigationLink
          href='/blog'
          onClick={galaxyOnClick('topNav.resourcesMenu.blogSelect')}
          className='block w-full'>
          Blog
        </NavigationLink>
      </li>
      <li
        onMouseEnter={() => {
          setActiveSubNav('learning')
        }}
        onMouseLeave={() => {
          setActiveSubNav(null)
        }}>
        <NavigationLink
          onClick={() => {
            setActiveSubNav(isSubNavActive('learning') ? null : 'learning')
          }}
          className={`w-full items-center justify-between ${
            isSubNavActive('learning') ? 'text-primary-300' : ''
          }`}>
          <span>Learning and certification</span>
          <NavigationChevron
            className={
              isSubNavActive('learning')
                ? 'rotate-90 text-primary-300 md-mid:rotate-0'
                : 'text-neutral-500'
            }
          />
        </NavigationLink>
        <NavigationSubNav isOpen={isSubNavActive('learning')}>
          <li>
            <NavigationLink
              href='/learn'
              onClick={galaxyOnClick('topNav.learnMenu.academySelect')}
              className='block w-full'>
              ClickHouse Academy
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='/company/news-events?category=Free+Training#upcoming-events'
              onClick={galaxyOnClick('topNav.learnMenu.freeTrainingSelect')}
              className='block w-full'>
              Free live training
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='/learn/certification'
              onClick={galaxyOnClick('topNav.learnMenu.certificationSelect')}
              className='block w-full'>
              ClickHouse Certification
            </NavigationLink>
          </li>
        </NavigationSubNav>
      </li>
      <li
        onMouseEnter={() => {
          setActiveSubNav('comparisons')
        }}
        onMouseLeave={() => {
          setActiveSubNav(null)
        }}>
        <NavigationLink
          onClick={() => {
            setActiveSubNav(
              isSubNavActive('comparisons') ? null : 'comparisons'
            )
          }}
          className={`w-full items-center justify-between ${
            isSubNavActive('comparisons') ? 'text-primary-300' : ''
          }`}>
          <span>Comparisons</span>
          <NavigationChevron
            className={
              isSubNavActive('comparisons')
                ? 'rotate-90 text-primary-300 md-mid:rotate-0'
                : 'text-neutral-500'
            }
          />
        </NavigationLink>
        <NavigationSubNav isOpen={isSubNavActive('comparisons')}>
          <li>
            <NavigationLink
              href='/comparison/bigquery'
              onClick={galaxyOnClick('topNav.comparisonsMenu.bigQuerySelect')}
              className='block w-full'>
              BigQuery
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='/comparison/postgresql'
              onClick={galaxyOnClick('topNav.comparisonsMenu.postgreSqlSelect')}
              className='block w-full'>
              PostgreSQL
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='/comparison/redshift'
              onClick={galaxyOnClick('topNav.comparisonsMenu.redshiftSelect')}
              className='block w-full'>
              Redshift
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='/comparison/rockset'
              onClick={galaxyOnClick('topNav.comparisonsMenu.rocksetSelect')}
              className='block w-full'>
              Rockset
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='/comparison/snowflake'
              onClick={galaxyOnClick('topNav.comparisonsMenu.snowflakeSelect')}
              className='block w-full'>
              Snowflake
            </NavigationLink>
          </li>
        </NavigationSubNav>
      </li>
      <li>
        <NavigationLink
          href='/videos'
          onClick={galaxyOnClick('topNav.resourcesMenu.videosSelect')}
          className='block w-full'>
          Videos
        </NavigationLink>
      </li>
      <li>
        <NavigationLink
          href='/demos'
          onClick={galaxyOnClick('topNav.resourcesMenu.demosSelect')}
          className='block w-full'>
          Demos
        </NavigationLink>
      </li>
    </ul>
  )
}

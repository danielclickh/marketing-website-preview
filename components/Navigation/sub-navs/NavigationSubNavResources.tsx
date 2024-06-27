import React, { useState } from 'react'
import { galaxyOnClick } from '../../../lib/galaxy/galaxy'
import { NavigationLink } from '../parts'
import NavigationChevron from '../parts/NavigationChevron'
import NavigationSubNav from '../parts/NavigationSubNav'

export default function NavigationSubNavResources() {
  const [activeSubNav, setActiveSubNav] = useState<null | string>(null)
  const isSubNavActive = (name: string) => activeSubNav === name
  return (
    <ul className='relative px-4 md-mid:py-4'>
      <li>
        <NavigationLink
          href='/blog'
          onClick={() => galaxyOnClick('topNav.resourcesMenu.blogSelect')}
          className='block w-full'>
          Blog
        </NavigationLink>
      </li>
      <li>
        <NavigationLink
          href='/user-stories'
          onClick={() =>
            galaxyOnClick('topNav.resourcesMenu.blogCustomerStoriesSelect')
          }
          className='block w-full'>
          User stories
        </NavigationLink>
      </li>
      <li
        onMouseEnter={() => {
          setActiveSubNav('news-and-events')
        }}
        onMouseLeave={() => {
          setActiveSubNav(null)
        }}>
        <NavigationLink
          onClick={() => {
            setActiveSubNav(
              isSubNavActive('news-and-events') ? null : 'news-and-events'
            )
          }}
          className={`w-full items-center justify-between ${
            isSubNavActive('news-and-events') ? 'text-primary-300' : ''
          }`}>
          <span>News and events</span>
          <NavigationChevron
            className={
              isSubNavActive('news-and-events')
                ? 'rotate-90 text-primary-300 md-mid:rotate-0'
                : 'text-neutral-500'
            }
          />
        </NavigationLink>
        <NavigationSubNav isOpen={isSubNavActive('news-and-events')}>
          <li>
            <NavigationLink
              href='/company/news-events?category=Event'
              onClick={() => galaxyOnClick('topNav.resourcesMenu.eventsSelect')}
              className='block w-full'>
              Events
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='https://clickhouse.com/docs/category/changelog'
              onClick={() =>
                galaxyOnClick('topNav.resourcesMenu.releasesSelect')
              }
              className='block w-full'>
              Releases
            </NavigationLink>
          </li>
        </NavigationSubNav>
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
          <span>Learning</span>
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
              onClick={() => galaxyOnClick('topNav.learnMenu.academySelect')}
              className='block w-full'>
              ClickHouse Academy
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='/company/news-events?category=Free+Training#upcoming-events'
              onClick={() =>
                galaxyOnClick('topNav.learnMenu.freeTrainingSelect')
              }
              className='block w-full'>
              Free live training
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='https://clickhouse.com/docs/knowledgebase'
              onClick={() =>
                galaxyOnClick('topNav.learnMenu.knowledgebaseSelect')
              }
              className='block w-full'>
              Knowledge base
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='/videos?category=how-to'
              onClick={() =>
                galaxyOnClick('topNav.learnMenu.howtoVideosSelect')
              }
              className='block w-full'>
              How to videos
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='/learn/certification'
              onClick={() =>
                galaxyOnClick('topNav.learnMenu.certificationSelect')
              }
              className='block w-full'>
              ClickHouse Certification
            </NavigationLink>
          </li>
        </NavigationSubNav>
      </li>
      <li>
        <NavigationLink
          href='/support/program'
          className='block w-full'
          onClick={() =>
            galaxyOnClick('topNav.learnMenu.supportProgramSelect')
          }>
          Support
        </NavigationLink>
      </li>
    </ul>
  )
}

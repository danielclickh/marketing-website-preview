import { ChevronRightIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { CUICard, CUILink } from '../ClickUI'
import HRSeparator from '../HRSeparator'
import { SuiText, SuiTitle } from '../sui'
import ArrowsDown from './arrowsDown'

export default function SupportProgram(props: any) {
  return (
    <div>
      <div className='bg-grid'>
        <div className='relative mx-auto max-w-3xl px-4 pb-24 pt-28 text-center sm:px-8 2xl:px-0'>
          <SuiTitle type='h1' className='mb-6 md:!text-6xl'>
            {props.title}
          </SuiTitle>
          <h2 className='mb-6 text-base font-bold'>
            Trusted support services for your organization
          </h2>
          <SuiText
            size='base'
            weight='medium'
            color='secondary'
            className='mt-6'>
            Here at ClickHouse, best-in-class support comes with your Cloud
            subscription. Our Support Services team follows the same vision as
            our product, bringing you unparalleled performance, ease of use, and
            exceptionally fast, high-quality results.
          </SuiText>
        </div>

        <div className='mx-auto grid max-w-3xl gap-x-10 px-4 pb-12 text-center sm:px-8 md:grid-cols-2 2xl:px-0 '>
          <Link
            href='https://console.clickhouse.cloud/support'
            target='_blank'
            className='mb-8 hover:no-underline md:mb-0'>
            <CUICard className='group flex w-full bg-click-grid bg-[length:359px_261px] bg-right bg-no-repeat p-8'>
              <CUICard.Body className='flex flex-col items-center justify-center'>
                <Image
                  src='/images/support-program/cloud-light.svg'
                  height={35}
                  width={49}
                  alt='Cloud'
                  className='mx-auto mb-4'
                />
                <div className='flex flex-col items-center justify-center gap-2 pb-4 pt-4'>
                  <div className='cursor-pointer text-xl font-semibold leading-tight'>
                    New support case via
                  </div>

                  <div className='font-semibold text-primary-300 group-hover:underline'>
                    ClickHouse Cloud
                  </div>
                </div>
              </CUICard.Body>
            </CUICard>
          </Link>

          <Link
            href='mailto:support@clickhouse.com'
            target='_blank'
            className='hover:no-underline'>
            <CUICard className='group flex w-full bg-click-grid bg-[length:359px_261px] bg-right bg-no-repeat p-8'>
              <CUICard.Body className='flex flex-col items-center justify-center'>
                <Image
                  src='/images/support-program/envelope-thin.svg'
                  height={35}
                  width={49}
                  alt='Email'
                  className='mx-auto mb-4'
                />

                <div className='flex flex-col items-center justify-center gap-2 pb-4 pt-4'>
                  <div className='cursor-pointer text-xl font-semibold leading-tight'>
                    Email us at
                  </div>

                  <div className='font-semibold text-primary-300 group-hover:underline'>
                    support@clickhouse.com
                  </div>
                </div>
              </CUICard.Body>
            </CUICard>
          </Link>
        </div>
        <div>
          <svg
            className='w-full'
            viewBox='0 0 1440 150'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M-35 0L693.808 86.1145C714.198 88.5237 734.801 88.5093 755.187 86.0717L1475 0V360H-35V0Z'
              fill='#FAFF69'
            />
          </svg>
          <div className='bg-primary-300 pb-16 pt-10 text-neutral-800 md:pt-0'>
            <div className='flip-selection mx-auto max-w-3xl px-8 text-center text-base'>
              <p className='mb-4 '>
                Please note that only Subscription customers have a Service
                Level Agreement on support incidents. If you are not currently a
                ClickHouse Cloud customer – while we will try to answer your
                question, we’d encourage you to go instead to our community
                resources:
              </p>
              <CUILink
                href='/slack'
                target='_blank'
                className='arrow-link mx-auto mb-4 items-center justify-center gap-1 font-bold text-neutral-800 hover:text-neutral-900 md:flex'>
                ClickHouse community Slack channel{' '}
                <ChevronRightIcon height='18' className='arrow pt-0.5' />
              </CUILink>
            </div>
          </div>
        </div>
      </div>
      <div className='section-container bg-shadow-element yellow-shadow shadow-z-low container mx-auto flex flex-col items-center pt-6'>
        <div className='pb-8 pt-16 text-center'>
          <Image
            src='/images/support-program/support-details-icon.svg'
            alt='Support Details'
            height={72}
            width={72}
            className='mx-auto'
          />
        </div>
        <div className='text-center'>
          <h2
            className='mb-2 text-4xl font-semibold
          '>
            ClickHouse Cloud support details
          </h2>
          <p className='pb-16 pt-2 text-base text-neutral-200'>
            ClickHouse includes Support Services for all users and customers of
            ClickHouse Cloud.
          </p>
          <div className='support-program-rich-content relative z-20'>
            <table className='relative z-20 border-b border-b-neutral-700 text-neutral-200'>
              <thead>
                <tr>
                  <th></th>
                  <th className='border border-neutral-700 bg-neutral-750 p-0'>
                    <div className='p-3  text-neutral-100'>Trial</div>
                  </th>
                  <th className='border border-neutral-700 bg-neutral-750 p-0'>
                    <div className='p-3 text-neutral-100'>
                      Monthly "pay as you go" or annual
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='w-64 border border-neutral-700 bg-neutral-750 px-3 text-left text-neutral-100'>
                    <strong>Learning</strong>
                  </td>
                  <td className='border-r border-r-neutral-700 bg-neutral-750 p-4 '>
                    <p>
                      <a href='https://console.clickhouse.cloud/learn'>
                        On-demand training included
                      </a>
                    </p>
                    <p>
                      <a href='https://clickhouse.com/docs/'>Docs</a>
                    </p>
                  </td>
                  <td className='border-r border-r-neutral-700  bg-neutral-750 p-4'>
                    <p>
                      <a href='https://console.clickhouse.cloud/learn'>
                        On-demand training included
                      </a>
                    </p>
                    <p>
                      <a href='https://clickhouse.com/docs/'>Docs</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className='w-64 border border-neutral-700 bg-neutral-750 px-3 text-left text-neutral-100'>
                    <strong>Support</strong>
                  </td>
                  <td className='border-l border-r border-l-neutral-700 border-r-neutral-700 bg-neutral-750 p-4'>
                    <ul>
                      <li>Unlimited support cases </li>
                      <li>
                        Business day support only (Monday-Friday)
                        <ul className='ml-4 text-sm text-neutral-400'>
                          <li>1 Business day</li>
                        </ul>{' '}
                      </li>
                      <li>Office hours</li>
                    </ul>
                  </td>
                  <td className='border-r border-r-neutral-700  bg-neutral-750 p-4'>
                    <ul>
                      <li>Unlimited support cases</li>
                      <li>
                        24x7 support{' '}
                        <ul className='ml-4 text-sm text-neutral-400'>
                          <li>Sev-1: 1 hour 24x7</li>
                          <li> Sev-2: 4 business hours</li>
                          <li>Sev-3: 1 business day</li>
                        </ul>
                      </li>
                      <li>Office hours</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className='w-64 border border-neutral-700 bg-neutral-750 px-3 text-left text-neutral-100'>
                    <strong>Expert sessions</strong>
                  </td>
                  <td className='border-r border-r-neutral-700  bg-neutral-750 p-4'>
                    Unlimited live Expert Sessions (short consultative guidance
                    sessions)
                    <br />
                    Access to on-demand Expert Sessions included
                  </td>
                  <td className='border-r border-r-neutral-700  bg-neutral-750 p-4'>
                    Unlimited live Expert Sessions <br />
                    Access to on-demand Expert Sessions included
                  </td>
                </tr>
                <tr>
                  <td className='w-64 border border-neutral-700 bg-neutral-750 px-3 text-left text-neutral-100'>
                    <strong>Professional services</strong>
                  </td>
                  <td className='border-r border-r-neutral-700  bg-neutral-750 p-4'>
                    ClickHouse Cloud consultancy packages available for purchase{' '}
                    <br />
                    SOW available for purchase <br />
                    &nbsp;&nbsp;&nbsp;&nbsp; Virtual + additional T&amp;E for
                    onsite
                  </td>
                  <td className='border-r border-r-neutral-700  bg-neutral-750 p-4'>
                    ClickHouse Cloud quickstart package available for purchase{' '}
                    <br />
                    SOW available for purchase <br />
                    &nbsp;&nbsp;&nbsp;&nbsp; Virtual + additional T&amp;E for
                    onsite
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <HRSeparator className='my-30' />
      <div className='section-container bg-shadow-element align-shadow-left shadow-z-low container mx-auto flex flex-col items-center'>
        <h2
          className='mb-10 text-4xl font-semibold
          '>
          Severity classification
        </h2>

        <div className='mx-auto grid max-w-5xl grid-cols-1 rounded-lg border border-neutral-700 bg-neutral-800 md:grid-cols-4'>
          <div className='p-6 pb-0 md:border-b md:border-b-neutral-700 md:pb-6'>
            <span className='text-xl font-bold'>Severity 1</span>
            <br />
            <span className='font-inconsolata text-base text-primary-300'>
              Critical business impact
            </span>
          </div>
          <div className='col-span-3 border-b border-b-neutral-700 p-6 text-neutral-200'>
            A Severity Level 1 issue is a critical production error within the
            software that severely impacts the Customer’s use of the software
            for production purposes, such as the loss of production data or
            where production systems are not functioning and no work-around
            exists. ClickHouse will respond to Severity Level 1 issues within
            one hour during Normal Business Hours, and use continuous efforts
            during applicable Normal Business Hours to provide a resolution for
            any Level 1 issues as soon as is commercially reasonable.
          </div>
          <div className='p-6 pb-0 md:border-b md:border-b-neutral-700 md:pb-6'>
            <span className='text-xl font-bold'>Severity 2</span>
            <br />{' '}
            <span className='font-inconsolata text-base text-primary-300'>
              Major business impact
            </span>
          </div>
          <div className='col-span-3 border-b border-b-neutral-700 p-6  text-neutral-200'>
            A Severity Level 2 issue is an error within the software where the
            customer’s system is functioning for production purposes but in a
            reduced capacity, such as a problem that is causing significant
            impact to portions of the customer’s business operations and
            productivity, or where the software is exposed to potential loss or
            interruption of service. ClickHouse will respond to Severity Level 2
            issues within four hours during Normal Business Hours, and use
            continuous efforts during the Normal Business Hours to provide a
            resolution for any Severity Level 2 issues.
          </div>
          <div className='p-6 pb-0 md:border-b md:border-b-neutral-700 md:pb-6'>
            <span className='text-xl font-bold'>Severity 3</span>
            <br />{' '}
            <span className='font-inconsolata text-base text-primary-300'>
              Minor business impact or general questions
            </span>
          </div>
          <div className='col-span-3 p-6  text-neutral-200'>
            A Severity Level 3 issue is a medium-to-low impact error that
            involves partial and/or non-critical loss of functionality for
            production purposes or development purposes, such as a problem that
            impairs some operations but allows the customer’s operations to
            continue to function. Errors for which there is limited or no loss
            or functionality or impact to the customer’s operation and for which
            there is an easy work-around qualify as Severity Level 3. General
            questions are also Severity Level 3 issues. ClickHouse will respond
            to Severity Level 3 issues within one Business Day during Normal
            Business Hours, and use reasonable efforts to provide a resolution
            for any Severity Level 3 issues in time for an upcoming release of
            the software. All inbound production email cases shall have an
            initial status of Severity Level 3.
          </div>
        </div>
      </div>
      <HRSeparator className='my-30' />
      <div className='section-container container mx-auto flex flex-col items-center '>
        <h2
          className='mb-4 text-center text-4xl font-semibold
          '>
          Service level agreements (“SLA”)
        </h2>
        <p className='mb-20 text-center text-base text-neutral-200'>
          Classification of severity levels for issues reported and response
          times
        </p>
        <div className='mx-auto w-full max-w-5xl items-center justify-evenly text-center md:flex md:space-x-20'>
          <div className='mb-10 rounded-lg border border-neutral-700 bg-neutral-900/50 p-6 md:mb-0 md:w-1/3'>
            <p className='mb-2 font-inconsolata text-primary-300'>Urgent</p>
            <p className='mb-16 text-2xl font-semibold'>Severity 1</p>
            <p className='mb-2 text-base font-bold'>1 hour SLA</p>
            <p className='text-base font-light text-neutral-200'>
              24 h / 7 days / 365 days / year
            </p>
          </div>
          <div className='mb-10 rounded-lg border border-neutral-700 bg-neutral-900/50 p-6 md:mb-0 md:w-1/3'>
            <p className='mb-2 font-inconsolata text-primary-300'>
              High priority
            </p>
            <p className='mb-16 text-2xl font-semibold'>Severity 2</p>
            <p className='mb-2 text-base font-bold'>4 hour SLA</p>
            <p className='text-base font-light text-neutral-200'>
              Business hours only
            </p>
          </div>
          <div className='mb-10 rounded-lg border border-neutral-700 bg-neutral-900/50 p-6 md:mb-0 md:w-1/3'>
            <p className='mb-2 font-inconsolata text-primary-300'>
              Normal priority
            </p>
            <p className='mb-16 text-2xl font-semibold'>Severity 3</p>
            <p className='mb-2 text-base font-bold'> 1 business day SLA</p>
            <p className='text-base font-light text-neutral-200'>
              Business hours only
            </p>
          </div>
        </div>
      </div>
      <HRSeparator className='my-30' />
      <div className='section-container bg-shadow-element yellow-shadow align-shadow-right container mx-auto mb-30 flex  flex-col items-center'>
        <h2
          className='mb-20 text-center text-4xl font-semibold
          '>
          Support and escalation levels
        </h2>
        <div className='grid w-full max-w-2xl grid-cols-1 gap-y-2'>
          <div>
            <div className='w-full rounded-lg border border-neutral-700 bg-neutral-900/50 p-6'>
              <div className='grid items-center md:grid-cols-4'>
                <div className='md:col-span-1'>
                  <div className='text-xl font-bold'>Level 1 / L1 </div>
                </div>
                <div className='text-base text-neutral-200 md:col-span-3'>
                  ClickHouse front-line team identifying and/or routing new
                  cases, inquiries, or questions
                </div>
              </div>
            </div>
          </div>
          <div className='mx-auto text-center'>
            <ArrowsDown />
          </div>
          <div>
            <div className='w-full rounded-lg border border-neutral-700 bg-neutral-900/50 p-6'>
              <div className='grid items-center md:grid-cols-4'>
                <div className='md:col-span-1'>
                  <div className='text-xl font-bold'>Level 2 / L2</div>
                </div>
                <div className='text-base text-neutral-200 md:col-span-3'>
                  ClickHouse Support Services team first touch
                </div>
              </div>
            </div>
          </div>
          <div className='mx-auto text-center'>
            <ArrowsDown />
          </div>
          <div>
            <div className='w-full rounded-lg border border-neutral-700 bg-neutral-900/50 p-6'>
              <div className='grid items-center md:grid-cols-4'>
                <div className='md:col-span-1'>
                  <div className='text-xl font-bold'>Level 3 / L3</div>
                </div>
                <div className='text-base text-neutral-200 md:col-span-3'>
                  ClickHouse Support Services escalation status
                </div>
              </div>
            </div>
          </div>
          <div className='mx-auto text-center'>
            <ArrowsDown />
          </div>
          <div>
            <div className='w-full rounded-lg border border-neutral-700 bg-neutral-900/50 p-6'>
              <div className='grid items-center md:grid-cols-4'>
                <div className='md:col-span-1'>
                  <div className='text-xl font-bold'>Level 4 / L4</div>
                </div>
                <div className='text-base text-neutral-200 md:col-span-3'>
                  Escalation to ClickHouse Engineering or Cloud
                </div>
              </div>
            </div>
          </div>
          <div className='mx-auto text-center'>
            <ArrowsDown />
          </div>
          <div>
            <div className='w-full rounded-lg border border-neutral-700 bg-neutral-900/50 p-6'>
              <div className='grid items-center md:grid-cols-4'>
                <div className='md:col-span-1'>
                  <div className='text-xl font-bold'>Level 5 / L5</div>
                </div>
                <div className='text-base text-neutral-200 md:col-span-3'>
                  Escalation to ClickHouse Executive Leadership
                </div>
              </div>
            </div>
          </div>
        </div>
        <p
          className='max-w-3xl pt-32 text-center text-base leading-relaxed text-neutral-200
        '>
          Our ClickHouse Support Services team is focused not only on your quick
          questions or break-fix issues, but also on your hardest questions such
          as how to define your schema, how to model your data, or how to
          migrate from a legacy system. Our Expert Sessions, included with our
          Support for all ClickHouse Cloud users, allows you to access our
          ClickHouse experts via a virtual consultative support question -
          please open a case to get started.
        </p>
      </div>
    </div>
  )
}

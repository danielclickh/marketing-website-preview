import { SuiTitle, SuiText } from '../sui'
import Image from 'next/image'
import Link from 'next/link'
import HRSeparator from '../HRSeparator'
import ArrowsDown from './arrowsDown'

export default function SupportProgram(props: any) {
  return (
    <div>
      <div className='bg-grid'>
        <div className='max-w-7xl pb-24 mx-auto px-4 sm:px-8 2xl:px-0 relative'>
          <div className='flex container mx-auto flex-col max-w-7xl px-4 sm:px-8 2xl:px-0 relative pt-28'>
            <div className='flex'>
              <div className='md:w-2/3 flex-col text-center md:text-left'>
                <SuiTitle type='h1' className='md:!text-6xl mb-6'>
                  {props.title}
                </SuiTitle>
                <h2 className='text-base font-bold mb-6'>
                  Trusted Support Services for your Organization
                </h2>
                <SuiText
                  size='base'
                  weight='medium'
                  color='secondary'
                  className='mt-6 md:pr-16'>
                  Here at ClickHouse, best-in-class support comes with your
                  Cloud subscription. Our Support Services team follows the same
                  vision as our product, bringing you unparalleled performance,
                  ease of use, and exceptionally fast, high-quality results.
                </SuiText>
                <div className='mt-10'>
                  <a
                    href='https://clickhouse.cloud/support'
                    target='_blank'
                    className='flex items-center space-x-2 text-primary-300 text-base'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      className='w-5 h-5 text-neutral-600'>
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288'
                      />
                    </svg>

                    <span className='text-base text-left'>
                      New Support Case via ClickHouse Cloud console
                    </span>
                  </a>
                  <a
                    href='https://clickhouse.cloud/support'
                    target='_blank'
                    className='flex items-center space-x-2 text-primary-300 text-base mt-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      className='w-5 h-5 text-neutral-600'>
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
                      />
                    </svg>

                    <span className='text-base text-left'>
                      <span className='text-neutral-200'>Email</span>{' '}
                      support@clickhouse.com
                    </span>
                  </a>
                </div>
              </div>
              <div className='hidden md:flex w-6/12 justify-end'>
                <div className=''>
                  <img
                    src='/images/support-program.png'
                    alt='Support Program'
                    width={417}
                    height={417}
                    className='h-auto'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <svg
            className='w-full'
            viewBox='0 0 1440 150'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M-35 0L693.808 86.1145C714.198 88.5237 734.801 88.5093 755.187 86.0717L1475 0V360H-35V0Z'
              fill='#FCFF74'
            />
          </svg>
          <div className='bg-primary-300 text-neutral-800 pb-16 pt-10 md:pt-0'>
            <div className='max-w-3xl mx-auto text-center text-base px-8'>
              <p className='mb-4'>
                Please note that only Subscription Customers have a Service
                Level Agreement on Support Incidents. if you are not currently a
                ClickHouse Cloud user – while we will try to answer your
                question, we’d encourage you to go instead to one of our
                Community resources:
              </p>
              <p className='mb-4 font-bold'>
                <Link href='/slack' target='_blank'>
                  ClickHouse Community Slack Channel
                </Link>{' '}
                |{' '}
                <Link href='/blog/the-click-house-community' target='_blank'>
                  Other Community Options
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex container mx-auto flex-col section-container items-center bg-shadow-element yellow-shadow shadow-z-low pt-6'>
        <div className='text-center pt-16 pb-8'>
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
            className='font-semibold text-4xl mb-2
          '>
            ClickHouse Cloud Support Details
          </h2>
          <p className='text-base pb-16 text-neutral-200 pt-2'>
            ClickHouse includes Support Services for all users and customers of
            ClickHouse Cloud.
          </p>
          <div className='support-program-rich-content z-20 relative'>
            <table className='border-b border-b-neutral-700 text-neutral-200 z-20 relative'>
              <thead>
                <tr>
                  <th></th>
                  <th className='p-0 border border-neutral-700 bg-neutral-750'>
                    <div className='p-3'>Trial</div>
                  </th>
                  <th className='p-0 border border-neutral-700 bg-neutral-750'>
                    <div className='p-3'>Monthly "Pay as you Go" or Annual</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='text-left border border-neutral-700 px-3 w-64 bg-neutral-750'>
                    <strong>Learning</strong>
                  </td>
                  <td className='bg-neutral-750 p-4 border-r border-r-neutral-700 '>
                    <p>
                      <a href='https://clickhouse.cloud/learn'>
                        On-Demand Training included
                      </a>
                    </p>
                    <p>
                      <a href='https://clickhouse.com/docs/'>Docs</a>
                    </p>
                  </td>
                  <td className='bg-neutral-750 p-4  border-r border-r-neutral-700'>
                    <p>
                      <a href='https://clickhouse.cloud/learn'>
                        On-Demand Training included
                      </a>
                    </p>
                    <p>
                      <a href='https://clickhouse.com/docs/'>Docs</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className='text-left border border-neutral-700 px-3 w-64 bg-neutral-750'>
                    <strong>Support</strong>
                  </td>
                  <td className='bg-neutral-750 p-4 border-r border-r-neutral-700 border-l border-l-neutral-700'>
                    <ul>
                      <li>Unlimited Support Cases </li>
                      <li>
                        Business Day support only (Monday-Friday)
                        <ul className='text-sm ml-4 text-neutral-400'>
                          <li>1 Business Day</li>
                        </ul>{' '}
                      </li>
                      <li>Office Hours</li>
                    </ul>
                  </td>
                  <td className='bg-neutral-750 p-4  border-r border-r-neutral-700'>
                    <ul>
                      <li>Unlimited Support Cases</li>
                      <li>
                        24x7 support{' '}
                        <ul className='text-sm ml-4 text-neutral-400'>
                          <li>Sev-1: 1 Hour 24x7</li>
                          <li> Sev-2: 4 Business Hours</li>
                          <li>Sev-3: 1 Business Day</li>
                        </ul>
                      </li>
                      <li>Office Hours</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className='text-left border border-neutral-700 px-3 w-64 bg-neutral-750'>
                    <strong>Expert Sessions</strong>
                  </td>
                  <td className='bg-neutral-750 p-4  border-r border-r-neutral-700'>
                    Unlimited live Expert Sessions (short consultative guidance
                    sessions)
                    <br />
                    Access to On-Demand Expert Sessions included
                  </td>
                  <td className='bg-neutral-750 p-4  border-r border-r-neutral-700'>
                    Unlimited live Expert Sessions <br />
                    Access to On-Demand Expert Sessions included
                  </td>
                </tr>
                <tr>
                  <td className='text-left border border-neutral-700 px-3 w-64 bg-neutral-750'>
                    <strong>Professional Services</strong>
                  </td>
                  <td className='bg-neutral-750 p-4  border-r border-r-neutral-700'>
                    ClickHouse Cloud Quickstart package available for purchase{' '}
                    <br />
                    SOW available for purchasep <br />
                    &nbsp;&nbsp;&nbsp;&nbsp; Virtual + additional T&amp;E for
                    onsite
                  </td>
                  <td className='bg-neutral-750 p-4  border-r border-r-neutral-700'>
                    ClickHouse Cloud Quickstart package available for purchase{' '}
                    <br />
                    SOW available for purchasep <br />
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
      <div className='flex container mx-auto flex-col section-container items-center bg-shadow-element align-shadow-left shadow-z-low'>
        <h2
          className='font-semibold text-4xl mb-10
          '>
          Severity Classification
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-4 max-w-5xl mx-auto bg-neutral-800 border border-neutral-700 rounded-md'>
          <div className='p-6 pb-0 md:pb-6 md:border-b md:border-b-neutral-700'>
            <span className='font-bold text-xl'>Severity 1</span>
            <br />
            <span className='font-inconsolata text-primary-300 text-base'>
              Critical business impact
            </span>
          </div>
          <div className='p-6 col-span-3 border-b border-b-neutral-700 text-neutral-200'>
            A Severity Level 1 issue is a critical production error within the
            software that severely impacts the Customer’s use of the software
            for production purposes, such as the loss of production data or
            where production systems are not functioning and no work-around
            exists. ClickHouse will respond to Severity Level 1 issues within
            one hour during Normal Business Hours, and use continuous efforts
            during applicable Normal Business Hours to provide a resolution for
            any Level 1 issues as soon as is commercially reasonable.
          </div>
          <div className='p-6 pb-0 md:pb-6 md:border-b md:border-b-neutral-700'>
            <span className='font-bold text-xl'>Severity 2</span>
            <br />{' '}
            <span className='font-inconsolata text-primary-300 text-base'>
              Major Business Impact
            </span>
          </div>
          <div className='p-6 col-span-3 border-b border-b-neutral-700  text-neutral-200'>
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
          <div className='p-6 pb-0 md:pb-6 md:border-b md:border-b-neutral-700'>
            <span className='font-bold text-xl'>Severity 3</span>
            <br />{' '}
            <span className='font-inconsolata text-primary-300 text-base'>
              Minor Business Impact or General Questions
            </span>
          </div>
          <div className='p-6 col-span-3  text-neutral-200'>
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
      <div className='flex container mx-auto flex-col section-container items-center '>
        <h2
          className='font-semibold text-4xl mb-4 text-center
          '>
          Service Level Agreements (“SLA”)
        </h2>
        <p className='text-base mb-20 text-neutral-200 text-center'>
          Classification of severity levels for issues reported and response
          times
        </p>
        <div className='md:flex items-center md:space-x-20 justify-evenly max-w-5xl w-full mx-auto text-center'>
          <div className='mb-10 md:mb-0 md:w-1/3 border border-neutral-700 rounded-md p-6 bg-neutral-900/50'>
            <p className='font-inconsolata text-primary-300 mb-2'>Urgent</p>
            <p className='text-2xl font-semibold mb-16'>Severity 1</p>
            <p className='font-bold text-base mb-2'>1 hour SLA</p>
            <p className='font-light text-base text-neutral-200'>
              24 h / 7 days / 365 days / year
            </p>
          </div>
          <div className='mb-10 md:mb-0 md:w-1/3 border border-neutral-700 rounded-md p-6 bg-neutral-900/50'>
            <p className='font-inconsolata text-primary-300 mb-2'>
              High priority
            </p>
            <p className='text-2xl font-semibold mb-16'>Severity 2</p>
            <p className='font-bold text-base mb-2'>4 hour SLA</p>
            <p className='font-light text-base text-neutral-200'>
              Business hours only
            </p>
          </div>
          <div className='mb-10 md:mb-0 md:w-1/3 border border-neutral-700 rounded-md p-6 bg-neutral-900/50'>
            <p className='font-inconsolata text-primary-300 mb-2'>
              Normal priority
            </p>
            <p className='text-2xl font-semibold mb-16'>Severity 3</p>
            <p className='font-bold text-base mb-2'> 1 business day SLA</p>
            <p className='font-light text-base text-neutral-200'>
              Business hours only
            </p>
          </div>
        </div>
      </div>
      <HRSeparator className='my-30' />
      <div className='flex container mx-auto flex-col section-container items-center bg-shadow-element yellow-shadow  align-shadow-right mb-30'>
        <h2
          className='font-semibold text-4xl text-center mb-20
          '>
          Support and Escalation Levels
        </h2>
        <div className='grid grid-cols-1 gap-y-2 w-full max-w-2xl'>
          <div>
            <div className='w-full rounded-md border border-neutral-700 p-6 bg-neutral-900/50'>
              <div className='grid md:grid-cols-4 items-center'>
                <div className='md:col-span-1'>
                  <div className='text-xl font-bold'>Level 1 / L1 </div>
                </div>
                <div className='md:col-span-3 text-base text-neutral-200'>
                  ClickHouse front-line team identifying and/or routing new
                  cases, inquiries, or questions
                </div>
              </div>
            </div>
          </div>
          <div className='text-center mx-auto'>
            <ArrowsDown />
          </div>
          <div>
            <div className='w-full rounded-md border border-neutral-700 p-6 bg-neutral-900/50'>
              <div className='grid md:grid-cols-4 items-center'>
                <div className='md:col-span-1'>
                  <div className='text-xl font-bold'>Level 2 / L2</div>
                </div>
                <div className='md:col-span-3 text-base text-neutral-200'>
                  ClickHouse Support Services team first touch
                </div>
              </div>
            </div>
          </div>
          <div className='text-center mx-auto'>
            <ArrowsDown />
          </div>
          <div>
            <div className='w-full rounded-md border border-neutral-700 p-6 bg-neutral-900/50'>
              <div className='grid md:grid-cols-4 items-center'>
                <div className='md:col-span-1'>
                  <div className='text-xl font-bold'>Level 3 / L3</div>
                </div>
                <div className='md:col-span-3 text-base text-neutral-200'>
                  ClickHouse Support Services escalation status
                </div>
              </div>
            </div>
          </div>
          <div className='text-center mx-auto'>
            <ArrowsDown />
          </div>
          <div>
            <div className='w-full rounded-md border border-neutral-700 p-6 bg-neutral-900/50'>
              <div className='grid md:grid-cols-4 items-center'>
                <div className='md:col-span-1'>
                  <div className='text-xl font-bold'>Level 4 / L4</div>
                </div>
                <div className='md:col-span-3 text-base text-neutral-200'>
                  Escalation to ClickHouse Engineering or Cloud
                </div>
              </div>
            </div>
          </div>
          <div className='text-center mx-auto'>
            <ArrowsDown />
          </div>
          <div>
            <div className='w-full rounded-md border border-neutral-700 p-6 bg-neutral-900/50'>
              <div className='grid md:grid-cols-4 items-center'>
                <div className='md:col-span-1'>
                  <div className='text-xl font-bold'>Level 5 / L5</div>
                </div>
                <div className='md:col-span-3 text-base text-neutral-200'>
                  Escalation to ClickHouse Executive Leadership
                </div>
              </div>
            </div>
          </div>
        </div>
        <p
          className='max-w-3xl pt-32 leading-relaxed text-center text-neutral-200 text-base
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

import { CUICard } from '@/components/ClickUI'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { CommonProps } from '@/types/homepage'
import Image from 'next/image'
import Link from 'next/link'

export default function Page({ footerData, headerData }: CommonProps) {
  useGalaxyOnPage('supportProgramPage')
  return (
    <Layout
      footerData={footerData}
      seo={{
        title: 'ClickHouse Support Program',
        description: 'Trusted support services for your organization',
        path: '/support/program'
      }}
      headerData={headerData}>
      <div className='bg-grid'>
        <div className='relative mx-auto max-w-4xl px-4 pb-24 pt-28 text-center sm:px-8 md:px-16 2xl:px-0'>
          <SuiTitle type='h1' className='mb-6 md:!text-6xl'>
            Support Program
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
            exceptionally fast, high-quality results. Read more in our{' '}
            <Link
              className='font-semibold text-primary-300 group-hover:underline'
              href='/blog/clickhouse-support-services-fast-simple-friendly'>
              blog
            </Link>
            .
          </SuiText>
        </div>

        <div className='mx-auto grid max-w-3xl gap-x-10 px-4 pb-12 text-center sm:px-8 md:grid-cols-2 2xl:px-0'>
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
              <p className='mb-4'>
                Please note that only Subscription or Cloud Trial customers have
                initial response time targets on support incidents. If you are
                not currently a ClickHouse Cloud customer – while we will try to
                answer your question, we’d encourage you to go instead to our
                community resources:
              </p>
              <LinkWithArrow href='/slack' className='font-bold'>
                ClickHouse community Slack channel
              </LinkWithArrow>
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
          <h2 className='mb-2 text-4xl font-semibold'>
            ClickHouse Cloud support details
          </h2>
          <p className='mx-auto max-w-3xl pb-16 pt-2 text-base text-neutral-200'>
            ClickHouse includes support services for all users and customers of
            ClickHouse Cloud. Our ClickHouse Support Services Policy can be
            found{' '}
            <Link
              href='/legal/support-services-policy'
              className='font-semibold text-primary-300 group-hover:underline'>
              here
            </Link>
            .
          </p>
          <div className='support-program-rich-content relative z-20'>
            <table className='relative z-20 border-b border-b-neutral-700 text-neutral-200'>
              <thead>
                <tr>
                  <th></th>
                  <th className='max-w-72 border border-neutral-700 bg-neutral-750 p-0'>
                    <div className='p-3 text-neutral-100'>Trial</div>
                  </th>
                  <th className='max-w-72 border border-neutral-700 bg-neutral-750 p-0'>
                    <div className='p-3 text-neutral-100'>
                      ClickHouse Cloud monthly "pay as you go" or annual
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='w-64 border border-neutral-700 bg-neutral-750 px-3 text-left text-neutral-100'>
                    <strong>Learning</strong>
                  </td>
                  <td className='border-r border-r-neutral-700 bg-neutral-750 p-4'>
                    <p>
                      <Link
                        href='https://console.clickhouse.cloud/learn'
                        className='text-primary-300 hover:underline'>
                        On-demand training included
                      </Link>
                    </p>
                    <p>
                      <Link
                        href='https://clickhouse.com/docs'
                        className='text-primary-300 hover:underline'>
                        Docs
                      </Link>
                    </p>
                  </td>
                  <td className='border-r border-r-neutral-700 bg-neutral-750 p-4'>
                    <p>
                      <Link
                        href='https://console.clickhouse.cloud/learn'
                        className='text-primary-300 hover:underline'>
                        On-demand training included
                      </Link>
                    </p>
                    <p>
                      <Link
                        href='https://clickhouse.com/docs'
                        className='text-primary-300 hover:underline'>
                        Docs
                      </Link>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className='w-64 border border-neutral-700 bg-neutral-750 px-3 text-left text-neutral-100'>
                    <strong>Support</strong>
                  </td>
                  <td className='border-l border-r border-l-neutral-700 border-r-neutral-700 bg-neutral-750 p-4'>
                    <ul>
                      <li>Unlimited support cases</li>
                      <li>Business day support only</li>
                    </ul>
                  </td>
                  <td className='border-r border-r-neutral-700 bg-neutral-750 p-4'>
                    <ul>
                      <li>Unlimited support cases</li>
                      <li>24x7 support for Sev-1</li>
                      <li>Business Day support for Sev-2 and Sev-3</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className='w-64 border border-neutral-700 bg-neutral-750 px-3 text-left text-neutral-100'>
                    <strong>Expert sessions</strong>
                  </td>
                  <td className='border-r border-r-neutral-700 bg-neutral-750 p-4'>
                    1 live expert session included for <br />
                    virtual consultative support guidance
                  </td>
                  <td className='border-r border-r-neutral-700 bg-neutral-750 p-4'>
                    Unlimited live expert sessions for virtual <br />
                    consultative support guidance
                  </td>
                </tr>
                <tr>
                  <td className='w-64 border border-neutral-700 bg-neutral-750 px-3 text-left text-neutral-100'>
                    <strong>TAM Architect</strong>
                  </td>
                  <td className='border-r border-r-neutral-700 bg-neutral-750 p-4'>
                    Not available
                  </td>
                  <td className='border-r border-r-neutral-700 bg-neutral-750 p-4'>
                    Available as an additional purchase
                    <br /> for Support
                  </td>
                </tr>
                <tr>
                  <td className='w-64 border border-neutral-700 bg-neutral-750 px-3 text-left text-neutral-100'>
                    <strong>Professional services</strong>
                  </td>
                  <td className='max-w-72 border-r border-r-neutral-700 bg-neutral-750 p-4'>
                    ClickHouse Cloud consultancy packages available for purchase{' '}
                    <br />
                    SOW available for purchase <br />
                    &nbsp;&nbsp;&nbsp;&nbsp; Virtual + additional T&amp;E for
                    onsite
                  </td>
                  <td className='max-w-72 border-r border-r-neutral-700 bg-neutral-750 p-4'>
                    ClickHouse Cloud consultancy packages available for purchase{' '}
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
        <h2 className='mb-10 text-4xl font-semibold'>
          Severity classification
        </h2>

        <div className='mx-auto grid max-w-5xl grid-cols-1 rounded-lg border border-neutral-700 bg-neutral-800 md:grid-cols-4'>
          <div className='p-6 pb-0 md:border-b md:border-b-neutral-700 md:pb-6'>
            <span className='text-xl font-bold'>Severity 1 ("Sev-1")</span>
            <br />
            <span className='font-inconsolata text-base text-primary-300'>
              Critical business impact
            </span>
          </div>
          <div className='col-span-3 border-b border-b-neutral-700 p-6 text-neutral-200'>
            A Severity Level 1 issue is a critical production error within the
            Software or ClickHouse Cloud that severely impacts the Customer's
            use of the Software or ClickHouse Cloud for production purposes,
            such as the loss of production data or where production systems are
            not functioning and no work-around exists. ClickHouse will respond
            to Severity Level 1 issues within one hour during Normal Business
            Hours, and implement continuous follow-the-sun case management
            during applicable Normal Business Hours to provide a workaround or
            resolution for any Level 1 issues as soon as is commercially
            reasonable.
          </div>
          <div className='p-6 pb-0 md:border-b md:border-b-neutral-700 md:pb-6'>
            <span className='text-xl font-bold'>Severity 2 ("Sev-2")</span>
            <br />{' '}
            <span className='font-inconsolata text-base text-primary-300'>
              Major business impact
            </span>
          </div>
          <div className='col-span-3 border-b border-b-neutral-700 p-6 text-neutral-200'>
            A Severity Level 2 issue is an error within the Software or
            ClickHouse Cloud where the Customer's system is functioning for
            production purposes but in a reduced capacity, such as a problem
            that is causing significant impact to portions of the Customer's
            business operations and productivity, or where the system is exposed
            to potential loss or interruption of service. ClickHouse will
            respond to Severity Level 2 issues within four hours during Normal
            Business Hours, and use reasonable efforts to provide a workaround
            or resolution for any Severity Level 2 issues.
          </div>
          <div className='p-6 pb-0 md:pb-6'>
            <span className='text-xl font-bold'>Severity 3 ("Sev-3")</span>
            <br />{' '}
            <span className='font-inconsolata text-base text-primary-300'>
              Minor business impact or general questions
            </span>
          </div>
          <div className='col-span-3 p-6 text-neutral-200'>
            A Severity Level 3 issue is a medium-to-low impact error that
            involves partial and/or non-critical loss of functionality for
            production purposes or development purposes, such as a problem that
            impairs some operations but allows the Customer's operations to
            continue to function. Errors for which there is limited or no loss
            or functionality or impact to the Customer's operation and for which
            there is an easy workaround qualify as Severity Level 3. General
            questions are also Severity Level 3 issues. ClickHouse will respond
            to Severity Level 3 issues within one Business Day during Normal
            Business Hours, and use reasonable efforts to provide a resolution
            for any Severity Level 3 issues in a subsequent release of the
            Software or ClickHouse Cloud, as applicable. All inbound production
            email cases shall have an initial status of Severity Level 3.
          </div>
        </div>
      </div>
      <HRSeparator className='my-30' />
      <div className='section-container container mx-auto flex flex-col items-center'>
        <h2 className='mb-4 text-center text-4xl font-semibold'>
          Initial response times
        </h2>
        <p className='mb-12 text-center text-base text-neutral-200'>
          Classification of severity levels for issues reported and response
          times.
        </p>
        <div className='horiz mx-auto grid w-full max-w-5xl grid-cols-1 overflow-x-auto rounded-lg border border-neutral-700 border-b-neutral-700 bg-neutral-800 text-neutral-200'>
          <table className='relative z-20 mx-auto w-full text-neutral-200'>
            <thead>
              <tr>
                <th className='border-r border-neutral-700 p-0'>
                  <p className='border-b border-neutral-700 p-3 text-neutral-100'>
                    Severity level
                  </p>
                </th>
                <th className='border-b border-r border-neutral-700 p-0 hover:bg-neutral-750'>
                  <p className='p-3 text-neutral-100'>Trial</p>
                </th>
                <th className='border-b border-r border-neutral-700 p-0 hover:bg-neutral-750'>
                  <p className='p-3 text-neutral-100'>Basic</p>
                </th>
                <th className='border-b border-r border-neutral-700 p-0 hover:bg-neutral-750'>
                  <p className='p-3 text-neutral-100'>Scale</p>
                </th>
                <th className='border-b border-neutral-700 p-0'>
                  <p className='p-3 text-neutral-100'>Enterprise</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='w-full text-center'>
                <td className='border-r border-neutral-700 p-0'>
                  <p className='p-3 font-semibold text-neutral-100'>
                    Severity 1
                  </p>
                </td>
                <td className='border-r border-neutral-700 p-0 hover:bg-neutral-750'>
                  <p className='p-3'>Not available</p>
                </td>
                <td className='border-r border-neutral-700 p-0 hover:bg-neutral-750'>
                  <p className='0 p-3'>Not available</p>
                </td>
                <td className='border-r border-neutral-700 p-0 hover:bg-neutral-750'>
                  <p className='p-3'>1 hour 24x7</p>
                </td>
                <td className='border-neutral-700 p-0 hover:bg-neutral-750'>
                  <p className='p-3'>30 minute 24x7</p>
                </td>
              </tr>

              <tr className='text-center'>
                <td className='border-r border-neutral-700 p-0'>
                  <p className='p-3 font-semibold text-neutral-100'>
                    Severity 2
                  </p>
                </td>
                <td className='border-r border-neutral-700 p-0 hover:bg-neutral-750'>
                  <p className='p-3'>Not available</p>
                </td>
                <td className='border-r border-neutral-700 p-0 hover:bg-neutral-750'>
                  <p className='p-3'>Not available</p>
                </td>
                <td className='border-r border-neutral-700 p-0 hover:bg-neutral-750'>
                  <p className='p-3'>4 business hours</p>
                </td>
                <td className='border-neutral-700 p-0 hover:bg-neutral-750'>
                  <p className='p-3'>2 business hours</p>
                </td>
              </tr>

              <tr className='text-center'>
                <td className='border-r border-neutral-700 p-0'>
                  <p className='p-3 font-semibold text-neutral-100'>
                    Severity 3
                  </p>
                </td>
                <td className='border-r border-neutral-700 p-0 hover:bg-neutral-750'>
                  <p className='p-3'>1 business day</p>
                </td>
                <td className='border-r border-neutral-700 p-0 hover:bg-neutral-750'>
                  <p className='p-3'>1 business day</p>
                </td>
                <td className='border-r border-neutral-700 p-0 hover:bg-neutral-750'>
                  <p className='p-3'>1 business day</p>
                </td>
                <td className='border-neutral-700 p-0 hover:bg-neutral-750'>
                  <p className='p-3'>1 business day</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <SuiText
          size='sm'
          color='muted'
          className='mt-6 flex justify-end text-center'>
          (*) Business hours are Monday 00:00 UTC to Saturday 00:00 UTC
        </SuiText>
      </div>

      <HRSeparator className='my-30' />
      <div className='section-container bg-shadow-element yellow-shadow align-shadow-right container mx-auto mb-30 flex flex-col items-center'>
        <h2 className='mb-20 text-center text-4xl font-semibold'>
          Support and escalation levels
        </h2>
        <div className='grid w-full max-w-2xl grid-cols-1 gap-y-2'>
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
          <div className='mx-auto text-center'>
            <Image
              src='/images/support-program/arrow-up.svg'
              alt='Arrow'
              height={32}
              width={32}
              className='mx-auto'
            />
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
            <Image
              src='/images/support-program/arrow-up.svg'
              alt='Arrow'
              height={32}
              width={32}
              className='mx-auto'
            />
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
            <Image
              src='/images/support-program/arrow-up.svg'
              alt='Arrow'
              height={32}
              width={32}
              className='mx-auto'
            />
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
            <Image
              src='/images/support-program/arrow-up.svg'
              alt='Arrow'
              height={32}
              width={32}
              className='mx-auto'
            />
          </div>
          <div>
            <div className='w-full rounded-lg border border-neutral-700 bg-neutral-900/50 p-6'>
              <div className='grid items-center md:grid-cols-4'>
                <div className='md:col-span-1'>
                  <div className='text-xl font-bold'>Level 1 / L1 </div>
                </div>
                <div className='text-base text-neutral-200 md:col-span-3'>
                  ClickHouse first-line team answering or routing new cases,
                  inquiries, or questions
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className='max-w-3xl pt-32 text-center text-base leading-relaxed text-neutral-200'>
          Our ClickHouse Support Services team is focused not only on your quick
          questions or break-fix issues, but also on your hardest questions such
          as how to define your schema, how to model your data, or how to
          migrate from a legacy system. Our Expert Sessions, included with our
          Support for all ClickHouse Cloud users, allows you to access our
          ClickHouse experts via a virtual consultative support question -
          please open a case to get started.
        </p>
      </div>
    </Layout>
  )
}

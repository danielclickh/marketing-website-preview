import Image from "next/image";
import Link from "next/link";
import React from "react";
import Head from 'next/head'

const imagePrefix =
  process.env.NODE_ENV === "development" ? "" : "https://clickhouse.com/learn";

function PartnersPage() {
  return (
    <>
      <Head>
        <title>ClickHouse on AWS Marketplace</title>
      </Head>
      <div className='min-h-screen pb-10 md:pb-20 mx-10'>
        <div className='flex flex-col md:flex-row-reverse container mx-auto gap-20 my-20 md:my-36 justify-center items-center'>
          <Image
            src={`${imagePrefix}/aws-partner.svg`}
            width='240'
            height='240'
            alt='aws partner'
          />
          <div className='max-w-2xl flex flex-col items-center md:items-start'>
            <h1 className='text-6xl font-bold pb-6 text-web-light-c5'>
              ClickHouse Cloud on AWS
            </h1>
            <div className='description text-web-light-c5 text-lg font-medium pb-10 text-web-light-c4'>
              The fastest and most resource-efficient analytical database, ClickHouse, is now available as a service on AWS. ClickHouse Cloud on AWS allows you to experience the speed and scalability of the fastest OLAP database on earth without any need to manage the infrastructure.
<br/><br/>
ClickHouse has been reviewed by AWS and is an official AWS Partner, and ClickHouse Cloud is Qualified Software on AWS.
            </div>
            <Link
              href='https://aws.amazon.com/marketplace/pp/prodview-jettukeanwrfc'
            >
              <button className='button font-semibold text-base flex items-center gap-3'>
                <span>ClickHouse on AWS Marketplace</span>
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 22 22'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M19.9643 4.1308V3.98902L19.9239 3.90811L19.8835 3.84738L19.7827 3.72594L19.6213 3.60449L19.5608 3.56397L19.4802 3.52344H14.8007C14.5126 3.52344 14.2462 3.67778 14.1021 3.92829C13.958 4.17894 13.958 4.48765 14.1021 4.73814C14.2463 4.98865 14.5126 5.14299 14.8007 5.14299H17.2212L9.98022 12.35C9.77495 12.5562 9.69475 12.8565 9.76989 13.1381C9.84502 13.4197 10.0642 13.6397 10.3448 13.7151C10.6253 13.7905 10.9246 13.71 11.13 13.504L18.371 6.23627V8.6657C18.371 8.95491 18.5248 9.22224 18.7744 9.36696C19.0241 9.51156 19.3315 9.51156 19.5812 9.36696C19.8308 9.22221 19.9846 8.95491 19.9846 8.6657V4.27267C19.9821 4.2248 19.9753 4.17749 19.9645 4.13089L19.9643 4.1308Z'
                    fill='#2F2C3A'
                  />
                  <path
                    d='M5.94378 19.9857H15.5044C16.1463 19.9857 16.7619 19.7297 17.2158 19.2741C17.6698 18.8185 17.9247 18.2006 17.9247 17.5564V11.8272C17.9247 11.5379 17.771 11.2706 17.5214 11.126C17.2718 10.9812 16.9642 10.9812 16.7147 11.126C16.4649 11.2706 16.3111 11.5379 16.3111 11.8272V17.5564C16.3111 17.7712 16.2262 17.9771 16.0749 18.129C15.9235 18.2808 15.7184 18.3661 15.5044 18.3661H5.94383C5.72984 18.3661 5.52469 18.2808 5.37331 18.129C5.22207 17.9771 5.13709 17.7712 5.13709 17.5564V7.96053C5.13709 7.74574 5.22207 7.53984 5.37331 7.3879C5.5247 7.2361 5.72983 7.1508 5.94383 7.1508H11.6519C11.9402 7.1508 12.2065 6.99646 12.3506 6.74581C12.4948 6.49529 12.4948 6.18659 12.3506 5.9361C12.2065 5.68559 11.9402 5.53125 11.6519 5.53125H5.94383C5.302 5.53125 4.68631 5.78713 4.23241 6.24284C3.77852 6.69841 3.52344 7.31619 3.52344 7.96058V17.5564C3.52344 18.2006 3.77852 18.8186 4.23241 19.2742C4.68631 19.7297 5.30196 19.9858 5.94383 19.9858L5.94378 19.9857Z'
                    fill='#2F2C3A'
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
        <div className='flex container mx-auto gap-6 lg:gap-12 flex-col md:flex-row flex-wrap justify-center  '>
          <div className='flex flex-col bg-white shadow-lg border border-light-grey4 md:w-80 hover:bg-white duration-300 ease-in-out w-full p-6 rounded-lg'>
            <h3 className='font-bold text-xl pb-6 border-b-4 border-primary text-center w-fit mb-6 mx-auto text-web-light-c5'>
              Available on AWS Marketplace
            </h3>
            <div className='description text-web-light-c5 '>
              <div className='pb-6'>Add a ClickHouse Cloud subscription to your AWS account for simple billing and vendor management. Both development and Production services are available, with transparent pricing that is simply added to your monthly AWS bill.</div>
              <div className='flex justify-center'><Link href='https://aws.amazon.com/marketplace/pp/prodview-jettukeanwrfc'><button className='button'>Start a trial</button></Link></div>
            </div>
          </div>
          <div className='flex flex-col bg-white shadow-lg border border-light-grey4 md:w-80 duration-300 ease-in-out w-full p-6 rounded-lg'>
            <h3 className='font-bold text-xl pb-6 border-b-4 border-primary text-center w-fit mb-6 mx-auto text-web-light-c5'>
              Secure and Verified Compliant
            </h3>
            <div className='description text-web-light-c5 '>
              <div className='pb-6'>ClickHouse has been independently audited and awarded SOC 2 Type II compliance and is recognised by AWS as Qualified Software. ClickHouse cloud is serverless, simple and secure. To learn more, visit our trust center.</div>
              <div className='flex justify-center'><Link href='https://trust.clickhouse.com/'><button className='button'>Learn more</button></Link></div>
            </div>
          </div>
          <div className='flex flex-col bg-white shadow-lg border border-light-grey4 md:w-80 duration-300 ease-in-out w-full p-6 rounded-lg'>
            <h3 className='font-bold text-xl pb-6 border-b-4 border-primary text-center w-fit mb-6 mx-auto text-web-light-c5'>
              Learn ClickHouse on AWS<br/><br/>
            </h3>
            <div className='description text-web-light-c5 flex flex-col flex-1 justify-between'>
              <div className='pb-6'>Visit the ClickHouse Academy to find self-paced and live training that will help you to get the best from Clickhouse Cloud. All types are available exclusively on AWS.</div>
              <div className='flex justify-center'><Link href='/learn'><button className='button'>Learn more</button></Link></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PartnersPage;

import Image from "next/image";
import Link from "next/link";

const imagePrefix =
  process.env.NODE_ENV === "development" ? "" : "https://clickhouse.com/learn";

export function Footer() {
  return (
    <div className='flex bg-light-purple1 py-8 px-4 md:px-0'>
      <div className='container mx-auto md:flex justify-between max-w-7xl px-8 2xl:px-0 '>
        <div className='flex flex-col md:w-8/12 md:border-r border-light-purple3'>
          <div className='sitemap md:flex pt-4'>
            <div className='flex flex-col md:w-4/12 pb-6 md:pb-0'>
              <div className='text-web-light-c1 dark:text-web-dark-c5 undefined font-bold text-xs uppercase'>
                <h5>PRODUCT</h5>
              </div>
              <div className='flex w-full h-4'></div>
              <div className='flex flex-row md:flex-col gap-x-4 md:space-x-0'>
                <a
                  className='
        text-xs leading-6
        text-web-light-c1
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                  href='https://clickhouse.com/clickhouse'
                >
                  ClickHouse
                </a>
                <a
                  className='
        text-xs leading-6
        text-web-light-c1
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                  href='https://clickhouse.com/cloud'
                >
                  ClickHouse Cloud
                </a>
              </div>
            </div>
            <div className='flex flex-col md:w-4/12 pb-6 md:pb-0'>
              <div className='text-web-light-c1 dark:text-web-dark-c5 undefined font-bold text-xs uppercase'>
                <h5>RESOURCES</h5>
              </div>
              <div className='flex w-full h-4'></div>
              <div className='flex flex-row md:flex-col gap-x-4 md:space-x-0 flex-wrap'>
                <a
                  className='
        text-xs leading-6
        text-web-light-c1
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                  href='https://clickhouse.com/docs'
                >
                  Documentation
                </a>
                <a
                  className='
        text-xs leading-6
        text-web-light-c1
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                  href='https://clickhouse.com/learn/'
                >
                  Training
                </a>
                <a
                  className='
        text-xs leading-6
        text-web-light-c1
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                  href='https://clickhouse.com/support/program'
                >
                  Support
                </a>
                <a
                  className='
        text-xs leading-6
        text-web-light-c1
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                  href='https://benchmark.clickhouse.com'
                >
                  Comparison
                </a>
                <a
                  className='
        text-xs leading-6
        text-web-light-c1
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                  href='https://clickhouse.com/customer-stories'
                >
                  Use cases
                </a>
              </div>
            </div>
            <div className='flex flex-col md:w-4/12 pb-6 md:pb-0'>
              <div className='text-web-light-c1 dark:text-web-dark-c5 undefined font-bold text-xs uppercase'>
                <h5>COMPANY</h5>
              </div>
              <div className='flex w-full h-4'></div>
              <div className='flex flex-row md:flex-col gap-x-4 md:space-x-0 flex-wrap'>
                <a
                  className='
        text-xs leading-6
        text-web-light-c1
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                  href='https://clickhouse.com/blog'
                >
                  Blog
                </a>
                <a
                  className='
        text-xs leading-6
        text-web-light-c1
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                  href='https://clickhouse.com/company/our-story'
                >
                  Our story
                </a>
                <a
                  className='
        text-xs leading-6
        text-web-light-c1
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                  href='https://clickhouse.com/company/careers'
                >
                  Careers
                </a>
                <a
                  className='
        text-xs leading-6
        text-web-light-c1
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                  href='https://clickhouse.com/company/contact'
                >
                  Contact us
                </a>
                <a
                  className='
        text-xs leading-6
        text-web-light-c1
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                  href='https://clickhouse.com/company/news-events'
                >
                  News and events
                </a>
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row pt-12 gap-y-4'>
            <div className='flex md:w-64 mr-4 gap-x-3 items-center'>
              <svg
                fill='none'
                height='37'
                viewBox='0 0 37 37'
                width='37'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  fill='#FFB200'
                  height='36.9995'
                  rx='1'
                  width='4.11106'
                ></rect>
                <path
                  d='M0 32.8887H4.11106V35.9997C4.11106 36.552 3.66335 36.9997 3.11106 36.9997H1C0.447715 36.9997 0 36.552 0 35.9997V32.8887Z'
                  fill='#FF0000'
                ></path>
                <rect
                  fill='#FFB200'
                  height='36.9995'
                  rx='1'
                  width='4.11106'
                  x='8.22266'
                ></rect>
                <rect
                  fill='#FFB200'
                  height='36.9995'
                  rx='1'
                  width='4.11106'
                  x='16.4443'
                ></rect>
                <rect
                  fill='#FFB200'
                  height='36.9995'
                  rx='1'
                  width='4.11106'
                  x='24.666'
                ></rect>
                <rect
                  fill='#FFB200'
                  height='8.22212'
                  rx='1'
                  width='4.11106'
                  x='32.8887'
                  y='14.3896'
                ></rect>
              </svg>
              <span className='text-web-light-c1 logo-text'>ClickHouse</span>
            </div>
            <div className='md:px-4 self-end'>
              <div
                className='text-xs leading-6 undefined
        font-normal normal-case py-0
        text-web-light-c1 
      '
              >
                <p>
                  ClickHouse source code is published under the Apache 2.0
                  License. Software is distributed on an &quot;AS IS&quot;
                  BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
                  express or implied.
                </p>
              </div>
              <div className='copyright_and_bottom_links flex flex-col lg:flex-row gap-3 items-start md:items-center'>
                <div
                  className='copyright text-xs
        text-web-light-c1 mt-6 text-center md:m-0 md:text-left'
                >
                  © 2016-2022 ClickHouse, Inc.
                </div>
                <div className='bottom_links'>
                  <a
                    className='
        text-xs leading-6
        mr-1.5 pr-1.5
        border-r 
        text-web-light-c1
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                    href='https://clickhouse.com/legal/trademark-policy'
                  >
                    Trademark
                  </a>
                  <a
                    className='
        text-xs leading-6
        text-web-light-c1
        mr-1.5 pr-1.5
        border-r 
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                    href='https://clickhouse.com/legal/privacy-policy'
                  >
                    Privacy
                  </a>
                  <a
                    className='
        text-xs leading-6
        text-web-light-c1
        mr-1.5 pr-1.5
        border-r 
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                    href='https://trust.clickhouse.com/'
                  >
                    Security
                  </a>
                  <a
                    className='
        text-xs leading-6
        text-web-light-c1
        font-normal
          cursor-pointer hover:text-web-light-c1 duration-200 hover:underline'
                    href='https://clickhouse.com/legal/agreements/terms-of-service'
                  >
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden md:flex flex-col md:w-4/12 pl-12'>
          <div className='text-web-light-c1 dark:text-web-dark-c5 font-bold text-base'>
            <h4>Subscribe to our newsletter</h4>
          </div>
          <div
            className='text-sm leading-6
        font-normal normal-case py-2
        text-web-light-c1 
      '
          >
            <p>
              Stay informed on feature releases, product roadmap, support, and
              cloud offerings!
            </p>
          </div>
          <div className='flex align-middle items-center space-x-2'>
            <div className='mt-1'>
              <Link href='https://discover.clickhouse.com/newsletter.html'>
                <button className='button'>
                  <span className='flex justify-center'>Sign up</span>
                </button>
              </Link>
            </div>
          </div>
          <div className='flex flex-col pt-2'>
            <div
              className='text-xs leading-6
        font-normal normal-case py-2
        text-web-light-c1 
      }'
            >
              <p>Join the ClickHouse conversation on</p>
            </div>
            <div className='flex gap-x-4 pt-2'>
              <a
                target='_blank'
                href='https://github.com/ClickHouse/ClickHouse'
                rel='noreferrer'
              >
                <div className='bg-light-purple2 border border-light-purple3 px-3 pt-3 pb-2 rounded hover:bg-light-purple1'>
                  <svg
                    width='21'
                    height='20'
                    viewBox='0 0 21 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M9.32134 0.0713968C4.48153 0.587158 0.588648 4.40382 0.0625825 9.04567C-0.463483 13.8938 2.37727 18.2262 6.69101 19.8766C7.00665 19.9798 7.32229 19.7735 7.32229 19.3609V17.7104C7.32229 17.7104 6.90143 17.8136 6.37537 17.8136C4.90238 17.8136 4.2711 16.5757 4.16589 15.8537C4.06068 15.4411 3.85025 15.1316 3.53461 14.8222C3.21897 14.719 3.11376 14.7191 3.11376 14.6159C3.11376 14.4096 3.4294 14.4095 3.53461 14.4095C4.16589 14.4095 4.69196 15.1316 4.90238 15.4411C5.42845 16.2663 6.05973 16.4726 6.37537 16.4726C6.79622 16.4726 7.11186 16.3694 7.32229 16.2663C7.4275 15.5442 7.74314 14.8222 8.37442 14.4095C5.95452 13.8938 4.16589 12.5529 4.16589 10.2835C4.16589 9.14883 4.69196 8.01415 5.42845 7.18893C5.32324 6.98263 5.21802 6.46687 5.21802 5.7448C5.21802 5.33219 5.21802 4.81643 5.42845 4.40382C5.42845 4.19752 5.63888 4.09436 5.74409 4.09436H5.8493C6.37537 4.19752 7.4275 4.50697 8.37442 5.43534C9.0057 5.22904 9.74219 5.12589 10.4787 5.12589C11.2152 5.12589 11.9517 5.22904 12.5829 5.43534C13.5299 4.50697 14.6872 4.19752 15.2133 4.09436H15.3185C15.5289 4.09436 15.6341 4.19752 15.7393 4.40382C15.7393 4.81643 15.7393 5.33219 15.7393 5.7448C15.7393 6.57002 15.6341 6.98263 15.5289 7.18893C16.2654 8.01415 16.7915 9.04567 16.7915 10.2835C16.7915 12.5529 15.0028 13.8938 12.5829 14.4095C13.2142 14.9253 13.6351 15.8537 13.6351 16.782V19.464C13.6351 19.7735 13.9507 20.0829 14.3716 19.9798C18.2645 18.4325 21 14.719 21 10.3867C21 4.19751 15.6341 -0.650669 9.32134 0.0713968Z'
                      fill='white'
                    ></path>
                  </svg>
                </div>
              </a>
              <a
                target='_blank'
                href='https://join.slack.com/t/clickhousedb/shared_invite/zt-1gh9ds7f4-PgDhJAaF8ad5RbWBAAjzFg'
                rel='noreferrer'
              >
                <div className='bg-light-purple2 border border-light-purple3 px-3 pt-3 pb-2 rounded hover:bg-light-purple1'>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clip-path='url(#clip0_950_107)'>
                      <path
                        d='M7.3329 0C6.22733 0.000815494 5.33257 0.896228 5.33339 1.99959C5.33257 3.10296 6.22814 3.99837 7.33372 3.99918H9.33404V2.00041C9.33486 0.897044 8.43929 0.00163099 7.3329 0C7.33372 0 7.33372 0 7.3329 0ZM7.3329 5.33333H2.00033C0.894758 5.33415 -0.000812666 6.22956 2.22701e-06 7.33293C-0.00162979 8.43629 0.893941 9.3317 1.99951 9.33333H7.3329C8.43847 9.33252 9.33404 8.43711 9.33323 7.33374C9.33404 6.22956 8.43847 5.33415 7.3329 5.33333Z'
                        fill='#36C5F0'
                      ></path>
                      <path
                        d='M20.0002 7.33293C20.001 6.22956 19.1055 5.33415 17.9999 5.33333C16.8943 5.33415 15.9987 6.22956 15.9996 7.33293V9.33333H17.9999C19.1055 9.33252 20.001 8.43711 20.0002 7.33293ZM14.6668 7.33293V1.99959C14.6676 0.897044 13.7729 0.00163099 12.6673 0C11.5617 0.000815494 10.6662 0.896228 10.667 1.99959V7.33293C10.6654 8.43629 11.5609 9.3317 12.6665 9.33333C13.7721 9.33252 14.6676 8.43711 14.6668 7.33293Z'
                        fill='#2EB67D'
                      ></path>
                      <path
                        d='M12.6663 19.9999C13.7719 19.9991 14.6674 19.1037 14.6666 18.0003C14.6674 16.897 13.7719 16.0016 12.6663 16.0007H10.666V18.0003C10.6651 19.1029 11.5607 19.9983 12.6663 19.9999ZM12.6663 14.6658H17.9997C19.1052 14.665 20.0008 13.7695 20 12.6662C20.0016 11.5628 19.1061 10.6674 18.0005 10.6658H12.6671C11.5615 10.6666 10.666 11.562 10.6668 12.6654C10.666 13.7695 11.5607 14.665 12.6663 14.6658Z'
                        fill='#ECB22E'
                      ></path>
                      <path
                        d='M5.57957e-07 12.6663C-0.00081601 13.7697 0.894755 14.6651 2.00033 14.6659C3.1059 14.6651 4.00147 13.7697 4.00065 12.6663V10.6667H2.00033C0.894755 10.6676 -0.00081601 11.563 5.57957e-07 12.6663ZM5.33338 12.6663V17.9997C5.33175 19.103 6.22732 19.9985 7.33289 20.0001C8.43847 19.9993 9.33404 19.1039 9.33322 18.0005V12.668C9.33485 11.5646 8.43928 10.6692 7.33371 10.6676C6.22732 10.6676 5.33257 11.563 5.33338 12.6663C5.33338 12.6663 5.33338 12.6672 5.33338 12.6663Z'
                        fill='#E01E5A'
                      ></path>
                    </g>
                    <defs>
                      <clipPath id='clip0_950_107'>
                        <rect width='20' height='20' fill='white'></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </a>
              <a
                target='_blank'
                href='https://telegram.me/clickhouse_en'
                rel='noreferrer'
              >
                <div className='bg-light-purple2 border border-light-purple3 px-3 pt-3 pb-2 rounded hover:bg-light-purple1'>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M10 0C7.34785 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34785 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9465 7.34785 20 10 20C12.6522 20 15.1957 18.9465 17.0711 17.0711C18.9465 15.1957 20 12.6522 20 10C20 7.34785 18.9465 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0Z'
                      fill='#29B6F6'
                    ></path>
                    <path
                      d='M14.975 5.5L13.102 15.063C13.102 15.063 13.0215 15.5 12.4795 15.5C12.1915 15.5 12.043 15.363 12.043 15.363L7.986 11.9965L6.001 10.996L3.4535 10.3185C3.4535 10.3185 3 10.1875 3 9.8125C3 9.5 3.4665 9.351 3.4665 9.351L14.1245 5.117C14.124 5.1165 14.45 4.9995 14.6875 5C14.8335 5 15 5.0625 15 5.25C15 5.375 14.975 5.5 14.975 5.5Z'
                      fill='white'
                    ></path>
                    <path
                      d='M9.49992 13.2526L7.78692 14.9396C7.78692 14.9396 7.71242 14.9971 7.61292 14.9996C7.57842 15.0006 7.54142 14.9951 7.50342 14.9781L7.98542 11.9956L9.49992 13.2526Z'
                      fill='#B0BEC5'
                    ></path>
                    <path
                      d='M12.9485 7.09795C12.864 6.98795 12.708 6.96795 12.598 7.05145L6 10.9999C6 10.9999 7.053 13.9459 7.2135 14.4559C7.3745 14.9664 7.5035 14.9784 7.5035 14.9784L7.9855 11.9959L12.9015 7.44795C13.0115 7.36445 13.032 7.20795 12.9485 7.09795Z'
                      fill='#CFD8DC'
                    ></path>
                  </svg>
                </div>
              </a>
              <a
                target='_blank'
                href='https://twitter.com/ClickhouseDB'
                rel='noreferrer'
              >
                <div className='bg-light-purple2 border border-light-purple3 px-3 pt-3 pb-2 rounded hover:bg-light-purple1'>
                  <svg
                    width='21'
                    height='18'
                    viewBox='0 0 21 18'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clip-path='url(#clip0_950_125)'>
                      <path
                        d='M18.794 4.34302C18.8067 4.52677 18.8067 4.71052 18.8067 4.89596C18.8067 10.5465 14.505 17.0633 6.63935 17.0633V17.0599C4.3158 17.0633 2.04052 16.3977 0.0844727 15.1428C0.422336 15.1834 0.761892 15.2037 1.1023 15.2046C3.02786 15.2063 4.89838 14.5602 6.41326 13.3705C4.58338 13.3358 2.97875 12.1427 2.41818 10.4008C3.05919 10.5245 3.71967 10.4991 4.34883 10.3272C2.35383 9.92411 0.918545 8.17128 0.918545 6.13564C0.918545 6.11701 0.918545 6.09923 0.918545 6.08145C1.51298 6.41254 2.17855 6.59628 2.85935 6.61661C0.98036 5.36084 0.401166 2.86116 1.53584 0.90681C3.70697 3.57838 6.91032 5.2025 10.3491 5.37439C10.0044 3.88915 10.4752 2.33278 11.5862 1.28871C13.3085 -0.330327 16.0174 -0.247343 17.6364 1.47415C18.5941 1.28532 19.512 0.933907 20.352 0.436004C20.0328 1.42588 19.3647 2.26673 18.4722 2.80104C19.3198 2.70112 20.1479 2.47419 20.9278 2.12786C20.3537 2.98818 19.6306 3.73758 18.794 4.34302Z'
                        fill='#1D9BF0'
                      ></path>
                    </g>
                    <defs>
                      <clipPath id='clip0_950_125'>
                        <rect width='21' height='17.2742' fill='white'></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

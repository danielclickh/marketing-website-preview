"use client";

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import DropdownIcon from "./DropdownIcon";

const imagePrefix =
  process.env.NODE_ENV === "development" ? "" : "https://clickhouse.com/learn";

const products = [
  {
    name: "ClickHouse Cloud",
    description: "Fully-managed, autonomous ClickHouse services in the Cloud.",
    href: "https://clickhouse.com/clickhouse-cloud/",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
        fill='currentColor'
        aria-hidden='true'
        className='h-10 w-10 fill-current'
        height='100%'
        width='100%'
        preserveAspectRatio='xMidYMid meet'
        focusable='false'
      >
        <path d='M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z'></path>
      </svg>
    ),
  },
  {
    name: "ClickHouse",
    description: "Open source column-orientated database management system.",
    href: "https://clickhouse.com/clickhouse/",
    icon: (
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='xMidYMid meet'
        focusable='false'
        className=' fill-current'
      >
        <g clip-path='url("/#clip0_380_432")'>
          <path
            d='M16.4199 5.72907V6.66417C16.4375 7.35225 16.0847 7.88158 15.4495 8.30493C14.5849 8.88716 13.544 9.15177 12.4677 9.31066C10.1388 9.66349 7.84521 9.62817 5.62216 8.88719C5.07525 8.71071 4.5283 8.39318 4.06952 8.05795C3.5755 7.7227 3.38143 7.26404 3.38143 6.75232C3.38143 6.09955 3.39903 5.46439 3.38143 4.8115C3.32851 4.01758 3.78719 3.41774 4.58111 2.95892C5.42795 2.46491 6.39837 2.2179 7.42168 2.07676C9.53909 1.75937 11.6564 1.8124 13.7206 2.35933C14.3911 2.53581 15.0086 2.7828 15.5203 3.15324C16.1025 3.57671 16.4025 4.07072 16.3848 4.70588C16.42 5.07633 16.42 5.39397 16.42 5.7291L16.4199 5.72907ZM9.90954 3.01207C8.81568 3.01207 7.75706 3.10031 6.7161 3.3649C6.09852 3.52367 5.49868 3.71774 5.02228 4.1235C4.61652 4.47634 4.61652 4.86452 5.02228 5.18216C5.39286 5.51742 5.88684 5.71149 6.41604 5.85264C8.72728 6.45248 11.0386 6.45248 13.3675 5.85264C13.8968 5.71148 14.3908 5.51739 14.7612 5.16455C15.1318 4.8293 15.167 4.42353 14.7612 4.12363C14.4789 3.89423 14.1085 3.70016 13.7379 3.57672C12.5208 3.11793 11.2327 3.02968 9.90935 3.01207H9.90954Z'
            fill='currentColor'
          ></path>
          <path
            d='M16.3846 8.48163C16.367 8.46391 16.3846 8.48163 16.3846 8.48163C16.3846 9.41673 16.4552 10.3342 16.367 11.234C16.3141 11.8515 15.7672 12.2749 15.1496 12.6101C14.3204 13.0512 13.4206 13.2982 12.4678 13.4394C10.3153 13.7746 8.18049 13.704 6.08094 13.157C5.39286 12.9806 4.74009 12.716 4.19305 12.2925C3.68146 11.8867 3.39913 11.4279 3.41671 10.8457V8.85195C3.41671 8.71079 3.43431 8.58736 3.46963 8.48138C4.05186 8.7637 4.5988 9.13415 5.19864 9.34594C6.71597 9.92816 8.35679 10.087 10.0153 10.087C11.6208 10.087 13.2087 9.92819 14.6907 9.34594C15.2379 9.11678 15.7848 8.7638 16.3847 8.4816L16.3846 8.48163Z'
            fill='currentColor'
          ></path>
          <path
            d='M3.4168 12.5045C4.86361 13.6337 6.59259 13.9865 8.44513 14.1277C10.4389 14.2865 12.3972 14.1806 14.2851 13.5984C15.0614 13.3514 15.7494 13.0161 16.3669 12.4868C16.3845 12.7162 16.4198 12.8396 16.4198 12.9984C16.4198 13.5806 16.4022 14.1805 16.4198 14.7627C16.4903 15.7154 15.9258 16.3683 14.973 16.827C14.1791 17.2328 13.2792 17.4446 12.3794 17.5856C10.2445 17.9031 8.12742 17.8502 6.04551 17.3033C5.39274 17.1268 4.77519 16.8798 4.26357 16.5269C3.68134 16.1035 3.34609 15.5918 3.3814 14.9567C3.399 14.3039 3.3814 13.6511 3.3814 12.9983C3.3814 12.8398 3.41673 12.6986 3.41673 12.5045L3.4168 12.5045Z'
            fill='currentColor'
          ></path>
        </g>
        <defs>
          <clipPath id='clip0_380_432'>
            <rect
              width='13.7838'
              height='17'
              fill='white'
              transform='translate(3 1)'
            ></rect>
          </clipPath>
        </defs>
      </svg>
    ),
  },
];

const company = [
  {
    name: "Blog",
    description: "Stay up to date with the latest news and releases.",
    href: "https://clickhouse.com/blog/",
  },
  {
    name: "Our story",
    description: "Who we are and what we stand for.",
    href: "https://clickhouse.com/company/our-story/",
  },
  {
    name: "Careers",
    description: "Come and help us create something amazing.",
    href: "https://clickhouse.com/company/careers/",
  },
  {
    name: "Contact us",
    description:
      "See what meet-ups and other events we might be planning near you.",
    href: "https://clickhouse.com/company/contact/",
  },
  {
    name: "News and events",
    description:
      "See what meet-ups and other events we might be planning near you.",
    href: "https://clickhouse.com/company/news-events/",
  },
];

const learn = [
  {
    name: "Docs",
    href: "https://clickhouse.com/docs/en/home/",
  },
  {
    name: "ClickHouse Academy",
    href: "https://clickhouse.com/learn/",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Toolbar() {
  return (
    <Popover className='bg-web-light-c1 dark:bg-web-dark-c1 shadow-sm  dark:border-b dark:border-web-dark-c2 pt-2 bg-opacity-100 dark:opacity-100 h-16 backdrop-blur-lg dark:backdrop-blur-lg sticky top-0 z-50 ease-in-out duration-300 pt-2 shadow-sm bg-opacity-80 dark:bg-opacity-80'>
      <div className='container flex mx-auto md:pt-0 w-full px-4 mt-1 sm:px-8 2xl:px-0 max-w-7xl'>
        <div className='flex flex-col w-full'>
          <div className='flex justify-between items-center w-full'>
            <div className='md:w-3/12'>
              <a href='https://clickhouse.com' className='flex w-auto'>
                <img
                  src={`${imagePrefix}/logo.svg`}
                  height='37px'
                  width='37px'
                />
                <span className='logo-text'>ClickHouse</span>
              </a>
            </div>
            <div className='w-full flex justify-end items-center'>
              <div className='flex justify-between items-center md:justify-start'>
                <div className='-mr-2 -my-2 md:hidden'>
                  <Popover.Button className='bg-web-light-c1 dark:bg-web-dark-c1 rounded-md p-2 inline-flex items-center justify-center text-web-light-c5 dark:text-web-dark-c5 hover:text-web-light-c4 hover:dark:text-web-dark-c4 hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 focus:outline-none'>
                    <span className='sr-only'>Menu</span>
                    <svg
                      fill='none'
                      height='24'
                      viewBox='0 0 17 10'
                      width='24'
                      xmlns='http://www.w3.org/2000/svg'
                      preserveAspectRatio='xMidYMid meet'
                      focusable='false'
                      className='fill-current'
                    >
                      <path
                        d='M1.19531 2.5625H15.7891C16.2266 2.5625 16.5859 2.19531 16.5859 1.76562C16.5859 1.32031 16.2344 0.96875 15.7891 0.96875H1.19531C0.757812 0.96875 0.414062 1.32812 0.414062 1.76562C0.414062 2.1875 0.765625 2.5625 1.19531 2.5625ZM1.19531 6.17188H15.7891C16.2266 6.17188 16.5859 5.80469 16.5859 5.36719C16.5859 4.92188 16.2344 4.5625 15.7891 4.5625H1.19531C0.757812 4.5625 0.414062 4.92969 0.414062 5.36719C0.414062 5.79688 0.765625 6.17188 1.19531 6.17188ZM1.19531 9.77344H15.7891C16.2266 9.77344 16.5859 9.40625 16.5859 8.96875C16.5859 8.53125 16.2344 8.17188 15.7891 8.17188H1.19531C0.757812 8.17188 0.414062 8.53906 0.414062 8.96875C0.414062 9.40625 0.765625 9.77344 1.19531 9.77344Z'
                        fill='currentColor'
                      ></path>
                    </svg>
                  </Popover.Button>
                </div>
                <div className='hidden md:flex-1 md:flex md:items-center md:justify-between'>
                  <Popover.Group
                    as='nav'
                    className='flex md:space-x-3 lg:space-x-10 items-center'
                  >
                    <Popover className='relative'>
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={classNames(
                              open
                                ? "text-web-light-c4 dark:text-web-dark-c4"
                                : "text-web-light-c5 dark:text-web-dark-c5 ease-in-out hover:text-web-light-c4 dark:hover:text-web-dark-c4",
                              "group rounded-md inline-flex gap-x-2 items-center text-xs font-semibold focus:outline-none group-hover:text-web-light-c4 dark:group-hover:text-web-dark-c4 h-10"
                            )}
                          >
                            <span>Products</span>
                            <DropdownIcon />
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0 translate-y-1'
                            enterTo='opacity-100 translate-y-0'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100 translate-y-0'
                            leaveTo='opacity-0 translate-y-1'
                          >
                            <Popover.Panel className='absolute z-10 -ml-4 mt-4 transform w-screen max-w-md lg:max-w-1xl'>
                              <div className='rounded-lg shadow-lg border border-web-light-c2 dark:border-web-dark-c2 ring-0 ring-opacity-5 overflow-hidden'>
                                <div className='relative grid gap-6 bg-web-light-c1 dark:bg-web-dark-c1 px-5 py-6 sm:gap-0 sm:p-0'>
                                  {products.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      className='flex items-start'
                                    >
                                      <div className='flex rounded-lg hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 p-3 md:px-6 md:pt-4 cursor-pointer'>
                                        <div className='flex-shrink-0 flex justify-center h-10 w-10 rounded-md text-web-light-c5 dark:text-web-dark-c5 sm:h-12 sm:w-12 md:mr-4'>
                                          {item.icon}
                                        </div>
                                        <div className=''>
                                          <p className='text-sm font-semibold text-web-light-c5 dark:text-web-dark-c5'>
                                            {item.name}
                                          </p>
                                          <p className='mt-1 text-xs text-web-light-c4 dark:text-web-dark-c4'>
                                            {item.description}
                                          </p>
                                        </div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                    <div className='hidden md:flex items-center text-xs font-semibold text-web-light-c5 dark:text-web-dark-c5 hover:text-web-light-c4 dark:hover:text-web-dark-c4 ease-in-out'>
                      <Link href='https://clickhouse.com/customer-stories/'>
                        Use Cases
                      </Link>
                    </div>

                    <Popover className='relative'>
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={classNames(
                              open
                                ? "text-web-light-c4 dark:text-web-dark-c4"
                                : "text-web-light-c5 dark:text-web-dark-c5 ease-in-out hover:text-web-light-c4 dark:hover:text-web-dark-c4",
                              "group rounded-md inline-flex gap-x-2 items-center text-xs font-semibold focus:outline-none group-hover:text-web-light-c4 dark:group-hover:text-web-dark-c4 h-10"
                            )}
                          >
                            <span>Company</span>
                            <DropdownIcon />
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0 translate-y-1'
                            enterTo='opacity-100 translate-y-0'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100 translate-y-0'
                            leaveTo='opacity-0 translate-y-1'
                          >
                            <Popover.Panel className='absolute z-10 left-1/2 md:left-full leftransform -translate-x-1/2 mt-4 px-2 w-screen max-w-xs md:w-52 sm:px-0'>
                              <div className='rounded-lg shadow-lg border border-web-light-c2 dark:border-web-dark-c2 ring-0 overflow-hidden'>
                                <div className='relative grid gap-4 bg-web-light-c1 dark:bg-web-dark-c1 px-5 py-6 sm:gap-0 sm:p-0 sm:py-2'>
                                  {company.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      className='py-2 px-6 block w-full hover:bg-web-light-c2 hover:dark:bg-web-dark-c2'
                                    >
                                      <p className='text-xs font-semibold text-web-light-c5 dark:text-web-dark-c5 '>
                                        {item.name}
                                      </p>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>

                    <Popover className='relative'>
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={classNames(
                              open
                                ? "text-web-light-c4 dark:text-web-dark-c4"
                                : "text-web-light-c5 dark:text-web-dark-c5 ease-in-out hover:text-web-light-c4 dark:hover:text-web-dark-c4",
                              "group rounded-md inline-flex gap-x-2 items-center text-xs font-semibold focus:outline-none group-hover:text-web-light-c4 dark:group-hover:text-web-dark-c4 h-10"
                            )}
                          >
                            <span>Learn</span>
                            <DropdownIcon />
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0 translate-y-1'
                            enterTo='opacity-100 translate-y-0'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100 translate-y-0'
                            leaveTo='opacity-0 translate-y-1'
                          >
                            <Popover.Panel className='absolute z-10 left-1/2 md:left-full leftransform -translate-x-1/2 mt-4 px-2 w-screen max-w-xs md:w-52 sm:px-0'>
                              <div className='rounded-lg shadow-lg border border-web-light-c2 dark:border-web-dark-c2 ring-0 overflow-hidden'>
                                <div className='relative grid gap-4 bg-web-light-c1 dark:bg-web-dark-c1 px-5 py-6 sm:gap-0 sm:p-0 sm:py-2'>
                                  {learn.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      className='py-2 px-6 block w-full hover:bg-web-light-c2 hover:dark:bg-web-dark-c2'
                                    >
                                      <p className='text-xs font-semibold text-web-light-c5 dark:text-web-dark-c5 '>
                                        {item.name}
                                      </p>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                    <div className='hidden md:flex items-center text-xs font-semibold text-web-light-c5 dark:text-web-dark-c5 hover:text-web-light-c4 dark:hover:text-web-dark-c4 ease-in-out'>
                      <Link href='https://clickhouse.com/pricing'>Pricing</Link>
                    </div>
                    <div className='md:flex justify-end gap-4 items-center text-sm'>
                      <Link
                        href='https://clickhouse.cloud/signUp'
                        className='text-sm font-medium whitespace-nowrap pl-3 border-l border-web-slate'
                      >
                        Sign In
                      </Link>
                      <button className='button'>
                        <Link href='https://clickhouse.cloud/signUp'>
                          Get Started
                        </Link>
                      </button>
                    </div>
                  </Popover.Group>
                </div>
              </div>

              <Transition
                as={Fragment}
                enter='duration-200 ease-out'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='duration-100 ease-in'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Popover.Panel
                  focus
                  className='absolute top-0 z-10 inset-x-0 p-2 transition transform origin-top-right md:hidden'
                >
                  <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-web-light-c1 dark:bg-web-dark-c1 divide-y-2 divide-web-light-c2 dark:divide-web-dark-c2'>
                    <div className='pt-5 pb-6 px-5'>
                      <div className='flex items-top justify-between'>
                        <div className='mt-6'>
                          <nav className='grid gap-6'>
                            {products.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className='-m-3 p-3 flex items-center rounded-lg hover:bg-web-light-c2 hover:dark:bg-web-dark-c2'
                              >
                                <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md text-web-light-c5 dark:text-web-dark-c5'>
                                  {item.icon}
                                </div>
                                <div className='ml-4 text-sm font-semibold text-web-light-c5 dark:text-web-dark-c5'>
                                  {item.name}
                                </div>
                              </a>
                            ))}
                          </nav>
                        </div>
                        <div className='-mr-2'>
                          <Popover.Button className='bg-web-light-c1 dark:bg-web-dark-c2 rounded-md p-2 inline-flex gap-x-2 items-center justify-center text-web-light-c5 dark:text-web-dark-c5 hover:text-web-light-c4 dark:hover:text-web-dark-c4 ease-in-out focus:outline-none'>
                            <span className='sr-only'>Close menu</span>

                            <svg
                              aria-hidden='true'
                              className='h-6 w-6'
                              fill='none'
                              stroke='currentColor'
                              stroke-width='2'
                              viewBox='0 0 24 24'
                              xmlns='http://www.w3.org/2000/svg'
                              height='100%'
                              width='100%'
                              preserveAspectRatio='xMidYMid meet'
                              focusable='false'
                            >
                              <path
                                d='M6 18L18 6M6 6l12 12'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                              ></path>
                            </svg>
                          </Popover.Button>
                        </div>
                      </div>
                    </div>
                    <div className='py-6 px-5'>
                      <div className='grid grid-cols-2 gap-4'>
                        <Link
                          href='https://clickhouse.com/customer-stories/'
                          className='text-sm font-semibold text-web-light-c5 dark:text-web-dark-c5'
                        >
                          Use Cases
                        </Link>

                        {company.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className='text-sm font-semibold text-web-light-c5 dark:text-web-dark-c5'
                          >
                            {item.name}
                          </a>
                        ))}
                        {learn.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className='text-sm font-semibold text-web-light-c5 dark:text-web-dark-c5'
                          >
                            {item.name}
                          </a>
                        ))}
                        <Link
                          href='https://clickhouse.com/pricing'
                          className='text-sm font-semibold text-web-light-c5 dark:text-web-dark-c5'
                        >
                          Pricing
                        </Link>
                      </div>
                      <div
                        _ngcontent-serverapp-c18=''
                        className='container cta_button_container flex gap-4 max-auto p-4'
                      >
                        <a
                          className='cta_button ng-star-inserted'
                          target='_self'
                          rel='external nofollow noopener'
                          href='https://clickhouse.cloud/signIn'
                        >
                          <button className='stroked_button'>Sign in</button>
                        </a>
                        <a
                          target='_self'
                          rel='external nofollow noopener'
                          href='https://clickhouse.cloud/signUp'
                        >
                          <button className='button'>Get Started</button>
                        </a>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </Popover>
  );
}

const lightTheme = require('prism-react-renderer/themes/vsLight');
const darkTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Learn ClickHouse',
  tagline: 'Official training from the creators of ClickHouse',
  url: 'https://clickhouse.com',
  baseUrl: '/learn/',
  onBrokenLinks: 'error',
  onBrokenMarkdownLinks: 'error',
  favicon: 'img/favicon.ico',
  organizationName: 'ClickHouse',
  projectName: 'clickhouse-learn',

  themes: ['@docusaurus/theme-live-codeblock'],
  scripts: [
    'https://docs-content.clickhouse.tech/docs/js/analytics.js',
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsed: true,
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-KF1LLRTQ5Q',
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.png',
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        }
      },
      //      autoCollapseSidebarCategories: true,
      navbar: {
        hideOnScroll: false,
        title: 'ClickHouse',
        logo: {
          alt: 'ClickHouse',
          src: 'img/logo_without_text.svg',
          href: 'https://clickhouse.com/',
        },
        items: [
          {
            type: 'dropdown',
            label: 'Product',
            position: 'left',
            items: [
              {
                label: 'ClickHouse Cloud',
                to: 'https://clickhouse.com/cloud'
              },
              {
                label: 'ClickHouse Open Source',
                to: 'https://clickhouse.com/clickhouse'
              },
            ]
          },
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Docs',
          },
          {
            position: 'left',
            label: 'Use Cases',
            to: 'https://clickhouse.com/customer-stories'
          },
          {
            type: 'dropdown',
            label: 'Company',
            position: 'left',
            items: [
              {
                label: 'Blog',
                to: 'https://clickhouse.com/blog'
              },
              {
                label: 'Our story',
                to: 'https://clickhouse.com/company/our-story'
              },
              {
                label: 'Careers',
                to: 'https://clickhouse.com/company/careers'
              },
              {
                label: 'Contact us',
                to: 'https://clickhouse.com/company/contact'
              },
              {
                label: 'News and events',
                to: 'https://clickhouse.com/company/news-events'
              },
            ]
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'ClickHouse',
            items: [
              {
                label: 'Company',
                to: 'https://clickhouse.com/',
              },
              {
                label: 'ClickHouse as a Service',
                to: 'https://clickhouse.com/cloud/',
              },
              {
                label: 'Careers',
                to: 'https://clickhouse.com/careers/',
              },
              {
                label: 'Learn ClickHouse',
                to: 'https://clickhouse.com/learn/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ClickHouse/ClickHouse',
              },
              {
                label: 'Blog',
                href: 'https://clickhouse.com/blog/en/',
              },
              {
                label: 'Meetup',
                href: 'https://www.meetup.com/pro/clickhouse/',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/c/ClickHouseDB',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/ClickHouseDB',
              },
              {
                label: 'Slack',
                href: 'https://join.slack.com/t/clickhousedb/shared_invite/zt-rxm3rdrk-lIUmhLC3V8WTaL0TGxsOmg',
              },
            ],
          },
          {
            title: 'Policies',
            items: [
              {
                label: 'Trademark Policy',
                to: 'https://clickhouse.com/legal/trademark-policy/',
              },
              {
                label: 'Privacy Policy',
                to: 'https://clickhouse.com/legal/privacy-policy/',
              },
              {
                label: 'Cookie Policy',
                to: 'https://clickhouse.com/legal/cookie-policy/',
              },
            ],
          },
        ],
        logo: {
          alt: 'ClickHouse Documentation',
          src: 'img/logo_without_text.svg',
        },
        copyright: `Copyright &copy; 2016&ndash;${new Date().getFullYear()} ClickHouse, Inc. ClickHouse Docs provided under the Creative Commons CC BY-NC-SA 4.0 license. ClickHouse&reg; is a registered trademark of ClickHouse, Inc.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ['java', 'cpp'],
        magicComments: [
          // Remember to extend the default highlight class name as well!
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
        ],
      },
      colorMode: {
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      /*      announcementBar: {
              id: 'support_us',
              content:
                'Check out our new 25-minute video on <a href="https://clickhouse.com/company/events/getting-started-with-clickhouse/" target="_blank"> Getting Started with ClickHouse</a>',
              backgroundColor: '#0057b7',
              textColor: '#ffffff',
              isCloseable: false,
            },
      */
    }),

  plugins: [
    'remark-docusaurus-tabs',
  ],
};

module.exports = config;
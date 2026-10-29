import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const SITE_URL = 'https://hanassh.com';

const config: Config = {
  title: 'Hana Docs',
  tagline: 'Guides and reference for Hana Desktop, the Hana agent and Hana Cloud.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    faster: true, // Rspack, SWC and Lightning CSS via @docusaurus/faster
  },

  url: 'https://docs.hanassh.com',
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'hana-ssh',
  projectName: 'docs',
  deploymentBranch: 'gh-pages',
  trailingSlash: true,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Same typefaces as hanassh.com
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Public+Sans:ital,wght@0,300..800;1,300..800&display=swap',
      type: 'text/css',
    },
  ],
  headTags: [
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'}},
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'},
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/hana-ssh/docs/tree/main/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Hana',
      logo: {
        alt: 'Hana',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
        width: 18,
        height: 18,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {href: `${SITE_URL}/download`, label: 'Download', position: 'left'},
        {href: 'https://marketplace.hanassh.com/', label: 'Themes', position: 'left'},
        {
          href: 'https://github.com/hana-ssh',
          position: 'right',
          className: 'navbar-github',
          'aria-label': 'GitHub',
        },
        {
          href: `${SITE_URL}/login`,
          label: 'Get started',
          position: 'right',
          className: 'navbar-cta',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Product',
          items: [
            {label: 'Hana Desktop', href: `${SITE_URL}/#desktop`},
            {label: 'Hana Cloud', href: `${SITE_URL}/#cloud`},
            {label: 'Pricing', href: `${SITE_URL}/#pricing`},
            {label: 'Download', href: `${SITE_URL}/download`},
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'Documentation', to: '/docs/intro'},
            {label: 'Theme marketplace', href: 'https://marketplace.hanassh.com/'},
            {label: 'Service status', href: 'https://status.seventy7.dev/'},
            {label: 'GitHub', href: 'https://github.com/hana-ssh'},
          ],
        },
        {
          title: 'Account',
          items: [
            {label: 'Sign in', href: `${SITE_URL}/login`},
            {label: 'Your account', href: `${SITE_URL}/account`},
            {label: 'Plans & billing', href: `${SITE_URL}/account/plans`},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} seventy7 sp. z o.o. All rights reserved.`,
    },
    prism: {
      theme: {
        ...prismThemes.oneLight,
        plain: {...prismThemes.oneLight.plain, backgroundColor: '#fafafa'},
      },
      darkTheme: {
        ...prismThemes.oneDark,
        plain: {...prismThemes.oneDark.plain, backgroundColor: '#101010'},
      },
      additionalLanguages: ['bash', 'json', 'yaml', 'toml', 'ini'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

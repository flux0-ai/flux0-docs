import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
import { themes as prismThemes } from 'prism-react-renderer';
const transformer = require("@crossid/docusaurus-remote-content").transformer;

const regexMdLinks = /\[([^\[]+)\](\(.*?\))/gm;
const singleMatch = /\[([^\[]+)\]\((.*)\)/;

function createRemoteContentTransformer(basePath) {
  return function remoteContentTransformer(c, data) {
    let td = transformer(c, data);
    const matches = data.match(regexMdLinks) || [];

    for (let i = 0; i < matches.length; i++) {
      let match = singleMatch.exec(matches[i]);
      if (!match) continue;

      let linkText = match[1];
      let link = match[2];

      // Only transform relative links
      if (!link.startsWith("http")) {
        // Normalize path: remove leading ./ but preserve other relative paths
        let normalized = link.startsWith("./") ? link.slice(2) : link;
        normalized = normalized.startsWith("/") ? normalized.slice(1) : normalized;

        td = td.replace(
          match[0],
          `[${linkText}](${basePath}/${normalized})`
        );
      }
    }

    return td;
  };
}

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Flux0',
  tagline:
		"A powerful framework for deploying AI agents with multi-agent support, session management, event streaming, and LLM-agnostic integration.",
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    experimental_faster: {
      rspackBundler: true,
      rspackPersistentCache: true
    }
  },

  // Set the production url of your site here
  url: 'https://flux0.netlify.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'flux0-ai', // Usually your GitHub org/user name.
  projectName: 'flux0', // Usually your repo name.
  deploymentBranch: 'gh-pages', // The branch that GitHub pages will deploy from.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: "Flux0",
      logo: {
        alt: "Flux0 Site Logo",
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: "learnSidebar",
          position: 'left',
          label: 'Learn',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/orgs/flux0-ai/repositories',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
							label: "Learn",
							to: "/docs/quickstart/intro",
						},
          ],
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'X',
        //       href: 'https://x.com/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/orgs/flux0-ai/repositories',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      "@crossid/docusaurus-remote-content",
      {
        type: "docs",
        cleanup: true,
        contents: [
          {
            file: "examples/static.md",
            url: "https://raw.githubusercontent.com/flux0-ai/flux0/refs/heads/develop/examples/static/README.md",
            header: `:::note
This content is from the README file of https://github.com/flux0-ai/flux0/blob/develop/examples/static.
The source code for this example can be found [here](https://github.com/flux0-ai/flux0/blob/develop/examples/static/static_agent.py)
:::`,
            meta: {
              id: "static",
              sidebar_label: "Static",
              hide_title: true,
            },
            transform: createRemoteContentTransformer(
              "https://github.com/flux0-ai/flux0/tree/develop"
            ),
          },
        ]
      }
    ],
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api", // plugin id
        docsPluginId: "classic", // configured for preset-classic
        config: {
          flux0: {
            specPath:
							"https://raw.githubusercontent.com/flux0-ai/flux0-api-spec/refs/heads/main/openapi.json",
							// "http://localhost:8080/openapi.json",
						outputDir: "docs/api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          } satisfies OpenApiPlugin.Options,
        }
      },
    ]
  ],
  themes: ["docusaurus-theme-openapi-docs"], // export theme components
};

export default config;

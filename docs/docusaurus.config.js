module.exports = {
    title: 'numerable',
    tagline: 'A number formatting library for Javascript and Node.js apps',
    url: 'https://github.com/gastonmesseri/numerable',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    // favicon: 'img/favicon.ico',
    favicon: 'img/logo-60-60.png',
    organizationName: 'gastonmesseri', // Usually your GitHub org/user name.
    projectName: 'numerable', // Usually your repo name.
    themeConfig: {
        navbar: {
            title: 'numerable',
            logo: {
                alt: 'numerable logo',
                src: 'img/logo-60-60.png',
            },
            items: [
                {
                    to: 'docs/',
                    activeBasePath: 'docs',
                    label: 'Docs',
                    position: 'left',
                },
                // { to: 'blog', label: 'Blog', position: 'left' },
                {
                    href: 'https://github.com/gastonmesseri/numerable',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                // {
                //     title: 'Docs',
                //     items: [
                //         {
                //             label: 'Style Guide',
                //             to: 'docs/',
                //         },
                //         {
                //             label: 'Second Doc',
                //             to: 'docs/doc2/',
                //         },
                //     ],
                // },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Stack Overflow',
                            href: 'https://stackoverflow.com/questions/tagged/numerable',
                        },
                        // {
                        //     label: 'Discord',
                        //     href: 'https://discordapp.com/invite/docusaurus',
                        // },
                        // {
                        //     label: 'Twitter',
                        //     href: 'https://twitter.com/docusaurus',
                        // },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        // {
                        //     label: 'Blog',
                        //     to: 'blog',
                        // },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/gastonmesseri/numerable',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} numerable. Built with Docusaurus.`,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/facebook/docusaurus/edit/master/website/',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/facebook/docusaurus/edit/master/website/blog/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
};

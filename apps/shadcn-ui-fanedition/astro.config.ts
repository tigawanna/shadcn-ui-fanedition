import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'ShadcnUI FE ',
    social: {
      github: 'https://github.com/tigawanna/shadcn-ui-fanedition'
    },
    sidebar: [{
      label: 'Guides',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Why',
        link: '/guides/intro/'
      },
      {
        label: 'CLI',
        link: '/guides/cli/'
      },
      {
        label: 'Components',
        link: '/guides/ui/'
      },
      {
        label: 'Color tool',
        link: '/guides/color/'
      },
      {
        label: 'Tailwind plugin',
        link: '/guides/plugin/'
      },
    ]
    }, {
      label: 'Reference',
      autogenerate: {
        directory: 'reference'
      }
    }]
  }), tailwind(), react()]
});

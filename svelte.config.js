import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [mdsvex(mdsvexConfig)],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
      strict: true
    }),
    prerender: {
      handleUnseenRoutes: 'ignore'
    },
    paths: {
      // IMPORTANT: Set this to your repo name if deploying to username.github.io/repo-name
      // Leave empty string if deploying to username.github.io (user/org site)
      base: process.env.BASE_PATH || ''
    }
  }
};

export default config;

import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['build/', '.svelte-kit/', 'legacy/']
  },
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    rules: {
      'svelte/no-navigation-without-resolve': 'off',
      'svelte/require-each-key': 'off'
    }
  }
];

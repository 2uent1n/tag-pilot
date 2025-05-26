// ESLint 9 flat config for Obsidian plugin development
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  // Apply recommended ESLint rules
  js.configs.recommended,

  {
    // Configuration for JavaScript/Node.js files (.mjs, .js)
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },

  {
    // Configuration for TypeScript files
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      // Apply recommended TypeScript ESLint rules
      ...typescriptEslint.configs.recommended.rules,

      // Disable base ESLint no-unused-vars in favor of TypeScript version
      'no-unused-vars': 'off',

      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-function': 'off',

      // Disable problematic rules for Obsidian development
      'no-prototype-builtins': 'off',
    },
  },

  {
    // Ignore patterns
    ignores: [
      'main.js',
      'node_modules/',
      'dist/',
      'build/',
      '*.d.ts',
    ],
  }
];

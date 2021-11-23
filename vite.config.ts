import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { EsLinter, linterPlugin, TypeScriptLinter } from "vite-plugin-linter";
const _dirname = './src';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
    base: '/row-picker-react/',
    plugins: [
        react(),
        // linterPlugin({
        //     include: ['./src/**/*.ts', './src/**/*.tsx'],
        //     linters: [new EsLinter(), new TypeScriptLinter()],
        // https://github.com/TheSwordBreaker/vite-reactts-eslint-prettier/blob/main/.eslintrc.js
        // }),
    ],
    // build: {
    //     outDir: 'docs',
    // },
    build: {
        lib: {
            entry: path.resolve(_dirname, 'RowPicker/index.tsx'),
            name: 'RowPicker',
            fileName: (format) => `row-picker.${format}.js`,
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'lodash.isnil',
                'react-icons',
                '@react-aria/focus',
                '@react-aria/interactions',
                '@headlessui/react',
                '@reach/checkbox',
            ],
            output: {
                globals: {
                    react: 'React',
                },
            },
        },
    },
}));

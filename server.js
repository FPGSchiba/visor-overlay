const { createServer } = require('esbuild-server');
const { sassPlugin } = require("esbuild-sass-plugin");
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const plugin = require('node-stdlib-browser/helpers/esbuild/plugin');
const stdLibBrowser = require('node-stdlib-browser');
const path = require('path');

const server = createServer(
    {
        bundle: true,
        entryPoints: ['src/index.tsx', 'src/shared/index.scss', 'src/shared/variables.module.scss'],
        sourcemap: true,
        outdir: "public",
        minify: true,
        platform: 'browser',
        inject: [path.resolve('node_modules/node-stdlib-browser/helpers/esbuild/shim.js')],
        define: {
            https: 'https',
        },
        plugins: [
            sassPlugin({
                async transform(source) {
                    const { css } = await postcss([autoprefixer]).process(source);
                    return css;
                },
            }),
            plugin(stdLibBrowser),
        ],
        loader: {
            ".png": "dataurl"
        }
    },
    {
        static: 'public',
        open: false,
        port: 3000,
    }
);

const buildStart = Date.now();
server
    .start()
    .then(() => {
        console.log(`Build completed in ${Date.now() - buildStart}ms`);
    })
    .catch(() => {
        console.error('Build failed');
    });
console.log(`Development server running at ${server.url}`);
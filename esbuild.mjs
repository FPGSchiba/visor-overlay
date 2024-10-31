import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import plugin from 'node-stdlib-browser/helpers/esbuild/plugin';
import stdLibBrowser from 'node-stdlib-browser';
import path from 'path';

esbuild
    .context({
        sourcemap: true,
        entryPoints: ["src/index.tsx", "src/shared/index.scss", "src/shared/variables.module.scss"],
        outdir: "public",
        bundle: true,
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
    })
    .then((r) => {
        console.log("⚡ Build complete! ⚡");
        process.exit(0);
    })
    .catch(() => process.exit(1));
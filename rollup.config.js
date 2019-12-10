import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import sass from 'rollup-plugin-sass';
import copy from 'rollup-plugin-copy';

const getEnvPlugins = (prod) => {
  let plugins = [
    resolve(),
    sass(),
    babel({
      extensions: ['.js', '.mjs', '.html'],
      runtimeHelpers: true,
      exclude: ['node_modules/@babel/**'],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: '> 0.25%, not dead',
          },
        ],
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        [
          '@babel/plugin-transform-runtime',
          {
            useESModules: true,
          },
        ],
      ],
    }),
  ];
  if (prod) {
    plugins = [
      ...plugins,
      uglify(),
      copy({
        targets: [{ src: 'src/index.html', dest: 'dist' }],
      }),
    ];
  } else {
    plugins = [
      ...plugins,
      copy({
        targets: [
          { src: 'src/index.html', dest: 'www' },
          { src: 'src/assets', dest: 'www' },
        ],
      }),
    ];
  }
  return plugins;
};

export default () => {
  const prod = process.env.BUILD === 'prod';
  const outputDir = prod ? 'dist' : 'www';
  const bundle = {
    input: 'src/accordion/accordion.js',
    output: [
      {
        file: `${outputDir}/accordion/accordion.esm.js`,
        format: 'esm',
      },
      {
        file: `${outputDir}/accordion/accordion.js`,
        format: 'iife',
      },
    ],
  };
  bundle.plugins = getEnvPlugins(prod);
  return bundle;
};

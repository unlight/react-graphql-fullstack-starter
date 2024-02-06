import reactRefresh from '@vitejs/plugin-react';
import path from 'path';
import { ConfigEnv, UserConfigExport, defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import express from 'vite3-plugin-express';

export default function (env: ConfigEnv): UserConfigExport {
  if (env.isSsrBuild) return apiConfig(env);

  return appConfig(env);
}

const apiMain = path.resolve('./api/src/main.ts');

const apiConfig = ({}: ConfigEnv) => {
  return defineConfig({
    plugins: [tsconfigPaths()],
    resolve: {
      alias: {},
    },
    build: {
      target: 'esnext',
      outDir: './dist/api',
      rollupOptions: {
        input: apiMain,
      },
    },
  });
};

const appConfig = ({}: ConfigEnv) => {
  const rootSource = './app/src';

  return defineConfig({
    root: rootSource,
    test: {
      globals: true,
      fileParallelism: false,
      reporters: 'dot',
      environment: 'happy-dom',
    },
    plugins: [tsconfigPaths(), reactRefresh(), express(apiMain)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, rootSource),
      },
    },
    build: {
      outDir: './dist/app',
      assetsDir: '.',
    },
  });
};

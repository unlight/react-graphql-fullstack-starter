import reactRefresh from '@vitejs/plugin-react';
import path from 'path';
import { ConfigEnv, UserConfigExport, defineConfig } from 'vite';
import express from 'vite3-plugin-express';
import tsconfigPaths from 'vite-tsconfig-paths';

export default function (env: ConfigEnv): UserConfigExport {
  if (env.isSsrBuild) return apiConfig(env);

  return appConfig(env);
}

const apiMain = path.resolve('./api/src/main.ts');

const apiConfig = (env: ConfigEnv) => {
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

const appConfig = (env: ConfigEnv) => {
  const isBuild = env.command == 'build';
  const rootSource = './app/src';

  return defineConfig({
    root: rootSource,
    test: {
      globals: true,
      fileParallelism: false,
      reporters: 'dot',
      environment: 'happy-dom',
      browser: {
        enabled: false,
        name: 'chrome', // browser name is required
      },
    },
    plugins: [tsconfigPaths(), reactRefresh(), express(apiMain)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, rootSource),
      },
    },
    build: {
      outDir: path.resolve('./dist/app'),
      assetsDir: '.',
    },
  });
};

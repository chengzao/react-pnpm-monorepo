import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import versionPlugin from './scripts/version-plugin.js';

const buildVersion = new Date().getTime().toString();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    versionPlugin({
      version: buildVersion,
    }),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(buildVersion),
  },
});

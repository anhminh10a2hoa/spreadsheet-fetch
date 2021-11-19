import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import reactRefresh from '@vitejs/plugin-react-refresh'
import svgr from 'vite-plugin-svgr'
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [reactRefresh(), svgr(), tsconfigPaths()],
  server: {
    port: 8080,
  },
});
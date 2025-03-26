import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'jwt-decode': 'jwt-decode/dist/jwt-decode.esm.js'
    }
  },
  plugins: [react(), svgr()],
})

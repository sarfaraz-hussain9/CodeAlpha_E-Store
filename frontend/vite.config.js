import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
 server: {
    proxy: {
      '/api': 'https://mern-estore-k21u.onrender.com',
      "/uploads/": 'https://mern-estore-k21u.onrender.com',
    }
  }
})

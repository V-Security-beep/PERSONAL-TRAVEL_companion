import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/PERSONAL-TRAVEL_companion/', // ⚠️ Replace this with your repo name
});

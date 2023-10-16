import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel(['resources/js/app.jsx', 'resources/sass/app.scss']),
        react(),
    ],
    server: {
        host: true,
        hmr: {
            host: 'localhost',
        },
    },
});

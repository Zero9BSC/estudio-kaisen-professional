import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const gtmId = env.VITE_GTM_ID || 'GTM-XXXXXX';

  return {
  plugins: [
    react(),
    {
      name: 'inject-gtm-id',
      transformIndexHtml(html) {
        return html.replace(/GTM-XXXXXX/g, gtmId);
      }
    },
    {
      name: 'copy-htaccess',
      closeBundle: async () => {
        const source = path.join(__dirname, '.htaccess');
        const dest = path.join(__dirname, 'dist', '.htaccess');
        if (fs.existsSync(source)) {
          fs.copyFileSync(source, dest);
          console.log('✅ .htaccess copied to dist/');
        }
      }
    }
  ],

  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'asset';
          if (/\.(woff2?)$/i.test(name)) return 'assets/fonts/[name][extname]';
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'icons': ['lucide-react'],
          'email': ['@emailjs/browser']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
  };
});

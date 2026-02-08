const path = require('path');
const fs = require('fs');
const { defineConfig, loadEnv } = require('vite');
const react = require('@vitejs/plugin-react');

// Prerender deshabilitado: vite-plugin-prerender deja el proceso colgado con Puppeteer.
// build:ssg hace el mismo build que build (SPA). Para SSG usar un prerender externo si hace falta.

module.exports = defineConfig(({ mode }) => {
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
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          icons: ['lucide-react'],
          email: ['@emailjs/browser']
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

import React, { useEffect, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, ScrollRestoration, Outlet, useLocation } from 'react-router-dom';
import { pushPageView } from './utils/analytics';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

import HomePage from './pages/HomePage';

/* Lazy-loaded route chunks (non-critical: load on navigation only) */
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

const PageFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center" aria-hidden="true">
    <span className="text-primary/60">Cargando…</span>
  </div>
);

// Componente de layout que incluye Header y Footer
const Root = () => {
  const location = useLocation();

  useEffect(() => {
    document.dispatchEvent(new Event('app-rendered'));
  }, []);

  useEffect(() => {
    pushPageView({
      page_path: location.pathname || '/',
      page_title: document.title,
      page_location: window.location.href
    });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ScrollRestoration />
        {/* Outlet renderiza las páginas hijas */}
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

// Configuración del router con createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'servicios',
        element: (
          <Suspense fallback={<PageFallback />}>
            <ServicesPage />
          </Suspense>
        ),
      },
      {
        path: 'nosotros',
        element: (
          <Suspense fallback={<PageFallback />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'contacto',
        element: (
          <Suspense fallback={<PageFallback />}>
            <ContactPage />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div data-typography-mode="desktop" data-spacing-sizing-mode="desktop">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
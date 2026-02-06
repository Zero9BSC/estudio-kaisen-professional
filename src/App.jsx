import { createBrowserRouter, RouterProvider, ScrollRestoration, Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Componente de layout que incluye Header y Footer
const Root = () => {
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
        element: <ServicesPage />,
      },
      {
        path: 'nosotros',
        element: <AboutPage />,
      },
      {
        path: 'contacto',
        element: <ContactPage />,
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
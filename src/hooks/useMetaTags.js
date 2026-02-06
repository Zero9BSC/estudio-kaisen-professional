import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeMeta = {
  '/': {
    title: 'Estudio Kaisen | Servicios Contables, Impositivos y Jurídicos en Trelew, Chubut',
    description: 'Estudio profesional de contadores y abogados en Trelew. Asesoramiento contable, impositivo, legal, laboral y capacitación empresarial. +15 años de experiencia en Chubut, Patagonia.',
    keywords: 'contador trelew, abogado trelew, estudio contable chubut, asesoramiento legal patagonia, auditoría empresarial',
    ogImage: '/assets/FOTO1.png'
  },
  '/servicios': {
    title: 'Servicios Profesionales | Contabilidad, Legal, Auditoría - Kaisen Trelew',
    description: 'Consultoría financiera, planificación estratégica, asesoramiento contable-legal y capacitación empresarial. Soluciones integrales en Trelew, Chubut.',
    keywords: 'servicios contables trelew, consultoría financiera, planificación estratégica, capacitación empresarial',
    ogImage: '/assets/FOTO2.png'
  },
  '/nosotros': {
    title: 'Sobre Nosotros | Estudio Kaisen - Contadores y Abogados en Trelew',
    description: 'Equipo multidisciplinario de contadores, abogados y asesores con +15 años de experiencia. Conocé nuestra misión, visión, valores y compromiso.',
    keywords: 'estudio kaisen trelew, equipo profesional, valores empresariales',
    ogImage: '/assets/FOTO3.png'
  },
  '/contacto': {
    title: 'Contacto | Estudio Kaisen - 9 de Julio 128, Trelew, Chubut',
    description: 'Contactá con nuestro estudio. Dirección: 9 de Julio 128, 1° piso A. Tel: 280 442-1137. WhatsApp: 280 436-6867. Primera consulta sin costo.',
    keywords: 'contacto estudio kaisen, contador trelew teléfono, consulta gratuita',
    ogImage: '/assets/FOTO4.png'
  }
};

export function useMetaTags() {
  const location = useLocation();

  useEffect(() => {
    const meta = routeMeta[location.pathname] || routeMeta['/'];

    // Update title
    document.title = meta.title;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', meta.description);
    updateMetaTag('keywords', meta.keywords);

    // Open Graph
    updateMetaTag('og:title', meta.title, true);
    updateMetaTag('og:description', meta.description, true);
    updateMetaTag('og:url', `https://consultorakaisen.com.ar${location.pathname}`, true);
    updateMetaTag('og:image', meta.ogImage, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:locale', 'es_AR', true);
    updateMetaTag('og:site_name', 'Estudio Kaisen', true);

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', meta.title);
    updateMetaTag('twitter:description', meta.description);
    updateMetaTag('twitter:image', meta.ogImage);

    // Geo tags
    updateMetaTag('geo.region', 'AR-U');
    updateMetaTag('geo.placename', 'Trelew, Chubut');
    updateMetaTag('geo.position', '-43.2519;-65.3054');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://consultorakaisen.com.ar${location.pathname}`);
  }, [location.pathname]);
}

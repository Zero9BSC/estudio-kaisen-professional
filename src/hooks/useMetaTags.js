import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_BASE_URL = 'https://consultorakaisen.com.ar';

// CTR-optimized meta: title <60 chars, description 140–155 chars, emotional/trust triggers, local intent (Trelew, Chubut, Patagonia)
const routeMeta = {
  '/': {
    title: 'Contador en Trelew | Estudio Kaisen – Patagonia',
    description: 'Asesoramiento contable y legal confiable en Trelew. +15 años de experiencia en Chubut, Patagonia. Primera consulta sin costo. Contadores y abogados expertos.',
    keywords: 'contador trelew, abogado trelew, estudio contable chubut, estudio jurídico trelew, asesoramiento impositivo trelew, auditoría contable chubut, liquidación sueldos trelew, asesoramiento legal empresarial chubut',
    ogImage: `${SITE_BASE_URL}/assets/FOTO1.png`
  },
  '/servicios': {
    title: 'Servicios Contables y Jurídicos | Estudio Kaisen – Trelew',
    description: 'Consultoría financiera, auditoría y asesoramiento legal en Trelew. Soluciones integrales y confiables. +15 años en Chubut, Patagonia. Primera consulta sin costo.',
    keywords: 'servicios contables trelew, consultoría financiera chubut, auditoría empresarial trelew, asesoramiento legal trelew, capacitación empresarial chubut, planificación estratégica trelew, consultoría impositiva chubut, liquidación de sueldos trelew',
    ogImage: `${SITE_BASE_URL}/assets/FOTO2.png`
  },
  '/nosotros': {
    title: 'Estudio Contable Trelew, Patagonia | Nosotros – Estudio Kaisen',
    description: 'Equipo multidisciplinario en Trelew: contadores y abogados con +15 años de experiencia. Conocé nuestra misión y valores. Confiabilidad en Chubut, Patagonia.',
    keywords: 'estudio kaisen trelew, contadores trelew, abogados trelew, estudio contable chubut, profesionales contables trelew, estudio jurídico contable chubut',
    ogImage: `${SITE_BASE_URL}/assets/FOTO3.png`
  },
  '/contacto': {
    title: 'Contacto Trelew, Chubut | Estudio Kaisen – 9 de Julio 128',
    description: 'Contactá con Estudio Kaisen en Trelew. 9 de Julio 128, 1° piso A. Tel: 280 442-1137. WhatsApp: 280 436-6867. Primera consulta sin costo. Atención personalizada.',
    keywords: 'contacto estudio kaisen, contador trelew teléfono, consulta gratuita contador trelew, abogado trelew contacto, estudio contable trelew dirección',
    ogImage: `${SITE_BASE_URL}/assets/FOTO4.png`
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
    updateMetaTag('og:url', `${SITE_BASE_URL}${location.pathname}`, true);
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
    canonical.setAttribute('href', `${SITE_BASE_URL}${location.pathname}`);
  }, [location.pathname]);
}

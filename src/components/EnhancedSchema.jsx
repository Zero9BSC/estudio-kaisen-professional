import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function EnhancedSchema() {
  const location = useLocation();

  useEffect(() => {
    // Organization/ProfessionalService: single source in index.html (static). Do not inject here.
    // Page-specific schemas only (reference #organization via @id)
    let pageSchemas = [];

    if (location.pathname === '/') {
      pageSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'Service',
            position: 1,
            name: 'Consultoría Financiera',
            description: 'Asesoramiento integral en gestión financiera, optimización de costos y proyección de presupuestos',
            provider: { '@id': 'https://consultorakaisen.com.ar/#organization' }
          },
          {
            '@type': 'Service',
            position: 2,
            name: 'Planificación Estratégica',
            description: 'Desarrollo de estrategias, análisis de mercado y planes de crecimiento empresarial',
            provider: { '@id': 'https://consultorakaisen.com.ar/#organization' }
          },
          {
            '@type': 'Service',
            position: 3,
            name: 'Asesoramiento Contable y Legal',
            description: 'Gestión contable, cumplimiento normativo, auditorías y asesoramiento jurídico empresarial',
            provider: { '@id': 'https://consultorakaisen.com.ar/#organization' }
          },
          {
            '@type': 'Service',
            position: 4,
            name: 'Capacitación Empresarial',
            description: 'Formación profesional, desarrollo organizacional y capacitación de equipos',
            provider: { '@id': 'https://consultorakaisen.com.ar/#organization' }
          }
        ]
      });
    }

    if (location.pathname === '/servicios') {
      pageSchemas = [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Servicios Profesionales',
          description: 'Servicios contables, impositivos, legales y de capacitación empresarial en Trelew, Chubut',
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: 4,
            itemListElement: [
              {
                '@type': 'Service',
                name: 'Consultoría Financiera',
                description: 'Optimización financiera, análisis de costos y proyecciones presupuestarias para empresas en Trelew y la Patagonia',
                serviceType: 'Financial Consulting',
                areaServed: ['Trelew', 'Chubut', 'Patagonia Argentina']
              },
              {
                '@type': 'Service',
                name: 'Planificación Estratégica',
                description: 'Roadmaps estratégicos, definición de visión y misión, KPIs y seguimiento de implementación',
                serviceType: 'Strategic Planning',
                areaServed: ['Trelew', 'Chubut', 'Patagonia Argentina']
              },
              {
                '@type': 'Service',
                name: 'Asesoramiento Contable y Legal',
                description: 'Cumplimiento normativo, optimización fiscal, auditorías y asesoramiento jurídico empresarial',
                serviceType: 'Accounting and Legal',
                areaServed: ['Trelew', 'Chubut', 'Patagonia Argentina']
              },
              {
                '@type': 'Service',
                name: 'Capacitación Empresarial',
                description: 'Formación profesional, liderazgo, desarrollo organizacional y capacitación de equipos',
                serviceType: 'Corporate Training',
                areaServed: ['Trelew', 'Chubut', 'Patagonia Argentina']
              }
            ]
          }
        }
      ];
    }

    if (location.pathname === '/nosotros') {
      pageSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Sobre Nosotros - Estudio Kaisen',
        description: 'Equipo multidisciplinario de contadores, abogados y asesores con más de 15 años de experiencia en Trelew, Chubut',
        mainEntity: { '@id': 'https://consultorakaisen.com.ar/#organization' }
      });
    }

    if (location.pathname === '/contacto') {
      pageSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contacto Estudio Kaisen',
        description: 'Formulario de contacto y información de contacto del Estudio Kaisen en Trelew',
        mainEntity: { '@id': 'https://consultorakaisen.com.ar/#organization' }
      });
    }

    // Remove old page schemas to avoid stale IDs
    document.querySelectorAll('script[id^="schema-page-"]').forEach((el) => el.remove());

    const injectSchema = (schema, id) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    };

    pageSchemas.forEach((schema, index) => {
      injectSchema(schema, `schema-page-${index}`);
    });
  }, [location.pathname]);

  return null;
}

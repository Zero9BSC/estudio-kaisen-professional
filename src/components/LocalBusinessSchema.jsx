import { useEffect } from 'react';

export function LocalBusinessSchema() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": "https://consultorakaisen.com.ar/#organization",
      "name": "Estudio Kaisen",
      "alternateName": "Estudio Jurídico-Contable Kaisen",
      "description": "Estudio profesional multidisciplinario de contadores, abogados y asesores especializados en servicios contables, impositivos, legales y capacitación empresarial en Trelew, Chubut",
      "url": "https://consultorakaisen.com.ar",
      "telephone": "+54-280-442-1137",
      "email": "estudiokaisentrelew@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "9 de Julio 128, 1° piso A (Edificio Iberia)",
        "addressLocality": "Trelew",
        "addressRegion": "Chubut",
        "postalCode": "U9100",
        "addressCountry": "AR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -43.2519305,
        "longitude": -65.3053820
      },
      "areaServed": [
        { "@type": "City", "name": "Trelew" },
        { "@type": "City", "name": "Comodoro Rivadavia" },
        { "@type": "City", "name": "Puerto Madryn" },
        { "@type": "City", "name": "Rawson" },
        { "@type": "State", "name": "Chubut" }
      ],
      "priceRange": "$$",
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios Profesionales",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Consultoría Financiera",
              "description": "Asesoramiento integral en gestión financiera, optimización de costos y proyección de presupuestos"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Planificación Estratégica",
              "description": "Desarrollo de estrategias, análisis de mercado y planes de crecimiento empresarial"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Asesoramiento Contable y Legal",
              "description": "Gestión contable, cumplimiento normativo, auditorías y asesoramiento jurídico empresarial"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Capacitación Empresarial",
              "description": "Formación profesional, desarrollo organizacional y capacitación de equipos"
            }
          }
        ]
      }
    };

    // Check if script already exists
    let scriptTag = document.querySelector('script[type="application/ld+json"]');

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    scriptTag.textContent = JSON.stringify(schema);
  }, []);

  return null; // This component doesn't render anything
}

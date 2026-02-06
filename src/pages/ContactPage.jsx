import { useMetaTags } from '../hooks/useMetaTags';
import ContactSection from '../components/sections/ContactSection';
import { MapPin } from 'lucide-react';

const ContactPage = () => {
  useMetaTags();

  return (
    <>
      {/* Hero - Mismo estilo que Services y About */}
      <div className="relative px-4 py-20 overflow-hidden text-white bg-gradient-to-r from-primary to-dark">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl font-heading">
              Tu éxito empresarial <span className="text-secondary">comienza aquí</span>
            </h1>
            <p className="mb-8 text-xl text-gray-200 font-body">
              Conecta con expertos que transformarán tus desafíos en oportunidades de crecimiento. 
              Primera consulta sin costo.
            </p>
          </div>
        </div>
        <div className="absolute w-32 h-32 rounded-full top-10 right-10 bg-secondary/10 blur-3xl"></div>
        <div className="absolute w-40 h-40 rounded-full bottom-10 left-10 bg-accent/20 blur-3xl"></div>
      </div>

      {/* Formulario de contacto */}
      <ContactSection />

      {/* Mapa real con Google Maps */}
      <div className="container px-4 mx-auto mt-8 mb-16">
        <div className="overflow-hidden shadow-lg rounded-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2891.630981500171!2d-65.30757072367596!3d-43.25193025824693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbe0148f04eebbd7d%3A0xe110db5f4202ec59!2s9%20de%20Julio%20128%2C%20U9100%20Trelew%2C%20Chubut!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Estudio Kaisen"
            className="w-full h-[450px]"
          ></iframe>
        </div>
        
        <div className="mt-6 text-center">
          <p className="mb-4 text-gray-600">
            📍 <strong>9 de Julio 128, 1° piso "A" (Edificio Iberia)</strong><br />
            Entre Belgrano y Rivadavia, Trelew, Chubut, Argentina
          </p>
          <a 
            href="https://www.google.com/maps/dir//9+de+Julio+128,+U9100+Trelew,+Chubut/@-43.2519305,-65.3075707,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0xbe0148f04eebbd7d:0xe110db5f4202ec59!2m2!1d-65.305382!2d-43.2519305?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 font-medium text-white transition-colors rounded-lg bg-primary hover:bg-primary/90"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Cómo llegar con Google Maps
          </a>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
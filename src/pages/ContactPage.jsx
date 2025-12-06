import ContactSection from '../components/sections/ContactSection';

const ContactPage = () => {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary to-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contáctanos
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Agenda una consulta gratuita y descubre cómo podemos optimizar tu empresa.
          </p>
        </div>
      </section>

      {/* Formulario de contacto */}
      <ContactSection />

      {/* Mapa (placeholder) */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
          <p className="text-gray-500">📍 Mapa de ubicación - Calle Falsa 123, Trelew, Chubut</p>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
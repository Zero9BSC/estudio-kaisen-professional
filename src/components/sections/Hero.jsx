import Button from '../ui/Button';

const Hero = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Soluciones Contables Integrales en <span className="text-secondary">Trelew</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Asesoramiento financiero y legal especializado para empresas y emprendedores. 
            Optimizamos tus recursos y potenciamos tu crecimiento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" className="text-lg px-8 py-4">
              Nuestros Servicios
            </Button>
            <Button variant="outline" className="text-lg px-8 py-4">
              Contactar Ahora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
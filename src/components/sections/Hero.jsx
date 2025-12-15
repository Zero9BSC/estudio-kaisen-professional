import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
  navigate('/contacto');
  };

  const handleServicesClick = () => {
  navigate('/servicios');
  };

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl text-primary">
            Soluciones Contables Integrales en <span className="text-secondary">Trelew</span>
          </h1>
          <p className="max-w-3xl mx-auto mb-10 text-xl text-gray-600">
            Asesoramiento financiero y legal especializado para empresas y emprendedores. 
            Optimizamos tus recursos y potenciamos tu crecimiento.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="primary" className="px-8 py-4 text-lg transition duration-300 transform rounded-lg shadow-lg btn-primary hover:-translate-y-1" onClick={handleServicesClick}>
              Nuestros Servicios
            </Button>
            <Button variant="outline" className="px-8 py-4 text-lg" onClick={handleContactClick}>
              Contactar Ahora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
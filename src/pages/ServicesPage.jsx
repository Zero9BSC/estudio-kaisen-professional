import ServicesGrid from '../components/sections/ServicesGrid';
import { services } from '../data/servicesData';
import SectionTitle from '../components/ui/SectionTitle';

const ServicesPage = () => {
  return (
    <div className="section-padding">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Todos Nuestros Servicios"
          subtitle="Conoce en detalle cada una de nuestras áreas de expertise"
          center
        />
        
        <div className="space-y-12">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start gap-6">
                <div className="text-5xl">{service.icon}</div>
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-3 h-3 bg-secondary rounded-full mr-3"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
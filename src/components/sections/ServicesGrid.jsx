import { services } from '../../data/servicesData';
import Card from '../ui/Card';
import SectionTitle from '../ui/SectionTitle';

const ServicesGrid = ({ limit = 4 }) => {
  const displayedServices = services.slice(0, limit);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Nuestros Servicios Especializados"
          subtitle="Soluciones integrales para optimizar la gestión de tu empresa"
          center
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedServices.map((service) => (
            <Card key={service.id} className="hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-500">
                    <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
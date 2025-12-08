import { services } from '../../data/servicesData';
import Card from '../ui/Card';
import SectionTitle from '../ui/SectionTitle';

const ServicesGrid = ({ limit = 4 }) => {
  const displayedServices = services.slice(0, limit);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container px-4 mx-auto">
        <SectionTitle
          title="Nuestros Servicios Especializados"
          subtitle="Soluciones integrales para optimizar la gestión de tu empresa"
          center
        />
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {displayedServices.map((service) => (
            <Card key={service.id} className="transition-shadow hover:shadow-xl">
              <div className="mb-4 text-4xl">{service.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-primary">
                {service.title}
              </h3>
              <p className="mb-4 text-gray-600">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-500">
                    <span className="w-2 h-2 mr-2 rounded-full bg-secondary"></span>
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
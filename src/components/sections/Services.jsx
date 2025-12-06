import { services } from '../../data/servicesData';
import Card from '../ui/Card';

const Services = ({ compact = false }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service) => (
        <Card key={service.id} className="hover:shadow-xl transition-shadow h-full">
          <div className="text-3xl mb-4">{service.icon}</div>
          <h3 className="text-xl font-bold text-primary mb-3">
            {service.title}
          </h3>
          <p className="text-gray-600 mb-4">
            {service.description}
          </p>
          {!compact && (
            <ul className="space-y-2">
              {service.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center text-gray-500">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </Card>
      ))}
    </div>
  );
};

export default Services;
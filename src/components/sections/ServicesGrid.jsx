import { services } from '../../data/servicesData';
import Card from '../ui/Card';
import SectionTitle from '../ui/SectionTitle';
import { 
  DollarSign,
  Target,
  Scale,
  Users,
  ChevronRight,
  Check 
} from 'lucide-react';

const ServicesGrid = ({ limit = 4 }) => {
  const displayedServices = services.slice(0, limit);

  // Mapeo de nombres de íconos a componentes
  const iconComponents = {
    DollarSign: DollarSign,
    Target: Target,
    Scale: Scale,
    Users: Users
  };

  // Colores para cada categoría
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      iconBg: 'bg-blue-100'
    },
    purple: {
      bg: 'bg-purple-50', 
      text: 'text-purple-600',
      border: 'border-purple-100',
      iconBg: 'bg-purple-100'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-100',
      iconBg: 'bg-green-100'
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-100',
      iconBg: 'bg-orange-100'
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 mx-auto">
        <SectionTitle
          title="Nuestros Servicios Especializados"
          subtitle="Soluciones integrales diseñadas para optimizar cada aspecto de tu empresa"
          center
        />
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {displayedServices.map((service) => {
            const colors = colorClasses[service.color];
            const IconComponent = iconComponents[service.iconName];
            
            return (
              <Card 
                key={service.id} 
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ${colors.border} hover:border-secondary/30`}
              >
                {/* Badge de categoría */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {service.category}
                  </span>
                </div>
                
                {/* Ícono profesional */}
                {IconComponent && (
                  <div className={`inline-flex p-3 rounded-xl mb-6 ${colors.iconBg} ${colors.text}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                )}
                
                {/* Título */}
                <h3 className="mb-3 text-xl font-bold text-primary">
                  {service.title}
                </h3>
                
                {/* Descripción */}
                <p className="mb-4 text-gray-600">
                  {service.description}
                </p>
                
                {/* Características elegantes */}
                <ul className="mb-6 space-y-2">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-500">
                      <Check className="w-4 h-4 mt-0.5 mr-2 text-secondary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Enlace elegante */}
                <div className="pt-4 border-t border-gray-100">
                  <button className="inline-flex items-center text-sm font-medium transition-colors text-primary hover:text-secondary group/link">
                    <span className="mr-2">Ver detalles</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 text-lg font-semibold text-white transition-all rounded-lg bg-secondary hover:bg-accent hover:shadow-lg">
            Solicitar consultoría gratuita
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Más de 50 empresas confían en nuestros servicios
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
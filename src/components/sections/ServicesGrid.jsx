import { services } from '../../data/servicesData';
import Card from '../ui/Card';
import { 
  DollarSign,
  Target,
  Scale,
  Users,
  ChevronRight,
  Check,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServicesGrid = ({ limit = 4 }) => {
  const navigate = useNavigate();
  const displayedServices = services.slice(0, limit);

  const iconComponents = {
    DollarSign: DollarSign,
    Target: Target,
    Scale: Scale,
    Users: Users
  };

  const colorClasses = {
    blue: {
      bg: 'bg-primary/5',
      text: 'text-primary',
      border: 'border-primary/20',
      iconBg: 'bg-primary/10'
    },
    purple: {
      bg: 'bg-secondary/5', 
      text: 'text-secondary',
      border: 'border-secondary/20',
      iconBg: 'bg-secondary/10'
    },
    green: {
      bg: 'bg-accent/5',
      text: 'text-accent',
      border: 'border-accent/20',
      iconBg: 'bg-accent/10'
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-100',
      iconBg: 'bg-orange-100'
    }
  };

  const handleContactClick = () => {
    navigate('/contacto');
  };

  const handleServiceClick = () => {
    navigate('/servicios');
  };

  return (
    <section className="py-20 bg-white">
      <div className="px-4 mx-auto max-w-7xl">
        {/* PARTE SUPERIOR DEL CONTENEDOR - MEJORADA */}
        <div className="relative mb-16 text-center">
          {/* Elemento decorativo superior */}
          {/* <div className="absolute top-0 transform -translate-x-1/2 -translate-y-4 left-1/2">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10">
              <Sparkles className="w-8 h-8 text-secondary" />
            </div>
          </div> */}
          
          {/* Badge con número de servicios */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 font-semibold border rounded-full bg-secondary/10 text-secondary font-body border-secondary/20">
            <span className="flex items-center justify-center w-6 h-6 text-xs text-white rounded-full bg-secondary">4</span>
            <span>Servicios Especializados</span>
          </div>
          
          {/* Título principal */}
          <h2 className="mb-6 text-3xl font-bold md:text-4xl text-primary font-heading">
            Transformamos <span className="text-secondary">desafíos</span> en <span className="text-accent">oportunidades</span>
          </h2>
          
          {/* Subtítulo */}
          <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-600 font-body">
            Soluciones integrales diseñadas para optimizar cada aspecto estratégico y operativo de tu empresa.
          </p>
          
          {/* Separador decorativo */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-1 rounded-full bg-primary/20"></div>
            <div className="w-4 h-4 rounded-full bg-secondary/20"></div>
            <div className="w-12 h-1 rounded-full bg-primary/20"></div>
          </div>
          
          {/* Mini descripción */}
          <div className="inline-block px-6 py-3 border rounded-lg bg-primary/5 border-primary/10">
            <p className="text-sm font-medium text-gray-700 font-body">
              Cada servicio incluye: <span className="font-semibold text-primary">Diagnóstico personalizado</span> • 
              <span className="mx-2 font-semibold text-secondary">Plan de acción</span> • 
              <span className="mx-2 font-semibold text-accent">Seguimiento continuo</span>
            </p>
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {displayedServices.map((service) => {
            const colors = colorClasses[service.color] || colorClasses.blue;
            const IconComponent = iconComponents[service.iconName];
            
            return (
              <Card 
                key={service.id} 
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-t-4 ${
                  service.color === 'blue' ? 'border-primary' :
                  service.color === 'purple' ? 'border-secondary' :
                  service.color === 'green' ? 'border-accent' : 'border-orange-400'
                }`}
              >
                {/* Badge de categoría */}
                <div className="absolute z-10 top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {service.category}
                  </span>
                </div>
                
                {/* Ícono profesional */}
                <div className="relative mb-8">
                  <div className={`absolute -top-2 -left-2 w-12 h-12 rounded-lg rotate-12 opacity-20 ${colors.bg}`}></div>
                  {IconComponent && (
                    <div className={`inline-flex p-4 rounded-xl mb-4 relative z-10 ${colors.iconBg} ${colors.text} transition-transform duration-300 group-hover:scale-110`}>
                      <IconComponent className="w-10 h-10" />
                    </div>
                  )}
                </div>
                
                {/* Título */}
                <h3 className="mb-4 text-xl font-bold transition-colors text-primary font-heading group-hover:text-secondary">
                  {service.title}
                </h3>
                
                {/* Descripción */}
                <p className="mb-6 leading-relaxed text-gray-600 font-body">
                  {service.description}
                </p>
                
                {/* Características */}
                <ul className="mb-8 space-y-3">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <div className={`w-2 h-2 rounded-full mt-1.5 mr-3 flex-shrink-0 ${
                        service.color === 'blue' ? 'bg-primary' :
                        service.color === 'purple' ? 'bg-secondary' :
                        service.color === 'green' ? 'bg-accent' : 'bg-orange-500'
                      }`}></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Enlace */}
                <div className="pt-6 border-t border-gray-100">
                  <button 
                    onClick={handleServiceClick}
                    className="inline-flex items-center text-sm font-medium transition-colors text-primary hover:text-secondary group/link"
                  >
                    <span className="mr-2 font-semibold">Ver detalles</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button 
            onClick={handleContactClick}
            className="px-8 py-3 text-lg font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-secondary hover:bg-accent hover:shadow-lg font-body group"
          >
            <span className="flex items-center justify-center">
              Solicitar consultoría gratuita
              <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
          <p className="mt-4 text-sm text-gray-500 font-body">
            <span className="font-semibold text-primary">+50 empresas</span> confían en nuestros servicios
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
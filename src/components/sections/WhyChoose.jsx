import { values } from '../../data/servicesData';
import { CheckCircle, Shield, Users, TrendingUp, Award } from 'lucide-react';

const WhyChoose = () => {
  const icons = [CheckCircle, Shield, Users, TrendingUp];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Título mejorado */}
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-2 mb-4 font-semibold rounded-full bg-primary/10 text-primary font-body">
            Nuestra Ventaja
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-dark font-heading">
            ¿Por qué <span className="text-primary">elegirnos</span>?
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 font-body">
            Valores fundamentales que nos diferencian y garantizan resultados excepcionales para tu empresa.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const IconComponent = icons[index] || Award;
            
            return (
              <div 
                key={index} 
                className="p-8 text-center transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-xl hover:shadow-xl hover:-translate-y-2"
              >
                {/* Icono con fondo decorativo */}
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div className="absolute w-20 h-20 transition-colors rounded-full bg-secondary/10 group-hover:bg-secondary/20"></div>
                  <div className="relative z-10 p-4 text-white transition-transform rounded-full bg-primary group-hover:scale-110">
                    <IconComponent className="w-8 h-8" />
                  </div>
                </div>
                
                {/* Título */}
                <h3 className="mb-4 text-xl font-bold transition-colors text-primary font-heading group-hover:text-secondary">
                  {value.title}
                </h3>
                
                {/* Descripción */}
                <p className="leading-relaxed text-gray-600 font-body">
                  {value.description}
                </p>
                
                {/* Elemento decorativo */}
                <div className="pt-6 mt-6 border-t border-gray-100">
                  <div className="w-12 h-1 mx-auto transition-all duration-300 rounded-full bg-secondary/30 group-hover:w-16"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Estadísticas o certificaciones */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md">
            <Award className="w-6 h-6 text-secondary" />
            <span className="font-semibold text-gray-700 font-body">
              <span className="text-primary">+15 años</span> de experiencia • 
              <span className="mx-2 text-secondary">+100 proyectos</span> exitosos • 
              <span className="mx-2 text-accent">+50 clientes</span> satisfechos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
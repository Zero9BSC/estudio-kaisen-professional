import { useState, useEffect } from 'react';
import { services } from '../../data/servicesData';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign,
  Target,
  Users,
  FileText
} from 'lucide-react';

import FOTO1 from '../../assets/FOTO1.png';
import FOTO2 from '../../assets/FOTO2.png';
import FOTO3 from '../../assets/FOTO3.png';
import FOTO4 from '../../assets/FOTO4.png';

const ServicesGrid = () => {
  const displayedServices = services.slice(0, 4);
  const [activeCard, setActiveCard] = useState(0); 
  const [isAnimating, setIsAnimating] = useState(false);
  const images = [FOTO1, FOTO2, FOTO3, FOTO4];
  const navigate = useNavigate();
  
  const iconComponents = {
    DollarSign,
    Target,
    FileText,
    Users
  };

  const slantSize = 80; 

  // --- 1. AUTO-PLAY LÓGICA ---
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev === displayedServices.length - 1 ? 0 : prev + 1));
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(timer);
  }, [displayedServices.length]);

  // --- 2. CONTROL DE APARECER TEXTO (CORREGIDO) ---
  useEffect(() => {
    // Usamos requestAnimationFrame para que React no lo sienta como una 
    // actualización síncrona "violenta" dentro del efecto.
    const animationFrame = requestAnimationFrame(() => {
      setIsAnimating(true);
    });

    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 400); 

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
    };
  }, [activeCard]);

  return (
    <section className="relative w-full h-[600px] bg-primary overflow-hidden">
      <div className="flex w-full h-full">
        {displayedServices.map((service, index) => {
          const isActive = activeCard === index;
          const isFirst = index === 0;
          const isLast = index === displayedServices.length - 1;
          const IconComponent = iconComponents[service.iconName] || Target;

          let clipPathValue;
          if (isFirst) {
            clipPathValue = `polygon(0% 0%, 100% 0%, calc(100% - ${slantSize}px) 100%, 0% 100%)`;
          } else if (isLast) {
            clipPathValue = `polygon(${slantSize}px 0%, 100% 0%, 100% 100%, 0% 100%)`;
          } else {
            clipPathValue = `polygon(${slantSize}px 0%, 100% 0%, calc(100% - ${slantSize}px) 100%, 0% 100%)`;
          }

          return (
            <div
              key={service.id}
              onClick={() => setActiveCard(index)}
              onMouseEnter={() => setActiveCard(index)}
              className={`relative h-full transition-all duration-500 ease-in-out cursor-pointer overflow-hidden ${
                isActive ? 'flex-[4]' : 'flex-[1]'
              }`}
              style={{
                marginLeft: isFirst ? '0px' : `-${slantSize}px`,
                clipPath: clipPathValue,
                zIndex: isActive ? 10 : 0, 
              }}
            >
              {/* IMAGEN DE FONDO CON MEJOR LEGIBILIDAD */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={images[index]}
                  alt={service.title}
                  className={`w-full h-full object-cover transition-transform duration-1000 ${
                    isActive ? 'scale-110' : 'scale-100 filter grayscale brightness-50'
                  }`}
                />
                {/* GRADIENTE MULTICAPA PARA TEXTO (Soporta imágenes blancas/brillantes) */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive 
                    ? 'bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-90' 
                    : 'bg-primary/60 opacity-100'
                }`} />
              </div>

              {/* CONTENIDO ACTIVO CON DESAPARICIÓN INSTANTÁNEA AL CERRAR */}
              <div className={`absolute inset-0 p-12 flex flex-col justify-end text-white 
                ${isActive && !isAnimating 
                  ? 'opacity-100 translate-y-0 transition-all duration-600 delay-50' // Al abrir: suave y con espera
                  : 'opacity-0 translate-y-4 transition-none' // Al cerrar: instantáneo (transition-none)
                }`}
              >
                <div style={{ paddingLeft: isFirst ? '0px' : `${slantSize}px` }}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2 rounded shadow-lg bg-secondary backdrop-blur-md">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-3xl font-bold tracking-wider uppercase font-heading drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="max-w-xl text-base leading-relaxed text-gray-100 font-body drop-shadow-[0_1px_5px_rgba(0,0,0,0.7)]">
                    {service.description}
                  </p>

                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate('/servicios'); }} 
                    className="pb-1 mt-6 text-sm font-medium tracking-widest text-white uppercase transition-all border-b-2 border-secondary hover:text-secondary hover:border-white w-fit font-body"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>

              {/* ICONO GIGANTE INACTIVO */}
              {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div style={{ transform: `translateX(${slantSize/2}px)` }}>
                    <IconComponent 
                      className="w-20 h-20 transition-all duration-700 stroke-1 text-white/20" 
                      strokeWidth={1}
                    />
                  </div>
                </div>
              )}
              
              {/* BORDE SEPARADOR */}
              <div 
                className="absolute inset-y-0 right-0 w-[1px] bg-white/10 z-20"
                style={{ right: isLast ? '0' : 'auto', left: isLast ? '0' : 'auto' }} 
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesGrid;
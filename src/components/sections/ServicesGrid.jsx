import { useState, useEffect, useLayoutEffect, useRef, startTransition } from 'react';
import { services } from '../../data/servicesData';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign,
  Target,
  Users,
  FileText,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

import FOTO1 from '../../assets/FOTO1.png';
import FOTO2 from '../../assets/FOTO2.png';
import FOTO3 from '../../assets/FOTO3.png';
import FOTO4 from '../../assets/FOTO4.png';
import FOTO1webp from '../../assets/FOTO1.webp';
import FOTO2webp from '../../assets/FOTO2.webp';
import FOTO3webp from '../../assets/FOTO3.webp';
import FOTO4webp from '../../assets/FOTO4.webp';

const HERO_WIDTH = 1200;
const HERO_HEIGHT = 600;

const images = [
  { png: FOTO1, webp: FOTO1webp },
  { png: FOTO2, webp: FOTO2webp },
  { png: FOTO3, webp: FOTO3webp },
  { png: FOTO4, webp: FOTO4webp }
];

const ServicesGrid = () => {
  const displayedServices = services.slice(0, 4);
  const [activeCard, setActiveCard] = useState(0); 
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  
  // Ref para el scroll automático en móvil
  const scrollRef = useRef(null);

  const iconComponents = {
    DollarSign,
    Target,
    FileText,
    Users
  };

  const slantSize = 80;

  // LCP: preload first hero image so it’s discovered early
  useLayoutEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = typeof FOTO1webp === 'string' ? FOTO1webp : (FOTO1webp?.default ?? FOTO1webp?.src ?? '');
    if (link.href) document.head.appendChild(link);
    return () => link.remove();
  }, []);

  // --- 1. AUTO-PLAY LÓGICA ---
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev === displayedServices.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [displayedServices.length]);

  // --- 2. SINCRONIZACIÓN DE SCROLL PARA MÓVIL ---
  useEffect(() => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: width * activeCard,
        behavior: 'smooth'
      });
    }
  }, [activeCard]);

  // --- 3. CONTROL DE ANIMACIÓN TEXTO ---
  useEffect(() => {
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
    <section className="relative w-full h-[600px] bg-primary overflow-hidden" aria-labelledby="services-grid-heading">
      <h2 id="services-grid-heading" className="sr-only">Nuestros Servicios</h2>

      {/* --- VERSIÓN MÓVIL (Simple, Rectangular, Deslizable) --- */}
      <div className="relative flex w-full h-full md:hidden">
        <div 
          ref={scrollRef}
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayedServices.map((service, index) => {
            const IconComponent = iconComponents[service.iconName] || Target;
            const { png, webp } = images[index];
            return (
              <div 
                key={`mobile-${service.id}`}
                className="relative flex-shrink-0 w-full h-full snap-start"
              >
                <picture className="absolute inset-0 block w-full h-full">
                  <source srcSet={webp} type="image/webp" />
                  <img
                    src={png}
                    alt={service.title}
                    width={HERO_WIDTH}
                    height={HERO_HEIGHT}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={index === 0 ? 'high' : undefined}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded bg-secondary">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-wider uppercase">
                      {service.title}
                    </h3>
                  </div>
                  <p className="mb-6 text-sm text-gray-200 line-clamp-3">
                    {service.description}
                  </p>
                  <button 
                    onClick={() => navigate('/servicios')}
                    className="pb-1 text-xs font-bold tracking-widest uppercase border-b-2 w-fit border-secondary"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicadores de puntos (Dots) para móvil */}
        <div className="absolute z-30 flex gap-2 -translate-x-1/2 bottom-4 left-1/2" aria-hidden="true">
          {displayedServices.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-300 ${activeCard === i ? 'w-8 bg-secondary' : 'w-2 bg-white/30'}`}
            />
          ))}
        </div>
      </div>

      {/* --- VERSIÓN DESKTOP (Tu código original intacto) --- */}
      <div className="hidden w-full h-full md:flex">
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
              role="button"
              tabIndex={0}
              aria-label={`Ver ${service.title}`}
              onClick={() => startTransition(() => setActiveCard(index))}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startTransition(() => setActiveCard(index)); } }}
              onMouseEnter={() => startTransition(() => setActiveCard(index))}
              className={`relative h-full transition-all duration-500 ease-in-out cursor-pointer overflow-hidden ${
                isActive ? 'flex-[4]' : 'flex-[1]'
              }`}
              style={{
                marginLeft: isFirst ? '0px' : `-${slantSize}px`,
                clipPath: clipPathValue,
                zIndex: isActive ? 10 : 0, 
              }}
            >
              <div className="absolute inset-0 w-full h-full" style={{ aspectRatio: `${HERO_WIDTH} / ${HERO_HEIGHT}` }}>
                <picture className="block w-full h-full">
                  <source srcSet={images[index].webp} type="image/webp" />
                  <img
                    src={images[index].png}
                    alt={service.title}
                    width={HERO_WIDTH}
                    height={HERO_HEIGHT}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={index === 0 ? 'high' : undefined}
                    className={`w-full h-full object-cover transition-transform duration-1000 ${
                    isActive ? 'scale-110' : 'scale-100 filter grayscale brightness-50'
                  }`}
                  />
                </picture>
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive 
                    ? 'bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-90' 
                    : 'bg-primary/60 opacity-100'
                }`} />
              </div>

              <div className={`absolute inset-0 p-12 flex flex-col justify-end text-white 
                ${isActive && !isAnimating 
                  ? 'opacity-100 translate-y-0 transition-all duration-600 delay-50' 
                  : 'opacity-0 translate-y-4 transition-none' 
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
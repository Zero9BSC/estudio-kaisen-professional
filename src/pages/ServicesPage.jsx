import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PieChart, 
  Navigation, 
  FileText, 
  GraduationCap,
  BarChart,
  ClipboardCheck,
  ShieldCheck,
  Award,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

const ServicesPage = () => {
  const navigate = useNavigate();

  // ESTE EFECTO ES EL IMPORTANTE
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContactClick = () => {
    navigate('/contacto');
  };

  const services = [
    {
      title: "Consultoría Financiera",
      description: "Analizamos a profundidad la estructura financiera de tu empresa para identificar oportunidades de mejora, optimizar recursos y maximizar la rentabilidad. Implementamos herramientas avanzadas de análisis y seguimiento.",
      icon: <PieChart className="w-12 h-12" />,
      features: [
        "Análisis de rentabilidad por segmento",
        "Optimización de flujo de caja",
        "Proyecciones financieras estratégicas",
        "Control de costos y gastos"
      ],
      color: "primary"
    },
    {
      title: "Planificación Estratégica",
      description: "Diseñamos roadmaps personalizados que transforman tus objetivos empresariales en acciones concretas, medibles y con plazos definidos. Facilitamos la alineación entre visión y ejecución.",
      icon: <Navigation className="w-12 h-12" />,
      features: [
        "Definición de visión y misión",
        "Mapas estratégicos personalizados",
        "Sistemas de medición KPI",
        "Seguimiento de implementación"
      ],
      color: "emerald"
    },
    {
      title: "Asesoramiento Contable",
      description: "Protegemos tu empresa con asesoramiento especializado que garantiza el cumplimiento normativo y fiscal. Minimizamos riesgos legales y optimizamos tu estructura contable.",
      icon: <FileText className="w-12 h-12" />,
      features: [
        "Auditoría de cumplimiento normativo",
        "Optimización fiscal estratégica",
        "Protección de activos empresariales",
        "Asesoría en contratos y acuerdos"
      ],
      color: "indigo"
    },
    {
      title: "Capacitación y Desarrollo",
      description: "Potenciamos el capital humano de tu organización mediante programas de formación especializados que desarrollan competencias técnicas, de liderazgo y trabajo en equipo.",
      icon: <GraduationCap className="w-12 h-12" />,
      features: [
        "Programas de liderazgo ejecutivo",
        "Desarrollo de habilidades técnicas",
        "Coaching para equipos de alto rendimiento",
        "Desarrollo de equipos y alto rendimiento"
      ],
      color: "secondary"
    }
  ];

  const methodologies = [
    {
      title: "Enfoque Metodológico",
      icon: <ClipboardCheck className="w-10 h-10" />,
      description: "Aplicamos metodologías probadas que aseguran la implementación efectiva de cada solución."
    },
    {
      title: "Resultados Garantizados",
      icon: <BarChart className="w-10 h-10" />,
      description: "Establecemos métricas claras y reportes periódicos para medir el impacto de nuestras soluciones."
    },
    {
      title: "Seguridad y Confidencialidad",
      icon: <ShieldCheck className="w-10 h-10" />,
      description: "Mantenemos los más altos estándares de confidencialidad y protección de información."
    },
    {
      title: "Experiencia Comprobada",
      icon: <Award className="w-10 h-10" />,
      description: "+15 años de experiencia transformando empresas en diversos sectores industriales."
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Diagnóstico",
      description: "Evaluación integral de tu situación actual y necesidades específicas."
    },
    {
      number: "02",
      title: "Planificación",
      description: "Diseño de estrategia personalizada con objetivos claros y medibles."
    },
    {
      number: "03",
      title: "Implementación",
      description: "Ejecución controlada con acompañamiento experto en cada etapa."
    },
    {
      number: "04",
      title: "Seguimiento",
      description: "Monitoreo continuo y ajustes para optimizar resultados."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Usando colores la configuración */}
      <div className="relative px-4 py-20 overflow-hidden text-white bg-gradient-to-r from-primary to-dark">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl font-heading">
              Soluciones Integrales para el <span className="text-secondary">Crecimiento Empresarial</span>
            </h1>
            <p className="mb-8 text-xl text-gray-200 font-body">
              Transformamos desafíos empresariales en oportunidades de crecimiento mediante estrategias personalizadas y ejecución experta.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="px-8 py-3 transition duration-300 transform rounded-lg shadow-lg btn-primary hover:-translate-y-1" onClick={handleContactClick}>
                Solicitar Consultoría
              </button>
              {/* <button className="px-8 py-3 text-white transition duration-300 border-white rounded-lg btn-outline hover:bg-white hover:text-primary">
                Ver Casos de Éxito
              </button> */}
            </div>
          </div>
        </div>
        
        {/* Elementos decorativos */}
        <div className="absolute w-32 h-32 rounded-full top-10 right-10 bg-secondary/10 blur-3xl"></div>
        <div className="absolute w-40 h-40 rounded-full bottom-10 left-10 bg-accent/20 blur-3xl"></div>
      </div>

      {/* Services Detailed Section */}
      <div className="px-4 py-16 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-2 mb-4 font-semibold rounded-full bg-accent/10 text-accent font-body">
            Nuestros Servicios
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-dark font-heading">
            Soluciones <span className="text-primary">Especializadas</span> para tu Empresa
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 font-body">
            Cada servicio está diseñado con metodologías probadas y adaptado a las necesidades específicas de tu empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-20 lg:grid-cols-2">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`
                bg-white rounded-xl p-8 border-t-4 shadow-lg hover:shadow-xl 
                transition-all duration-300 transform hover:-translate-y-1
                ${service.color === 'primary' ? 'border-primary' :
                  service.color === 'secondary' ? 'border-secondary' :
                  service.color === 'emerald' ? 'border-emerald-600' :
                  service.color === 'indigo' ? 'border-indigo-600' : 'border-dark'}
              `}
            >
              <div className="flex items-start gap-6 mb-6">
                <div className={`
                  p-3 rounded-lg shadow-sm
                  ${service.color === 'primary' ? 'bg-primary/10 text-primary' :
                    service.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                    service.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                    service.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 'bg-dark/10 text-dark'}
                `}>
                  {service.icon}
                </div>
                <div>
                  <h3 className="mb-3 text-2xl font-bold text-dark font-heading">{service.title}</h3>
                  <p className="mb-6 text-gray-600 font-body">{service.description}</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <h4 className="flex items-center gap-2 mb-4 font-semibold text-dark font-body">
                  <CheckCircle className={`
                    w-5 h-5
                    ${service.color === 'primary' ? 'text-primary' :
                      service.color === 'secondary' ? 'text-secondary' :
                      service.color === 'emerald' ? 'text-emerald-600' :
                      service.color === 'indigo' ? 'text-indigo-600' : 'text-dark'}
                  `} />
                  Áreas de impacto:
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`
                        w-2 h-2 rounded-full
                        ${service.color === 'primary' ? 'bg-primary' :
                          service.color === 'secondary' ? 'bg-secondary' :
                          service.color === 'emerald' ? 'bg-emerald-600' :
                          service.color === 'indigo' ? 'bg-indigo-600' : 'bg-dark'}
                      `} />
                      <span className="text-gray-700 font-body">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <button className={`
                  font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition duration-300 font-body
                  ${service.color === 'primary' ? 
                    'bg-primary hover:bg-primary/90 text-white' :
                    service.color === 'secondary' ? 
                    'bg-secondary hover:bg-secondary/90 text-white' :
                    service.color === 'emerald' ? 
                    'bg-emerald-600 hover:bg-emerald-700 text-white' :
                    service.color === 'indigo' ? 
                    'bg-indigo-600 hover:bg-indigo-700 text-white' :
                    'bg-dark hover:bg-dark/90 text-white'}
                `} onClick={handleContactClick}>
                  Más información 
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section - CORREGIDO */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-dark font-heading">
              Nuestro <span className="text-primary">Proceso</span> de Trabajo
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 font-body">
              Un enfoque estructurado en 4 fases que garantiza resultados tangibles y crecimiento sostenible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="relative p-8 text-center transition duration-300 bg-white border border-gray-100 rounded-xl group hover:shadow-lg">
                  {/* Contenedor para número con fondo - CORREGIDO */}
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
                    {/* Cuadrado decorativo y bien posicionado */}
                    <div className={`
                      absolute inset-0 w-full h-full rounded-lg rotate-12 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity
                      ${index === 0 ? 'bg-primary' :
                        index === 1 ? 'bg-secondary' :
                        index === 2 ? 'bg-emerald-500' : 'bg-indigo-500'}
                    `}></div>
                    
                    {/* Número bien centrado */}
                    <div className={`
                      text-5xl font-bold relative z-10
                      ${index === 0 ? 'text-primary' :
                        index === 1 ? 'text-secondary' :
                        index === 2 ? 'text-emerald-600' : 'text-indigo-600'}
                    `}>{step.number}</div>
                  </div>
                  
                  {/* Título y Descripción */}
                  <div className="mt-2">
                    <h3 className="mb-3 text-xl font-bold transition-colors text-dark font-heading group-hover:text-primary">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 font-body">{step.description}</p>
                  </div>
                </div>
                
                {/* Flecha entre pasos */}
                {index < 3 && (
                  <div className="absolute right-0 hidden transform translate-x-1/2 -translate-y-1/2 lg:block top-1/2">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${index === 0 ? 'bg-primary/10' :
                        index === 1 ? 'bg-secondary/10' : 'bg-emerald-100'}
                    `}>
                      <ChevronRight className={`
                        w-5 h-5
                        ${index === 0 ? 'text-primary' :
                          index === 1 ? 'text-secondary' : 'text-emerald-600'}
                      `} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Methodology Section */}
        <div className="p-8 mb-20 text-white bg-gradient-to-r from-primary to-dark rounded-2xl md:p-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold font-heading">Por qué Elegirnos</h2>
            <p className="max-w-3xl mx-auto text-gray-300 font-body">
              Combinamos experiencia, metodología y compromiso para ofrecer resultados excepcionales.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {methodologies.map((method, index) => (
              <div key={index} className="text-center">
                <div className="inline-block p-4 mb-4 bg-white/10 rounded-2xl">
                  {React.cloneElement(method.icon, { className: "w-10 h-10 text-secondary" })}
                </div>
                <h3 className="mb-3 text-xl font-bold font-heading">{method.title}</h3>
                <p className="text-gray-300 font-body">{method.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="p-12 text-center border border-gray-200 bg-gradient-to-r from-gray-50 to-light rounded-2xl">
          <div className="max-w-2xl mx-auto">
            <h2 className="mb-6 text-3xl font-bold text-dark font-heading">
              ¿Listo para transformar tu empresa?
            </h2>
            <p className="mb-8 text-lg text-gray-600 font-body">
              Agenda una consultoría gratuita de 30 minutos y descubre cómo podemos ayudarte a alcanzar tus objetivos.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="px-8 py-3 transition duration-300 rounded-lg shadow-md btn-primary" onClick={handleContactClick}>
                Contactar Ahora
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-500 font-body">
              O llámanos directamente: <span className="font-semibold text-primary">+54 280 442-1137</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
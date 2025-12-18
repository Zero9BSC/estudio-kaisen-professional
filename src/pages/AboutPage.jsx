import { useEffect } from 'react';
import { companyInfo, values } from '../data/servicesData';
import { Target, Eye, Users, Award, CheckCircle, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  // ESTE EFECTO ES EL IMPORTANTE
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContactClick = () => {
  navigate('/contacto');
  };

  const handleServicesClick = () => {
  navigate('/servicios');
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative px-4 py-20 overflow-hidden text-white bg-gradient-to-r from-primary to-dark">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl font-heading">
              Más que un estudio, <span className="text-secondary">tu socio estratégico</span>
            </h1>
            <p className="mb-8 text-xl text-gray-200 font-body">
              Con más de 15 años de experiencia, transformamos desafíos empresariales en oportunidades de crecimiento sostenible.
            </p>
          </div>
        </div>
        <div className="absolute w-32 h-32 rounded-full top-10 right-10 bg-secondary/10 blur-3xl"></div>
        <div className="absolute w-40 h-40 rounded-full bottom-10 left-10 bg-accent/20 blur-3xl"></div>
      </div>

      <div className="max-w-6xl px-4 py-16 mx-auto">
        {/* Misión y Visión - Rediseñado */}
        <div className="grid gap-8 mb-20 md:grid-cols-2">
          <div className="p-8 border-t-4 bg-gradient-to-br from-secondary/5 to-transparent rounded-2xl border-secondary">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-secondary/10 rounded-xl">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-primary font-heading">Nuestra Misión</h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-700 font-body">
              {companyInfo.mission}
            </p>
          </div>

          <div className="p-8 border-t-4 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl border-primary">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-primary font-heading">Nuestra Visión</h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-700 font-body">
              {companyInfo.vision}
            </p>
          </div>
        </div>

        {/* Valores - Rediseñado */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <div className="inline-block px-4 py-2 mb-4 font-semibold rounded-full bg-secondary/10 text-secondary font-body">
              Nuestros Valores
            </div>
            <h2 className="mb-4 text-3xl font-bold text-primary font-heading">
              Principios que <span className="text-secondary">guían nuestro trabajo</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 font-body">
              Fundamentos que aplicamos en cada proyecto para garantizar resultados excepcionales.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="p-8 text-center transition-all duration-300 transform border-t-4 hover:shadow-xl hover:-translate-y-2 border-primary">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10">
                  <CheckCircle className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-primary font-heading">
                  {value.title}
                </h3>
                <p className="text-gray-600 font-body">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Objetivos - Rediseñado */}
        <div className="mb-20">
          <div className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl md:p-12">
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Award className="w-10 h-10 text-secondary" />
                <h2 className="text-3xl font-bold text-primary font-heading">
                  Nuestros Objetivos Estratégicos
                </h2>
              </div>
              <p className="max-w-3xl mx-auto mb-12 text-lg text-gray-600 font-body">
                Metas claras que nos impulsan a superar expectativas en cada proyecto.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {companyInfo.objectives.map((objective, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-white shadow-sm rounded-xl">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-bold text-white rounded-full bg-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="leading-relaxed text-gray-700 font-body">{objective}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Equipo - Rediseñado */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <div className="inline-block px-4 py-2 mb-4 font-semibold rounded-full bg-primary/10 text-primary font-body">
              Nuestro Equipo
            </div>
            <h2 className="mb-4 text-3xl font-bold text-primary font-heading">
              Expertos dedicados a <span className="text-secondary">tu éxito</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 font-body">
              Un equipo multidisciplinario de contadores, abogados y asesores especializados trabajando en sinergia.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Contador Senior",
                role: "Especialista en Finanzas Corporativas",
                description: "Más de 10 años de experiencia en optimización financiera y planificación fiscal."
              },
              {
                name: "Abogado Corporativo", 
                role: "Especialista en Derecho Empresarial",
                description: "Experto en normativa legal y protección de activos empresariales."
              },
              {
                name: "Consultor Estratégico",
                role: "Especialista en Desarrollo Organizacional",
                description: "Liderazgo en transformación empresarial y capacitación ejecutiva."
              }
            ].map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="flex items-center justify-center w-48 h-48 mx-auto transition-transform duration-300 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-105">
                    <Users className="w-20 h-20 text-primary/60" />
                  </div>
                  <div className="absolute flex items-center justify-center w-16 h-16 transform -translate-x-1/2 border-4 border-white rounded-full -bottom-2 left-1/2 bg-secondary">
                    <span className="text-xl font-bold text-white">{index + 1}</span>
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-primary font-heading">{member.name}</h3>
                <p className="mb-3 font-semibold text-secondary font-body">{member.role}</p>
                <p className="text-sm text-gray-600 font-body">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-12 text-center border border-gray-200 bg-gradient-to-r from-gray-50 to-light rounded-2xl">
          <div className="max-w-2xl mx-auto">
            <h2 className="mb-6 text-3xl font-bold text-dark font-heading">
              ¿Listo para trabajar juntos?
            </h2>
            <p className="mb-8 text-lg text-gray-600 font-body">
              Agenda una consultoría inicial con nuestro equipo y descubre cómo podemos impulsar la eficiencia y el crecimiento de tu empresa.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="px-8 py-3 transition duration-300 rounded-lg shadow-md btn-primary" onClick={handleContactClick}>
                Contactar Ahora
              </button>
              <button className="px-8 py-3 transition duration-300 rounded-lg btn-outline border-primary text-primary hover:bg-primary hover:text-white" onClick={handleServicesClick}>
                Ver Nuestros Servicios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
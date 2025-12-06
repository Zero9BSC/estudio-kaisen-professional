import { companyInfo, values } from '../data/servicesData';
import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';

const AboutPage = () => {
  return (
    <div className="section-padding">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Nuestra Historia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Más de 15 años brindando soluciones contables integrales en Trelew y la región.
          </p>
        </div>

        {/* Misión y Visión */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <Card className="p-8 bg-gradient-to-br from-secondary/5 to-transparent">
            <div className="text-3xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-primary mb-4">Misión</h2>
            <p className="text-gray-700 leading-relaxed">
              {companyInfo.mission}
            </p>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="text-3xl mb-4">👁️</div>
            <h2 className="text-2xl font-bold text-primary mb-4">Visión</h2>
            <p className="text-gray-700 leading-relaxed">
              {companyInfo.vision}
            </p>
          </Card>
        </div>

        {/* Valores */}
        <SectionTitle
          title="Nuestros Valores"
          subtitle="Principios que guían nuestro trabajo diario"
          center
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">
                {value.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Objetivos */}
        <Card className="p-8 mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Nuestros Objetivos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyInfo.objectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700">{objective}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Equipo (placeholder) */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Nuestro Equipo</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contadores, abogados y asesores especializados trabajando juntos para ofrecerte la mejor solución.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-primary mb-2">Miembro del Equipo {i}</h3>
                <p className="text-gray-500">Especialista en área</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
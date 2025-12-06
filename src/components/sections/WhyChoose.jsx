import { values } from '../../data/servicesData';
import SectionTitle from '../ui/SectionTitle';

const WhyChoose = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="¿Por qué elegirnos?"
          subtitle="Valores que nos diferencian y compromiso con cada cliente"
          center
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
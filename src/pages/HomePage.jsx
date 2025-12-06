import Hero from '../components/sections/Hero';
import ServicesGrid from '../components/sections/ServicesGrid';
import WhyChoose from '../components/sections/WhyChoose';

const HomePage = () => {
  return (
    <>
      <Hero />
      <ServicesGrid limit={4} />
      <WhyChoose />
      {/* Consultar si se agregan mas secciones */}
    </>
  );
};

export default HomePage;
import { useMetaTags } from '../hooks/useMetaTags';
import { EnhancedSchema } from '../components/EnhancedSchema';
import Hero from '../components/sections/Hero';
import ServicesGrid from '../components/sections/ServicesGrid';
import WhyChoose from '../components/sections/WhyChoose';

const HomePage = () => {
  useMetaTags();

  return (
    <>
      <EnhancedSchema />
      <Hero />
      <ServicesGrid limit={4} />
      <WhyChoose />
      {/* Consultar si se agregan mas secciones */}
    </>
  );
};

export default HomePage;
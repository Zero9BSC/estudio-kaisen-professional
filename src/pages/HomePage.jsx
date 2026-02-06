import { useMetaTags } from '../hooks/useMetaTags';
import { LocalBusinessSchema } from '../components/LocalBusinessSchema';
import Hero from '../components/sections/Hero';
import ServicesGrid from '../components/sections/ServicesGrid';
import WhyChoose from '../components/sections/WhyChoose';

const HomePage = () => {
  useMetaTags();

  return (
    <>
      <LocalBusinessSchema />
      <Hero />
      <ServicesGrid limit={4} />
      <WhyChoose />
      {/* Consultar si se agregan mas secciones */}
    </>
  );
};

export default HomePage;
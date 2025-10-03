import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { About, Footer, Header, Skills, Work } from '../container';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const section = document.getElementById(elementId);

      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <>
      <Header />
      <About />
      <Work />
      <Skills />
      <Footer />
    </>
  );
};

export default HomePage;

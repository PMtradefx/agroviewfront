import Header from '../Home/Header';
import AboutUs from '../Home/AboutUs';
import Team from '../Home/Team';
import Projects from '../Home/Projects';
import Features from '../Home/Features';
import Footer from '../Home/footer';

import '../Home/css/Principal.css';
import '../Home/css/footer.css';

function Index() {
  return (
    <>
      <Header />
      <main>
        <AboutUs />
        <Team />
        <Projects />
        <Features />
      </main>
      <Footer />
    </>
  );
}

export default Index;
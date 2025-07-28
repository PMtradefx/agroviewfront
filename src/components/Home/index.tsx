import Header from '../Home/Header';
import AboutUs from '../Home/AboutUs';
import Team from '../Home/Team';
import Projects from '../Home/Projects';
import Features from '../Home/Features';
import Footer from '../Home/footer';



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
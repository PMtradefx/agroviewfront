import { Link } from 'react-router-dom'; 
import '../Home/css/Principal.css';

function AboutUs() { 
  return (
    <section className="contenedor SobreNosostros">
      <h2 className="titulo">Nuestra Meta</h2>
      <div className="contenedor-sobre-nosotros">
        <img className="img-s-n" src="/test.png" alt="Illustration" />
        <div className="contenedor-textos">
          <h3><span>1</span>¿Qué es AgriView?</h3>
          <p>Un sistema inteligente de deteccion de plagas en tiempo real</p>
          <h3><span>2</span>¿Qué conseguiras?</h3>
          <p>Tener la tranquilidad de saber a tiempo real si tus cultivos tienen algun tipo de plaga</p>
          <h3><span>3</span>¿Cómo funciona?</h3>
          <p>Nuestras camaras se conectan directamente con nuestra Inteligencia Artificial la cual dectecta si el cultivo cuenta con algún tipo de plaga</p>
          <div className="Precrurso">
            <Link to="/login"> {/* Use Link here as well */}
              <button className="button custombutton" type="submit">Ingreso</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
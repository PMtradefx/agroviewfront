import '../Home/css/Principal.css'; // Asegúrate de que los estilos de esta sección estén aquí

// Definición de la interfaz para una característica
interface FeatureItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

// Datos de las características
const features: FeatureItem[] = [
  {
    id: 1,
    image: '/public/online.png',
    title: 'Conectividad',
    description: 'Puedes acceder a nuestros sistema desde cualquier lugar del mundo',
  },
  {
    id: 2,
    image: 'public/ecofriend.png',
    title: 'Amigable con el medio ambiente',
    description: 'Promevemos un mundo mas sustentable y amigable',
  },
  {
    id: 3,
    image: 'public/plant.png',
    title: 'Productividad',
    description: 'tener una mejor productividad dectantando de manera mas efectiva las plagas',
  },
];

function Features() {
  return (
    <section className="servicios">
      <div className="contenedor">
        <h2 className="titulo">Características de nuestros cursos</h2>
        <div className="servicio-cont">
          {features.map((feature: FeatureItem) => (
            <div className="servicio-ind" key={feature.id}>
              <img src={feature.image} alt={feature.title} />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
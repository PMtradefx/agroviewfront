import '../Home/css/Principal.css'; // Asegúrate de que los estilos de esta sección estén aquí

// Definición de la interfaz para un proyecto
interface ProjectItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

// Datos de los proyectos
const projects: ProjectItem[] = [
  {
    id: 1,
    image: 'img/html.png',
    title: 'plataforma Online',
    description: 'Imagine poder saber al instante si una amenaza emerge en sus cultivos, sin tener que recorrer cada surco. Nuestro sistema le ofrece la capacidad de monitoreo en tiempo real, permitiéndole vigilar continuamente sus plantas en busca de cualquier señal de infestación de plagas.',
  },
  {
    id: 2,
    image: 'img/css.png',
    title: 'Implementación de IA',
    description: 'Nuestra Inteligencia Artificial va un paso más allá en el monitoreo de sus cultivos. No solo observa, sino que procesa instantáneamente las imágenes capturadas, identificando y clasificando las plagas que detecta.',
  },
];

function Projects() {
  return (
    <section className="clientescontenedor">
      <h2 className="titulo">Nuestros principales avances</h2>
      <div className="cards">
        {projects.map((project: ProjectItem) => (
          <div className="card" key={project.id}>
            <img src={project.image} alt={project.title} />
            <div className="contenido-texto-card">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
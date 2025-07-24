import '../Home/css/Principal.css';

// Define the type for a single team member
interface TeamMember {
  id: number;
  name: string;
  image: string;
  icon: string;
}

const teamMembers: TeamMember[] = [ // Explicitly type the array
  { id: 1, name: 'Miembro 1', image: 'public/foto1.jpg', icon: 'img/programador.png' },
  { id: 2, name: 'Miembro 2', image: 'public/foto2.jpg', icon: 'img/programador.png' },
  { id: 3, name: 'Miembro 3', image: 'public/foto3.jpg', icon: 'img/programador.png' },
  { id: 4, name: 'Miembro 4', image: 'public/foto4.jpg', icon: 'img/programador.png' },
  { id: 5, name: 'Miembro 5', image: 'public/foto5.jpg', icon: 'img/programador.png' },
  { id: 6, name: 'Miembro 6', image: 'public/foto6.jpg', icon: 'img/programador.png' },
];

function Team() {
  return (
    <section className="Quienes-somos">
      <div className="contenedor">
        <h2 className="titulo">Nuestro equipo</h2>
        <div className="galeria-port">
          {teamMembers.map((member: TeamMember) => ( 
            <div className="imagen-port" key={member.id}>
              <img src={member.image} alt={member.name} />
              <div className="hover-galeria">
                <img src={member.icon} alt="team" />
                <p>{member.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
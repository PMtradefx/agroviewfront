import '../Home/css/Principal.css';

// Define the type for a single team member
interface TeamMember {
  id: number;
  name: string;
  image: string;
  icon: string;
}

const teamMembers: TeamMember[] = [ 
  { id: 1, name: 'Miembro 1', image: 'foto1.jpg', icon: 'miembro.png' },
  { id: 2, name: 'Miembro 2', image: 'foto2.jpg', icon: 'miembro.png' },
  { id: 3, name: 'Miembro 3', image: 'foto3.jpg', icon: 'miembro.png' },
  { id: 4, name: 'Miembro 4', image: 'foto4.jpg', icon: 'miembro.png' },
  { id: 5, name: 'Miembro 5', image: 'foto5.jpg', icon: 'miembro.png' },
  { id: 6, name: 'Miembro 6', image: 'foto6.jpg', icon: 'miembro.png' },
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
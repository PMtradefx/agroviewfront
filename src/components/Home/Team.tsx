import '../Home/css/Principal.css';

// Define the type for a single team member
interface TeamMember {
  id: number;
  name: string;
  image: string;
  icon: string;
}

const teamMembers: TeamMember[] = [ 
  { id: 1, name: 'Valeska Mantuano', image: 'VALESKA.jpg', icon: 'miembro.png' },
  { id: 2, name: 'Eduardo Alonzo', image: 'EDUARDO.jpg', icon: 'miembro.png' },
  { id: 3, name: 'Dereck Campuzano ', image: 'DEREK.jpg', icon: 'miembro.png' },
  { id: 4, name: 'Anthony Parrales', image: 'ANTHONY.jpg', icon: 'miembro.png' },
  { id: 5, name: 'Dilan Delgado', image: 'DYLAN.jpg', icon: 'miembro.png' },
  { id: 6, name: 'Michael Mendoza', image: 'MICHAEL.jpg', icon: 'programador.png' },
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
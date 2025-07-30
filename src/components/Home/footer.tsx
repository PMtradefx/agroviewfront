import './css/Footer.css'; 

function Footer() {
  return (
    <footer>
      <div className="contenedor-footer">
        <div className="content-foo">
          <img src="/DataFarmLogo.png" alt="DataFarm Logo" />
          <p>La peste ya no es un problema</p>
        </div>
        <div className="content-foo">
          <h2>Correo</h2>
          <p>company@datafarm.me</p>
        </div>
        <div className="content-foo">
          <h2>Oficinas</h2>
          <p>Facultad de ciencias de la vida y tecnologias -ULEAM</p>
        </div>
      </div>
      <h2 className="titulo-final">&copy;DataFarm | Todos los derechos no reservados</h2>
    </footer>
  );
}

export default Footer;

import  Api  from "../../api/ApiClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './admin.css';

const Indexadmin = () => {
  const [totalUser, setTotalUser] = useState<number>(0);
  const [totalCameras, setTotalCameras] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("sanctum_token");
    if (!token) {
      return;
    }
    

    Api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: any) => setTotalUser(response.data.length))
      .catch(() => {
      });

    Api.get("/cameras", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: any) => setTotalCameras(response.data.length))
      .catch(() => {
      });
  }, []);

  return (
    <div>
        <div className="row">
          <div className="col-lg-3 col-6">
            <div className="small-box bg-info">
              <div className="inner">
                <h3>{totalUser}</h3>
                <p>Usuarios</p>
              </div>
              <div className="icon">
                <i className="fas bi bi-file-person" />
              </div>
              <Link to="/dashboard/usuarios" className="small-box-footer">Más información <i className="fas bi bi-file-person" /></Link>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="small-box bg-primary">
              <div className="inner">
                <h3>{totalCameras}</h3>
                <p>Cámaras</p>
              </div>
              <div className="icon">
                <i className="fas bi bi-camera" />
              </div>
              <Link to="/dashboard/camaras" className="small-box-footer">Más información <i className="fas bi bi-camera" /></Link>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Indexadmin;

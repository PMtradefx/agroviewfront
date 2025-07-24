import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCamera, deleteCamera } from "../../../api/CameraApi";
import Swal from "sweetalert2";
import '../user/edit.css';

interface Camera {
  id: number;
  name: string;
  location: string;
  identifier: string;
}

const DeleteCamera: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [camera, setCamera] = useState<Camera | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/dashboard/camaras");
      return;
    }
    getCamera(Number(id))
      .then((data) => {
        setCamera(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate("/dashboard/camaras");
      });
  }, [id, navigate]);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await deleteCamera(Number(id));
      if (response.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Cámara eliminada",
          text: "La cámara fue eliminada correctamente.",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate("/dashboard/camaras");
        }, 2000);
      } else if (response.data && response.data.message) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al eliminar la cámara",
      });
    }
  };

  if (loading) {
    return (
      <div className="edit-user-container">
        <p>Cargando cámara...</p>
      </div>
    );
  }

  if (!camera) {
    return (
      <div className="edit-user-container">
        <p>No se encontró la cámara.</p>
        <button className="btn btn-back" onClick={() => navigate("/dashboard/camaras")}>
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <div className="edit-user-container">
      <h1>Cámara: {camera.name}</h1>
      <hr />
      <form onSubmit={handleDelete} className="edit-user-form">
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" value={camera.name} className="form-control" disabled />
        </div>
        <br />
        <div className="form-group">
          <label>Locación</label>
          <input type="text" value={camera.location} className="form-control" disabled />
        </div>
        <br />
        <div className="form-group">
          <label>Identificador</label>
          <input type="text" value={camera.identifier} className="form-control" disabled />
        </div>
        <hr />
        <div className="form-buttons">
          <button
            type="button"
            className="btn btn-back"
            onClick={() => navigate("/dashboard/camaras")}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-submit" style={{ marginLeft: 10 }}>
            Eliminar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteCamera;

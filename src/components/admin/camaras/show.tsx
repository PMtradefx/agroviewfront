import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCamera } from "../../../api/CameraApi";
import '../user/edit.css';

import type { Camera } from '../../../lib/types';

const ShowCamera: React.FC = () => {
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

  if (loading) {
    return null;
  }

  if (!camera) {
    return (
      <div className="edit-user-container">
        <p>No se encontró la cámara.</p>
        <button className="btn btn-back" onClick={() => navigate("/dashboard/camaras")}>
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="edit-user-container">
      <h1>Cámara: {camera.name}</h1>
      <hr />
      <div className="form-group">
        <label>Nombre:</label>
        <p>{camera.name}</p>
      </div>
      <div className="form-group">
        <label>Locación:</label>
        <p>{camera.location}</p>
      </div>
      <div className="form-group">
        <label>Identificador:</label>
        <p>{camera.identifier}</p>
      </div>
      <div className="form-group">
        <label>Cliente:</label>
        <p>{camera.cliente?.name || "N/A"}</p>
      </div>
      <hr />
      <button className="btn btn-back" onClick={() => navigate("/dashboard/camaras")}>
        Volver
      </button>
    </div>
  );
};

export default ShowCamera;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/ApiClient";
import "../admin/user/edit.css";

interface User {
  id: number;
  name: string;
  email: string;
}

const UsuarioCliente: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("sanctum_token");
    if (!token) {
      navigate("/login");
      return;
    }
    Api.get(`/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate("/dashboard");
      });
  }, [navigate]);

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <div className="edit-user-container">
        <p>No se encontró el usuario.</p>
        <button className="btn btn-back" onClick={() => navigate("/dashboard")}>
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="edit-user-container">
      <h1>Cliente: {user.name}</h1>
      <hr />
      <div className="form-group">
        <label>Nombre:</label>
        <p>{user.name}</p>
      </div>
      <div className="form-group">
        <label>Email:</label>
        <p>{user.email}</p>
      </div>
      <hr />
      <div className="form-buttons">
        <button className="btn btn-back" onClick={() => navigate("/dashboard/")}>
          Volver
        </button>
        <button className="btn btn-submit" onClick={() => navigate("/dashboard/cuenta/editar")}>
          Editar
        </button>
      </div>
    </div>
  );
};

export default UsuarioCliente;

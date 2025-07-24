import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import  Api  from "../../../api/ApiClient";
import "./edit.css";

interface User {
  id: number;
  name: string;
  email: string;
}

const ShowUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("sanctum_token");
    if (!token) {
      navigate("/login");
      return;
    }
    Api.get(`/users/${id}`, {
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
        navigate("/dashboard/usuarios");
      });
  }, [id, navigate]);

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <div className="edit-user-container">
        <p>No se encontró el usuario.</p>
        <button className="btn btn-back" onClick={() => navigate("/dashboard/usuarios")}>
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
      <button className="btn btn-back" onClick={() => navigate("/dashboard/usuarios")}>
        Volver
      </button>
    </div>
  );
};

export default ShowUser;

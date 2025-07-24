import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import  Api  from "../../../api/ApiClient";
import Swal from "sweetalert2";
import "./edit.css";

interface User {
  id: number;
  name: string;
  email: string;
}

const DeleteUser: React.FC = () => {
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

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("sanctum_token");
    try {
      const response = await Api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Usuario eliminado",
          text: "El usuario fue eliminado correctamente.",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate("/dashboard/usuarios");
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
        text: "Error al eliminar usuario",
      });
    }
  };

  if (loading) {
    return (
      <div className="edit-user-container">
        <p>Cargando usuario...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="edit-user-container">
        <p>No se encontró el usuario.</p>
        <button className="btn btn-back" onClick={() => navigate("/dashboard/usuarios")}>
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <div className="edit-user-container">
      <h1>Usuario: {user.name}</h1>
      <hr />
      <form onSubmit={handleDelete} className="edit-user-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={user.name} className="form-control" disabled />
        </div>
        <br />
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={user.email} className="form-control" disabled />
        </div>
        <hr />
        <div className="form-buttons">
          <button
            type="button"
            className="btn btn-back"
            onClick={() => navigate("/dashboard/usuarios")}
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

export default DeleteUser;

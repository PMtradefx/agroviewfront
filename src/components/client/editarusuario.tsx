import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/ApiClient";
import "../admin/user/edit.css";
import Swal from "sweetalert2";


const EditarUsuario: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "user",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

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
        const user = response.data;
        setUserId(user.id);
        setForm({
          name: user.name || "",
          email: user.email || "",
          password: "",
          password_confirmation: "",
          role: user.role || "user",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
        navigate("/dashboard");
      });
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const token = localStorage.getItem("sanctum_token");
    try {
      const response = await Api.put(`/users/${userId}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Usuario actualizado",
          text: "El usuario fue actualizado correctamente.",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else if (response.data && response.data.errors) {
        setErrors(response.data.errors);
        Swal.fire({
          icon: "error",
          title: "Error en los datos",
          text: "Revisa los campos marcados en rojo.",
        });
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
        text: "Error al actualizar usuario",
      });
    }
  };

  if (loading) {
    return (
      <div>
        <p>Cargando usuario...</p>
      </div>
    );
  }

  return (
    <div className="edit-user-container">
      <h1>Actualizar Usuario: {form.name}</h1>
      <hr />
      <form onSubmit={handleSubmit} className="edit-user-form">
        <div className="form-group">
          <label>Nombre <b>*</b></label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-control"
          />
          {errors.name && <small className="error-text">{errors.name}</small>}
        </div>
        <br />
        <div className="form-group">
          <label>Email <b>*</b></label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="form-control"
          />
          {errors.email && <small className="error-text">{errors.email}</small>}
        </div>
        <br />
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
          />
          {errors.password && <small className="error-text">{errors.password}</small>}
        </div>
        <br />
        <div className="form-group">
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            className="form-control"
          />
          {errors.password_confirmation && (
            <small className="error-text">{errors.password_confirmation}</small>
          )}
        </div>
        <hr />
        <div className="form-buttons">
          <button
            type="button"
            onClick={() => navigate("/dashboard/cuenta")}
            className="btn btn-back"
          >
            Volver
          </button>
          <button type="submit" className="btn btn-submit" style={{ marginLeft: 10 }}>
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarUsuario;

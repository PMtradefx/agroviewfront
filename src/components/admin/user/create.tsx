import React, { useState } from "react";
import  Api  from "../../../api/ApiClient";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./edit.css";

const CreateUser = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    rol: "proveedor",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState("");

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  setForm({ ...form, [e.target.name]: e.target.value });
  setErrors({ ...errors, [e.target.name]: "" });
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setErrors({});

    // Validación simple en frontend
    let newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "El nombre es requerido";
    if (!form.email) newErrors.email = "El correo es requerido";
    if (!form.password) newErrors.password = "La contraseña es requerida";
    if (form.password !== form.password_confirmation)
      newErrors.password_confirmation = "Las contraseñas no coinciden";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Enviar al backend
    try {
    // const token = localStorage.getItem("sanctum_token");
      const response = await Api.post("/users", form);
      if (response.status === 201) {
        Swal.fire({
        icon: "success",
        title: "Proovedor registrado",
        text: "Prooverdor registrado exitosamente",
      });
        setTimeout(() => {
          navigate("/dashboard/usuarios");
        }, 2000);
      } else if (response.data && response.data.errors) {
      setErrors(response.data.errors);
      Swal.fire({
        icon: "error",
        title: "Ya existe un prooverdor con ese correo",
        text: "Revisa los campos marcados en rojo.",
      });
    } else if (response.data && response.data.message) {
      setServerError(response.data.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.data.message,
      });
    }
    } catch (err) {
      setServerError("Error al registrar usuario");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar usuario",
      });
    }
  };

  return (
    <div className="edit-user-container">
      <h1>Registrar un nuevo Usuario</h1>
      <hr />
      <form onSubmit={handleSubmit} className="edit-user-form">
        {serverError && (
          <div className="error-text" style={{ marginBottom: 10 }}>{serverError}</div>
        )}
        <div className="form-group">
          <label>Rol <b>*</b></label>
          <select
          name="rol"
          className="form-control"
          value={form.rol}
          onChange={handleChange}
          required
        >
          <option value="admin">Administrador</option>
          <option value="user">Usuario</option>
        </select>
        {errors.rol && <small className="error-text">{errors.rol}</small>}
        </div>
        <br />
        <div className="form-group">
          <label>Nombre <b>*</b></label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
          {errors.name && <small className="error-text">{errors.name}</small>}
        </div>
        <br />
        <div className="form-group">
          <label>Email <b>*</b></label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <small className="error-text">{errors.email}</small>}
        </div>
        <br />
        <div className="form-group">
          <label>contraseña <b>*</b></label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
          {errors.password && <small className="error-text">{errors.password}</small>}
        </div>
        <br />
        <div className="form-group">
          <label>Verificar contraseña <b>*</b></label>
          <input
            type="password"
            name="password_confirmation"
            className="form-control"
            value={form.password_confirmation}
            onChange={handleChange}
            required
          />
          {errors.password_confirmation && (
            <small className="error-text">{errors.password_confirmation}</small>
          )}
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
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;

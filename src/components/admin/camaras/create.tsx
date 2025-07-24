import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createCamera } from "../../../api/CameraApi";
import { ApiCamara } from "../../../api/apicamara";
import '../user/edit.css';

interface Client {
  id: number;
  name: string;
}

const CreateCamera: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    location: "",
    identifier: "",
    cliente_id: 0,
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("sanctum_token");
    if (!token) {
      navigate("/login");
      return;
    }
    ApiCamara.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: any) => setClients(response.data || []))
      .catch(() => {
      });
  }, []);

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

    let newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "El nombre es requerido";
    if (!form.location) newErrors.location = "La locación es requerida";
    if (!form.identifier) newErrors.identifier = "El identificador es requerido";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formData = {
        ...form,
        cliente_id: form.cliente_id ? Number(form.cliente_id) : null,
      };
      const response = await createCamera(formData);
      if (response.statusCode >= 200 && response.statusCode < 300) {
        Swal.fire({
          icon: "success",
          title: "Cámara registrada",
          text: "Cámara registrada exitosamente",
        });
        setTimeout(() => {
          navigate("/dashboard/camaras");
        }, 2000);
      } else if (response.errors) {
        setErrors(response.errors);
        Swal.fire({
          icon: "error",
          title: "Error en el formulario",
          text: "Revisa los campos marcados en rojo.",
        });
      } else if (response.message) {
        setServerError(response.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message,
        });
      }
    } catch {
      setServerError("Error al registrar cámara");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar cámara",
      });
    }
  };

  return (
    <div className="edit-user-container">
      <h1>Registrar una nueva Cámara</h1>
      <hr />
      <form onSubmit={handleSubmit} className="edit-user-form">
        {serverError && (
          <div className="error-text" style={{ marginBottom: 10 }}>{serverError}</div>
        )}
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
          <label>Locación <b>*</b></label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={form.location}
            onChange={handleChange}
            required
          />
          {errors.location && <small className="error-text">{errors.location}</small>}
        </div>
        <br />
        <div className="form-group">
          <label>Identificador <b>*</b></label>
          <input
            type="text"
            name="identifier"
            className="form-control"
            value={form.identifier}
            onChange={handleChange}
            required
          />
          {errors.identifier && <small className="error-text">{errors.identifier}</small>}
        </div>
        <br />
        <div className="form-group">
          <label>Cliente</label>
          <select
            name="cliente_id"
            className="form-control"
            value={form.cliente_id}
            onChange={handleChange}
          >
            <option value="">Seleccione un cliente</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
          {errors.cliente_id && <small className="error-text">{errors.cliente_id}</small>}
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
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCamera;

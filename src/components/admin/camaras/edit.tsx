import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCamera, updateCamera } from "../../../api/CameraApi";
import { ApiCamara } from "../../../api/apicamara";
import Swal from "sweetalert2";
import '../user/edit.css';

interface Client {
  id: number;
  name: string;
}


interface CameraForm {
  name: string;
  location: string;
  identifier: string;
  cliente_id?: number | string;
}

const EditCamera: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<CameraForm>({
    name: "",
    location: "",
    identifier: "",
    cliente_id: "",
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (!id) return;
    getCamera(Number(id))
      .then((data) => {
        setForm({
          name: data.name || "",
          location: data.location || "",
          identifier: data.identifier || "",
          cliente_id: data.cliente_id || "",
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate("/dashboard/camaras");
      });
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Simple frontend validation
    let newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "El nombre es requerido";
    if (!form.location) newErrors.location = "La locación es requerida";
    if (!form.identifier) newErrors.identifier = "El identificador es requerido";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Convert cliente_id to number or null before sending
      const payload = {
        ...form,
        cliente_id: form.cliente_id ? Number(form.cliente_id) : null,
      };
      const response: import("../../../api/CameraApi").UpdateCameraResponse = await updateCamera(Number(id), payload);
      if (response && response.statusCode >= 200 && response.statusCode < 300) {
        Swal.fire({
          icon: "success",
          title: "Cámara actualizada",
          text: "La cámara fue actualizada correctamente.",
        });
        setTimeout(() => {
          navigate("/dashboard/camaras");
        }, 2000);
      } else if (response && 'errors' in response && response.errors) {
        setErrors(response.errors);
        Swal.fire({
          icon: "error",
          title: "Error en el formulario",
          text: "Revisa los campos marcados en rojo.",
        });
      } else if (response && 'message' in response && response.message) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message,
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al actualizar la cámara",
      });
    }
  };

  if (loading) {
    return <div><p>Cargando cámara...</p></div>;
  }

  return (
    <div className="edit-user-container">
      <h1>Actualizar Cámara: {form.name}</h1>
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
          <label>Locación <b>*</b></label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="form-control"
          />
          {errors.location && <small className="error-text">{errors.location}</small>}
        </div>
        <br />
        <div className="form-group">
          <label>Identificador <b>*</b></label>
          <input
            type="text"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            required
            className="form-control"
          />
          {errors.identifier && <small className="error-text">{errors.identifier}</small>}
        </div>
        <br />
        <div className="form-group">
          <label>Cliente</label>
          <select
            name="cliente_id"
            value={form.cliente_id}
            onChange={handleChange}
            className="form-control"
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
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCamera;

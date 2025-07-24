import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { getCameras } from "../../../api/CameraApi";

import '../user/user.css';

import type { Camera } from '../../../lib/types';

const CamerasList = () => {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    getCameras()
      .then((data) => {
        setCameras(data || []);
      })
      .catch(() => {
      });
  }, []);

  useEffect(() => {
    // Initialize DataTable when data is ready
    // @ts-ignore
    const $ = window.$ || window.jQuery;
    if (tableRef.current && $ && cameras.length > 0) {
      // @ts-ignore
      $(tableRef.current).DataTable({
        destroy: true,
        pageLength: 10,
        language: {
          emptyTable: "No hay información",
          info: "Mostrando _START_ a _END_ de _TOTAL_ Cámaras",
          infoEmpty: "Mostrando 0 a 0 de 0 Cámaras",
          infoFiltered: "(filtrado de _MAX_ registros totales)",
          thousands: ",",
          lengthMenu: "Mostrar _MENU_ Cámaras",
          loadingRecords: "Cargando...",
          processing: "Procesando...",
          search: "Buscar:",
          zeroRecords: "Sin resultados encontrados",
          paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior",
          },
        },
        responsive: true,
        lengthChange: true,
        autoWidth: false,
        buttons: [
          {
            extend: "collection",
            text: "Reportes",
            orientation: "landscape",
            buttons: [
              { extend: "copy" },
              { extend: "pdf" },
              { extend: "csv" },
              { extend: "excel" },
              { extend: "print" },
            ],
          },
          {
            extend: "colvis",
            collectionLayout: "fixed three-column",
          },
        ],
        dom: "Bfrtip",
      });
    }
    // Cleanup on unmount
    return () => {
      if (tableRef.current && $ && $.fn.dataTable.isDataTable(tableRef.current)) {
        // @ts-ignore
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, [cameras]);

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1 className="user-list-title">Lista de Cámaras</h1>
        <Link to="/Dashboard/camaras/create" className="user-list-add-button">
          Añadir
        </Link>
      </div>
      <table
        id="example1"
        className="user-list-table"
        ref={tableRef}
      >
        <thead>
          <tr>
            <th>Nro</th>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Identificador</th>
            <th>Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cameras.map((camera, idx) => (
            <tr key={camera.id}>
              <td>{idx + 1}</td>
              <td>{camera.name}</td>
              <td>{camera.location}</td>
              <td>{camera.identifier}</td>
              <td>{camera.cliente ? camera.cliente.name : "-"}</td>
              <td>
                <div className="user-list-actions">
                  <Link
                    to={`/Dashboard/camaras/${camera.id}`}
                    className="user-list-action-button info"
                  >
                    <i className="bi bi-eye-fill"></i>
                  </Link>
                  <Link
                    to={`/Dashboard/camaras/${camera.id}/edit`}
                    className="user-list-action-button edit"
                  >
                    <i className="bi bi-pencil"></i>
                  </Link>
                  <Link
                    to={`/Dashboard/camaras/${camera.id}/confirm-delete`}
                    className="user-list-action-button delete"
                  >
                    <i className="bi bi-trash"></i>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CamerasList;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import ApiClient from "../../../api/ApiClient";

import './user.css';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    ApiClient.get("/users")
      .then((response: any) => setUsers(response.data.users || response.data || []))
      .catch((err: any) => {
        console.error("Error al obtener usuarios:", err);
      });
  }, []);

  useEffect(() => {
    // Inicializa DataTable cuando los datos estén listos
    // @ts-ignore
    const $ = window.$ || window.jQuery;
    if (tableRef.current && $ && users.length > 0) {
      // @ts-ignore
      $(tableRef.current).DataTable({
        destroy: true, // Permite reinicializar
        pageLength: 10,
        language: {
          emptyTable: "No hay información",
          info: "Showing _START_ to _END_ of _TOTAL_ Users",
          infoEmpty: "Showing 0 a 0 of 0 Users",
          infoFiltered: "(filtered from _MAX_ total entries)",
          thousands: ",",
          lengthMenu: "Show _MENU_ Users",
          loadingRecords: "loading...",
          processing: "Processing...",
          search: "Search:",
          zeroRecords: "Sin resultados encontrados",
          paginate: {
            first: "First",
            last: "Last",
            next: "Next",
            previous: "Previous",
          },
        },
        responsive: true,
        lengthChange: true,
        autoWidth: false,
        buttons: [
          {
            extend: "collection",
            text: "Reports",
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
    return () => {
      if (tableRef.current && $ && $.fn.dataTable.isDataTable(tableRef.current)) {
        // @ts-ignore
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, [users]);

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1 className="user-list-title">Lista de clientes</h1>
        <Link to="/dashboard/usuarios/create" className="user-list-add-button">
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
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((usuario, idx) => (
            <tr key={usuario.id}>
              <td>{idx + 1}</td>
              <td>{usuario.name}</td>
              <td>{usuario.email}</td>
              <td>
                <div className="user-list-actions">
                  <Link
                    to={`/dashboard/usuarios/${usuario.id}`}
                    className="user-list-action-button info"
                  >
                    <i className="bi bi-eye-fill"></i>
                  </Link>
                  <Link
                    to={`/dashboard/usuarios/${usuario.id}/edit`}
                    className="user-list-action-button edit"
                  >
                    <i className="bi bi-pencil"></i>
                  </Link>
                  <Link
                    to={`/dashboard/usuarios/${usuario.id}/confirm-delete`}
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

export default UserList;

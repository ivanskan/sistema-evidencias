import Navbar from "../components/Navbar";

import AdminEvidencias
  from "../components/AdminEvidencias";

export default function Admin() {

  const nombre =
    localStorage.getItem(
      "nombre"
    );

  function cerrarSesion() {

    localStorage.removeItem(
      "usuario"
    );

    localStorage.removeItem(
      "nombre"
    );

    window.location.href = "/";
  }

  return (

    <div>

      <Navbar
        admin={true}
        cerrarSesion={
          cerrarSesion
        }
      />

      <div className="
        container
        py-4
      ">

        <div className="
          mb-4
        ">

          <h3 className="
            fw-bold
          ">
            Panel Administrador
          </h3>

          <div className="
            text-muted
          ">

            <strong className="
              ms-2
            ">
              {nombre}
            </strong>

          </div>

        </div>

        <AdminEvidencias />

      </div>

    </div>
  );
}
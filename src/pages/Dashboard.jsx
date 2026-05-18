import UploadForm
  from "../components/UploadForm";

import Navbar
  from "../components/Navbar";

import {
  useState
} from "react";

import MisEvidencias
  from "../components/MisEvidencias";

export default function Dashboard() {

  const [vista, setVista] =
    useState("subir");

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

  window.location.replace(
    "/"
  );
}

  return (

    <div>

      <Navbar

        vista={vista}

        setVista={setVista}

        // usuario={usuario}

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

          <h2 className="
            fw-bold
          ">
            Sistema Evidencias
          </h2>

<div className="
  mt-2
  text-secondary
">

  Usuario:
  <strong className="ms-2">
    {nombre}
  </strong>

</div>

        </div>

        {
          vista === "subir"
            ? <UploadForm />
            : <MisEvidencias />
        }

      </div>

    </div>
  );
}
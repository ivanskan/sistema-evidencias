import {
  useEffect,
  useState
} from "react";

import Swal from "sweetalert2";

import {
  listar,
  eliminar
} from "../services/api";

export default function MisEvidencias() {

  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const usuario =
    localStorage.getItem(
      "usuario"
    );

  async function cargar() {

    try {

      setLoading(true);

      const resp =
        await listar(usuario);

      setData(resp);

    } catch (error) {

      console.error(error);

      Swal.fire(
        "Error",
        "No se pudieron cargar las evidencias",
        "error"
      );

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  async function handleEliminar(id) {

    const result =
      await Swal.fire({

        title:
          "¿Eliminar evidencia?",

        text:
          "Esta acción no se puede deshacer",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText:
          "Sí, eliminar",

        cancelButtonText:
          "Cancelar",
      });

    if (!result.isConfirmed)
      return;

    try {

      const resp =
        await eliminar(id);

      if (resp.success) {

        Swal.fire(
          "Correcto",
          "Evidencia eliminada",
          "success"
        );

        cargar();
      }

    } catch (error) {

      console.error(error);

      Swal.fire(
        "Error",
        "No se pudo eliminar",
        "error"
      );
    }
  }

  if (loading) {

    return (

      <div className="text-center py-5">

        <div className="spinner-border" />

        <div className="mt-3">
          Cargando evidencias...
        </div>

      </div>
    );
  }

  return (

    <div className="card shadow-sm">

      <div className="card-body">

        <div className="
          d-flex
          justify-content-between
          align-items-center
          mb-4
        ">

          <h4 className="mb-0">
            Mis Evidencias
          </h4>

          <span className="
            badge
            bg-primary
          ">
            {data.length}
          </span>
        </div>

        {
          data.length === 0 && (

            <div className="
              alert
              alert-secondary
            ">
              No tienes evidencias registradas
            </div>
          )
        }

        {
          data.length > 0 && (

            <div className="
              table-responsive
            ">

              <table className="
                table
                table-bordered
                table-hover
                align-middle
              ">

                <thead className="
                  table-secondary
                ">

                  <tr>

                    <th>
                      Fecha
                    </th>

                    <th>
                      Curso
                    </th>

                    <th>
                      Lista
                    </th>

                    <th>
                      img 1
                    </th>

                    <th>
                      img 2
                    </th>

                    <th>
                      Acciones
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    data.map(item => (

                      <tr key={item.id}>

                        <td>
                        {
  new Date(item.fecha)
    .toLocaleDateString(
      "es-PE",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    )
}
                        </td>

                        <td>
                          {item.curso}
                        </td>

                        <td>

                          <a
                            href={item.pdf}
                            target="_blank"
                            rel="noreferrer"
                            className="
                              text-primary
                            "
                          >
                            Ver
                          </a>

                        </td>

                        <td>

                          <a
                            href={item.foto1}
                            target="_blank"
                            rel="noreferrer"
                            className="
                             text-primary
                            "
                          >
                            Ver
                          </a>

                        </td>

                        <td>

                          <a
                            href={item.foto2}
                            target="_blank"
                            rel="noreferrer"
                            className="
                             text-primary
                            "
                          >
                            Ver
                          </a>

                        </td>

                        <td>

                          <button
                            className="
                              btn
                              btn-sm
                              btn-danger
                            "
                            onClick={() =>
                              handleEliminar(
                                item.id
                              )
                            }
                          >
                            Eliminar
                          </button>

                        </td>

                      </tr>
                    ))
                  }

                </tbody>

              </table>

            </div>
          )
        }

      </div>
    </div>
  );
}
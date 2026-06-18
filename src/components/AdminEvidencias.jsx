import {
  useEffect,
  useState
} from "react";

import Swal from "sweetalert2";

import {
  listarTodas
} from "../services/api";

import {
  generarPdfEvidencia
} from "../services/pdfGenerator";

export default function AdminEvidencias() {

  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [generando,
    setGenerando] =
      useState(false);

  const [mensaje,
    setMensaje] =
      useState("");

  const [cooldown,
    setCooldown] =
      useState(false);

    const [pagina, setPagina] =
  useState(1);

const POR_PAGINA = 50;

  async function cargar() {

    try {

      setLoading(true);

      const resp =
  await listarTodas();

const ordenado =
  [...resp].sort(
    (a, b) =>
      new Date(b.fecha) -
      new Date(a.fecha)
  );

setData(ordenado);

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

  const renderUsuario = (usuario) => {
  switch (usuario) {
    case 'lnl':
      return 'Luisa Narro';
    case 'hec':
      return 'Hernan Espinoza';
    case 'oqc':
      return 'Oswaldo Quiroga';
    case 'edm':
      return 'Edwin Díaz';
    case 'joo':
      return 'Jorge Ortiz';
    case 'jpc':
      return 'Jorge Panta';
    case 'adr':
      return 'Antonio Saldaña';
    case 'mct':
      return 'Manuel Correa';
    case 'dda':
      return 'David Díaz';
    case 'wap':
      return 'Walter Alvarez';
    case 'lmf':
      return 'Leonardo Moreno';
    default:
      return 'undefined';
  }
};

const inicio =
  (pagina - 1) *
  POR_PAGINA;

const fin =
  inicio +
  POR_PAGINA;

const dataPaginada =
  data.slice(
    inicio,
    fin
  );

const totalPaginas =
  Math.ceil(
    data.length /
    POR_PAGINA
  );

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

    <>

      {
        generando && (

          <div
            className="
              position-fixed
              top-0
              start-0
              w-100
              h-100
              d-flex
              justify-content-center
              align-items-center
            "
            style={{
              background:
                "rgba(0,0,0,0.35)",

              zIndex: 2000,

              backdropFilter:
                "blur(2px)",
            }}
          >

            <div className="
              bg-white
              rounded
              shadow
              p-4
              text-center
            ">

              <div className="
                spinner-border
                text-danger
                mb-3
              " />

              <div className="
                fw-semibold
              ">
                {mensaje}
              </div>

            </div>

          </div>
        )
      }

      <div className="card shadow-sm">

        <div className="card-body">

          <div className="
            d-flex
            justify-content-between
            align-items-center
            mb-3
          ">

            <h4 className="mb-0">
              Todas las Evidencias
            </h4>

            <span className="
              badge
              bg-dark
            ">
              {data.length}
            </span>

          </div>

          <div className="
            table-responsive
          ">

            <table className="
              table
              table-bordered
              table-hover
              align-middle
            ">

              <thead className="table-dark">
                <tr>
                  <th>Fecha</th>
                  <th>Instructor</th>
                  <th>Curso</th>
                  <th>Lista</th>
                  <th>Img&nbsp;1</th>
                  <th>Img&nbsp;2</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>

                {
                  dataPaginada.map(item => (
                    <tr key={item.id}>
                      <td>
                        {
                          new Date(item.fecha)
                            .toLocaleDateString(
                              "es-PE"
                            )
                        }
                      </td>

                      {/* <td>{item.usuario}</td> */}
                      <td>{renderUsuario(item.usuario)}</td>
                      <td>{item.curso}</td>
                      <td>
                        {
                          item.pdf ? (
                            <a
                              href={item.pdf}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Ver
                            </a>
                          ) : (
                            <span className="
                              text-muted
                            ">
                            
                            </span>
                          )
                        }

                      </td>

                      <td>

                        <a
                          href={item.foto1}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Ver
                        </a>

                      </td>

                      <td>

                        <a
                          href={item.foto2}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Ver
                        </a>

                      </td>

                      <td>

                        <button

                          disabled={
                            generando
                            || cooldown
                          }

                          className="
                            btn
                            btn-danger
                            btn-sm
                          "

                          onClick={async () => {

                            if (cooldown) {

                              Swal.fire(
                                "Espere",
                                "Debe esperar unos segundos antes de generar otro PDF",
                                "warning"
                              );

                              return;
                            }

                            try {

                              setGenerando(true);

                              setMensaje(
                                "Generando PDF..."
                              );

                              setCooldown(true);

                              await generarPdfEvidencia(
                                item
                              );

                              Swal.fire(
                                "Correcto",
                                "PDF generado",
                                "success"
                              );

                              setTimeout(() => {

                                setCooldown(false);

                              }, 10000);

                            } catch (error) {

                              console.error(error);

                              Swal.fire(
                                "Error",
                                "No se pudo generar el PDF",
                                "error"
                              );

                              setCooldown(false);

                            } finally {

                              setGenerando(false);

                              setMensaje("");
                            }
                          }}
                        >

                          {
                            cooldown
                              ? "Espere..."
                              : "Generar"
                          }

                        </button>

                      </td>

                    </tr>
                  ))
                }

              </tbody>

            </table>

            <div
  className="
    d-flex
    justify-content-center
    align-items-center
    gap-2
    mt-3
  "
>

  <button
    className="
      btn
      btn-sm
      btn-outline-secondary
    "
    disabled={pagina === 1}
    onClick={() =>
      setPagina(
        pagina - 1
      )
    }
  >
    ←
  </button>

  <span
    className="
      small
      text-muted
    "
  >
    Página {pagina} de {totalPaginas}
  </span>

  <button
    className="
      btn
      btn-sm
      btn-outline-secondary
    "
    disabled={
      pagina === totalPaginas
    }
    onClick={() =>
      setPagina(
        pagina + 1
      )
    }
  >
    →
  </button>

</div>

          </div>

        </div>

      </div>

    </>
  );
}
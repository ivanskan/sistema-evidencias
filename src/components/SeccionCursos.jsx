import BookIcon from "./icons/BookIcon";
import QrIcon from "./icons/QrIcon";
import LinkIcon from "./icons/LinkIcon";

function SeccionCursos({
  titulo,
  data,
  qr,
  darkMode,
  abierto,
  setAbierto,
  copiado,
  copiar,
  sectionKey,
}) {
  return (
    <div>
      <h4 className="my-4 fw-bold text-primary">
        {titulo}
      </h4>

      <div className="card my-2 shadow-sm">
        <div
          className="card-header d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
          onClick={() =>
            setAbierto(
              abierto === `encuesta-${sectionKey}`
                ? null
                : `encuesta-${sectionKey}`
            )
          }
        >
          <span className="fw-semibold">
            📊 Encuesta
          </span>

          <span>
            {abierto === `encuesta-${sectionKey}`
              ? "▲"
              : "▼"}
          </span>
        </div>

        {abierto === `encuesta-${sectionKey}` && (
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="d-flex align items center">
                <LinkIcon darkMode={darkMode} /> 
                <span className="ms-1">Enlace</span>
              </span>

              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() =>
                  copiar(
                    data.encuesta,
                    `encuesta-${sectionKey}`
                  )
                }
              >
                {copiado === `encuesta-${sectionKey}`
                  ? "✔ Copiado"
                  : "Copiar enlace"}
              </button>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <span className="d-flex align items center">
                <QrIcon darkMode={darkMode} /> 
                <span className="ms-1">QR</span>
              </span>

              <a
                href={qr}
                download
                className="btn btn-success btn-sm"
              >
                Descargar QR
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="accordion">
        {data.cursos.map((curso, i) => {
          const itemId = `${sectionKey}-${i}`;

          return (
            <div
              className="card mb-2 shadow-sm"
              key={itemId}
            >
              <div
                className="card-header d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setAbierto(
                    abierto === itemId
                      ? null
                      : itemId
                  )
                }
              >
                <span className="fw-semibold d-flex align-items-center">
                  <BookIcon darkMode={darkMode} />

                  <small className="ms-1">
                    {curso.nombre}
                  </small>
                </span>

                <span>
                  {abierto === itemId ? "▲" : "▼"}
                </span>
              </div>

              {abierto === itemId && (
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>
                      🟢 Examen de Entrada
                    </span>

                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() =>
                        copiar(
                          curso.entrada,
                          `entrada-${itemId}`
                        )
                      }
                    >
                      {copiado ===
                      `entrada-${itemId}`
                        ? "✔ Copiado"
                        : "Copiar enlace"}
                    </button>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span>
                      🔴 Examen de Salida
                    </span>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        copiar(
                          curso.salida,
                          `salida-${itemId}`
                        )
                      }
                    >
                      {copiado ===
                      `salida-${itemId}`
                        ? "✔ Copiado"
                        : "Copiar enlace"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SeccionCursos;
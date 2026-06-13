export default function PageHeader({

  titulo = "Sistema Evidencias",

  subtitulo

}) {

  const nombre =
    localStorage.getItem(
      "nombre"
    );

  return (

    <div className="mb-4">

      <h2 className="fw-bold">
        {titulo}
      </h2>

      {
        subtitulo ? (

          <div className="mt-2 text-secondary">

            <span className="fw-semibold">
              {subtitulo}
            </span>

          </div>

        ) : (

          nombre && (

            <div className="mt-2 text-secondary">

              <span className="fw-semibold ms-1">
                {nombre}
              </span>

            </div>

          )

        )
      }

    </div>
  );
}
import { useState } from "react";
import Swal from "sweetalert2";
import { subirEvidencia } from "../services/api";
import imageCompression from "browser-image-compression";
import cursos from "../data/cursos";

export default function UploadForm() {

  const [fecha, setFecha] =
    useState("");

  const [curso, setCurso] =
    useState("");

  const [pdf, setPdf] =
    useState(null);

    const [previewPdf,
  setPreviewPdf] =
    useState(null);

    const [omitirLista,
  setOmitirLista] =
    useState(false);

  const [foto1, setFoto1] =
    useState(null);

  const [foto2, setFoto2] =
    useState(null);

    const [preview1,
  setPreview1] =
    useState(null);

const [preview2,
  setPreview2] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [mensaje, setMensaje] =
    useState("");
    

  const usuario =
    localStorage.getItem(
      "usuario"
    );


  async function compressImage(file) {

    const options = {

      maxSizeMB: 0.15,

      maxWidthOrHeight: 960,

      useWebWorker: true,

      fileType: "image/jpeg",

      initialQuality: 0.6,
    };

    return await imageCompression(
      file,
      options
    );
  }

  function toBase64(file) {

    return new Promise(
      (resolve, reject) => {

        const reader =
          new FileReader();

        reader.readAsDataURL(
          file
        );

        reader.onload = () =>
          resolve(
            reader.result
          );

        reader.onerror =
          reject;
      }
    );
  }

  async function handleSubmit(e) {

    e.preventDefault();

      if (
      !fecha ||
      !curso ||
      (
        !omitirLista &&
        !pdf
      ) ||
      !foto1 ||
      !foto2
    )
    {

      Swal.fire(
        "Error",
        "Todos los campos son obligatorios",
        "error"
      );

      return;
    }

    try {

      setLoading(true);

      setMensaje(
        "Comprimiendo imágenes..."
      );

      const [
        compressed1,
        compressed2
      ] = await Promise.all([

        compressImage(foto1),

        compressImage(foto2),
      ]);

      setMensaje(
        "Procesando archivos..."
      );

     const [
        foto164,
        foto264
      ] = await Promise.all([

        toBase64(compressed1),

        toBase64(compressed2),
      ]);

      let pdf64 = null;

      if (pdf) {

        pdf64 =
          await toBase64(pdf);
      }

      setMensaje(
        "Subiendo evidencias..."
      );

      const resp =
        await subirEvidencia({

          fecha,

          curso,

          usuario,

          pdf: pdf64,

          foto1: foto164,

          foto2: foto264,

          pdfName: pdf  ? pdf.name : "",

          foto1Name: foto1.name,

          foto2Name: foto2.name,
        });

      if (resp.success) {

        Swal.fire(
          "Correcto",
          "Archivos subidos",
          "success"
        );

        setFecha("");
        setCurso("");
        setPdf(null);
        setFoto1(null);
        setFoto2(null);
        setPreviewPdf(null);
        setPreview1(null);
        setPreview2(null);

        document.getElementById(
          "pdf"
        ).value = "";

        document.getElementById(
          "foto1"
        ).value = "";

        document.getElementById(
          "foto2"
        ).value = "";
      }

      else {

        Swal.fire(
          "Error",
          resp.error ||
            "Error al subir",
          "error"
        );
      }

    } catch (error) {

      console.error(error);

      Swal.fire(
        "Error",
        "Ocurrió un error",
        "error"
      );

    } finally {

      setLoading(false);

      setMensaje("");
    }
  }

  return (

    <div className="card shadow p-4">

      <h4 className="mb-4">
        Nueva Evidencia
      </h4>

      <form onSubmit={handleSubmit}>

        <label className="fw-semibold mb-2">Fecha</label>

        <input id="fecha" type="date" className="form-control mb-3" value={fecha}
          onChange={(e) => setFecha( e.target.value)} />

        <label className="fw-semibold mb-2">Curso</label>

          <input
          id="curso"
  list="lista-cursos"
  className="
    form-control
    mb-3
  "
  placeholder="Curso"
  value={curso}
  onChange={(e) =>
    setCurso(
      e.target.value.toUpperCase()
    )
  }
/>

<datalist id="lista-cursos">

  {
    cursos.map(
      (item) => (

        <option
          key={item}
          value={item}
        />
      )
    )
  }

</datalist>

        
        <label className="fw-semibold mb-2" id="lista">Lista</label>
        <input 
          id="pdf" 
          type="file" accept=".pdf" 
          className="form-control mb-3" 
          disabled={omitirLista}
          // onChange={(e) => setPdf(e.target.files[0])}
          onChange={(e) => {

  const file =
    e.target.files[0];

  if (!file) {

    setPdf(null);

    setPreviewPdf(null);

    return;
  }

  setPdf(file);

  setPreviewPdf(
    URL.createObjectURL(file)
  );
}}
          />

        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="form-check">
            <input
              id="omitirLista"
              className="form-check-input" 
              type="checkbox" 
              checked={omitirLista} 
              onChange={(e) => {setOmitirLista(e.target.checked);
                  if ( e.target.checked ) {
                    setPdf(null);
                    setPreviewPdf(null);
                    document.getElementById("pdf").value = "";
                  }
                }} 
            />
            <label
              className="form-check-label text-danger fw-semibold">
                Omitir lista ☠
            </label>
          </div>
          {
            previewPdf && (

              <button
                type="button"
                className="
                  ms-3
                  btn
                  btn-sm
                  text-primary
                  fw-semibold
                "
                onClick={() =>
                  window.open(
                    previewPdf,
                    "_blank"
                  )
                }
              >
                Ver pdf 👁
              </button>
            )
          }
        </div>

        <label className="fw-semibold mb-2">Evidencia 1</label>

        <input id="foto1" type="file" accept="image/*" className="form-control mb-3"
          onChange={(e) => { const file = e.target.files[0];
          if (!file) {
            setFoto1(null);
            setPreview1(null);
            return;
          }
          setFoto1(file);
          setPreview1(URL.createObjectURL(file));}}
        />
    <div
  className="
    border
    border-2
    rounded
    p-3
    mb-3
    text-center
  "
  style={{
    borderStyle: "dashed",
    minHeight: "220px",
  }}
>

  {
    preview1 ? (

      <img
        src={preview1}
        alt="preview1"
        className="
          img-fluid
          rounded
          d-block
          mx-auto
        "
        style={{
          maxHeight: "180px",
          objectFit: "cover",
        }}
      />

    ) : (

      <div className="
        text-muted
        mt-5
      ">

        <div
          style={{
            fontSize: "3rem",
          }}
        >
          🖼️
        </div>

        <div>
          Vista previa
        </div>

      </div>
    )
  }

</div>

        <label className="fw-semibold mb-2"> Evidencia 2 </label>

        <input id="foto2" type="file" accept="image/*" className="form-control mb-3"
          onChange={(e) => {const file = e.target.files[0];
          if (!file) {
            setFoto2(null);
            setPreview2(null);
            return;
          }
          setFoto2(file);
          setPreview2(URL.createObjectURL( file) );
          }}
        />

      <div
  className="
    border
    border-2
    rounded
    p-3
    mb-3
    text-center
  "
  style={{
    borderStyle: "dashed",
    minHeight: "220px",
  }}
>

  {
    preview2 ? (

      <img
        src={preview2}
        alt="preview2"
        className="
          img-fluid
          rounded
          d-block
          mx-auto
        "
        style={{
          maxHeight: "180px",
          objectFit: "cover",
        }}
      />

    ) : (

      <div className="
        text-muted
        mt-5
      ">

        <div
          style={{
            fontSize: "3rem",
          }}
        >
          🖼️
        </div>

        <div>
          Vista previa
        </div>

      </div>
    )
  }

</div>

        <button
          disabled={loading}
          className="
            btn
            btn-primary
            w-100
          "
        >

          {
            loading
              ? (
                <>
                  <span
                    className="
                      spinner-border
                      spinner-border-sm
                      me-2
                    "
                  />

                  {mensaje}
                </>
              )
              : "Enviar evidencia"
          }

        </button>

      </form>

    </div>
  );
}
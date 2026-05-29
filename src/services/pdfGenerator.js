import { jsPDF }
  from "jspdf";

import logoERS
  from "../assets/ERS-logo.png";


function cargarImagen(url) {

  return new Promise(
    (resolve, reject) => {

      const img =
        new Image();

      img.crossOrigin =
        "Anonymous";

        img.referrerPolicy =
  "no-referrer";

      img.src = url;

      img.onload = () =>
        resolve(img);

      img.onerror =
        reject;
    }
  );
}


function calcularDimensiones(
  img,
  maxWidth,
  maxHeight
) {

  let width =
    img.width;

  let height =
    img.height;

  const ratio =
    Math.min(
      maxWidth / width,
      maxHeight / height
    );

  return {

    width:
      width * ratio,

    height:
      height * ratio,
  };
}


export async function
generarPdfEvidencia(item) {

  const doc =
    new jsPDF({

      orientation: "portrait",

      unit: "mm",

      format: "a4",
    });

  const pageWidth =
    210;

  const pageHeight =
    297;

  // =====================
  // HEADER
  // =====================

  // LOGO

  doc.addImage(
    logoERS,
    "PNG",
    15,
    10,
    38,
    18
  );

  // TEXTO DERECHA

  doc.setFontSize(9);

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    "Jr. Santa Teresa de Journet No. 415",
    195,
    14,
    {
      align: "right",
    }
  );

  doc.text(
    "Teléfono: 076 614374",
    195,
    19,
    {
      align: "right",
    }
  );

  doc.text(
    "Celular: 976 202771",
    195,
    24,
    {
      align: "right",
    }
  );

  doc.text(
    "administracion@ersperu.pe",
    195,
    29,
    {
      align: "right",
    }
  );

  // LINEA HEADER

  doc.setLineWidth(0.5);

  doc.line(
    15,
    35,
    195,
    35
  );

  // =====================
  // TITULO
  // =====================

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(16);

  doc.text(

    `EVIDENCIAS DE ${item.curso}`,

    pageWidth / 2,

    48,

    {
      align: "center",
    }
  );

  // =====================
  // CARGAR IMAGENES
  // =====================

  const img1 =
    await cargarImagen(
      item.foto1
    );

  const img2 =
    await cargarImagen(
      item.foto2
    );

  // =====================
  // MEDIDAS
  // =====================

  const maxWidth =
    160;

  const maxHeight =
    85;

  const foto1Size =
    calcularDimensiones(
      img1,
      maxWidth,
      maxHeight
    );

  const foto2Size =
    calcularDimensiones(
      img2,
      maxWidth,
      maxHeight
    );

  // =====================
  // POSICIONES
  // =====================

  const x1 =
    (
      pageWidth
      - foto1Size.width
    ) / 2;

  const x2 =
    (
      pageWidth
      - foto2Size.width
    ) / 2;

  // =====================
  // FOTO 1
  // =====================

  doc.addImage(

    img1,

    "JPEG",

    x1,

    65,

    foto1Size.width,

    foto1Size.height
  );

  // =====================
  // FOTO 2
  // =====================

  doc.addImage(

    img2,

    "JPEG",

    x2,

    165,

    foto2Size.width,

    foto2Size.height
  );

  // =====================
  // FOOTER
  // =====================

  doc.line(
    15,
    282,
    195,
    282
  );

  doc.setFontSize(10);

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    "www.ersperu.pe",
    pageWidth / 2,
    289,
    {
      align: "center",
    }
  );

  // =====================
  // DESCARGAR
  // =====================

  doc.save(
    `EVIDENCIA_${item.curso}.pdf`
  );
}
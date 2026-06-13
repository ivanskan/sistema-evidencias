import { useState } from "react";

import qrEncuesta from "../assets/qr-encuesta.png";
import qrEncuestaIngles from "../assets/qr-encuesta-ingles.png";

import Layout from "../components/Layout";
import SeccionCursos from "../components/SeccionCursos";

import {
  enlacesData,
  enlacesDataExploraciones,
  enlacesDataIngles,
} from "../data/enlacesData";

export default function Enlaces() {

  const [abierto, setAbierto] =
    useState(null);

  const [copiado, setCopiado] =
    useState("");

  async function copiar(
    texto,
    key
  ) {

    try {

      await navigator.clipboard
        .writeText(texto);

      setCopiado(key);

      setTimeout(() => {

        setCopiado("");

      }, 1500);

    } catch (error) {

      console.error(error);
    }
  }

 return (

  <Layout
    title="Enlaces de Formularios"
  >

    <div >

      <SeccionCursos
        titulo="CURSOS"
        data={enlacesData}
        qr={qrEncuesta}
        abierto={abierto}
        setAbierto={setAbierto}
        copiado={copiado}
        copiar={copiar}
        sectionKey="cursos"
      />

      <SeccionCursos
        titulo="EXPLORACIONES"
        data={enlacesDataExploraciones}
        qr={qrEncuesta}
        abierto={abierto}
        setAbierto={setAbierto}
        copiado={copiado}
        copiar={copiar}
        sectionKey="exploraciones"
      />

      <SeccionCursos
        titulo="INGLES"
        data={enlacesDataIngles}
        qr={qrEncuestaIngles}
        abierto={abierto}
        setAbierto={setAbierto}
        copiado={copiado}
        copiar={copiar}
        sectionKey="ingles"
      />

    </div>

  </Layout>
);
}
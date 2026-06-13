import Navbar from "../components/Navbar";

import AdminEvidencias
  from "../components/AdminEvidencias";

  import Layout from "../components/Layout";

export default function Admin() {

  const nombre =
    localStorage.getItem(
      "nombre"
    );

  return (
    <Layout>

      <div>

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

    </Layout>
  );
}
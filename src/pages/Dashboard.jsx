import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {

  return (

    <Layout>

      <PageHeader />

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h4 className="mb-2">
            Bienvenido al Sistema
          </h4>

          <p className="text-secondary mb-0">
            Seleccione una opción para continuar.
          </p>

        </div>

      </div>

      {/* NUEVO MÓDULO */}

      <div className="alert alert-info shadow-sm">

        <div className="fw-bold">
          🚀 Nuevo módulo disponible
        </div>

        <div>
          El módulo <strong>Enlaces </strong>
          se encuentra en fase beta.
          Ahora puede acceder rápidamente
          a formularios, encuestas y recursos
          de capacitación desde el menú principal.
        </div>

      </div>

      {/* ACCESOS RÁPIDOS */}

      <div className="row g-3">

        <div className="col-md-4">

          <Link
            to="/subir"
            className="
              text-decoration-none
            "
          >

            <div className="
              card
              shadow-sm
              h-100
            ">

              <div className="
                card-body
                text-center
              ">

                <div
                  style={{
                    fontSize: "2rem"
                  }}
                >
                  📤
                </div>

                <h5 className="mt-2">
                  Subir Evidencias
                </h5>

              </div>

            </div>

          </Link>

        </div>

        <div className="col-md-4">

          <Link
            to="/mis-evidencias"
            className="
              text-decoration-none
            "
          >

            <div className="
              card
              shadow-sm
              h-100
            ">

              <div className="
                card-body
                text-center
              ">

                <div
                  style={{
                    fontSize: "2rem"
                  }}
                >
                  📁
                </div>

                <h5 className="mt-2">
                  Mis Evidencias
                </h5>

              </div>

            </div>

          </Link>

        </div>

        <div className="col-md-4">

          <Link
            to="/enlaces"
            className="
              text-decoration-none
            "
          >

            <div className="
              card
              shadow-sm
              h-100
            ">

              <div className="
                card-body
                text-center
              ">

                <div
                  style={{
                    fontSize: "2rem"
                  }}
                >
                  🔗
                </div>

                <h5 className="mt-2">
                  Enlaces
                </h5>

              </div>

            </div>

          </Link>

        </div>

      </div>

    </Layout>
  );
}
import {
  useState
} from "react";

import logoDesktop
  from "../assets/ERS-logo.png";

export default function Navbar({

  vista,

  setVista,

  cerrarSesion
}) {

  const [menuOpen,
    setMenuOpen] =
      useState(false);

  function cambiarVista(
    nuevaVista
  ) {

    setVista(
      nuevaVista
    );

    setMenuOpen(false);
  }

  function salir() {

    setMenuOpen(false);

    cerrarSesion();
  }

  return (

    <nav className="
      navbar
      navbar-expand-lg
      shadow-sm
    "
    // style={{backgroundColor:"#e3f2fd"}}
    >

      <div className="
        container
      ">

        {/* LOGO */}

        <a
          className="
            navbar-brand btn px-0
          "
          href="#"
        >

          <img
            src={logoDesktop}
            alt="ERS"
            style={{
              height: "42px",
            }}
            onClick={() =>
                  cambiarVista(
                    "subir"
                  )
                }
          />

        </a>

        {/* BTN MOBILE */}

        <button
          className="
            navbar-toggler
            border-0
          "
          type="button"
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
        >

          <span
            style={{
              fontSize: "1.5rem",
              color: "black",
            }}
          >

            {
              menuOpen
                ? "✕"
                : "☰"
            }

          </span>

        </button>

        {/* MENU */}

        <div
          className={`
            navbar-collapse
            ${
              menuOpen
                ? "d-block"
                : "d-none"
            }
            d-lg-flex
          `}
        >

          <ul className="
            navbar-nav
            ms-auto
            text-end
            gap-lg-1
            pt-1
            pt-lg-0
          ">

            {/* SUBIR */}

            <li className="
              nav-item
              py-1
              btn
            ">

              <a
                className={`
                  nav-link
                  border-0
                  bg-transparent
                  w-100
                  text-end
                 fw-bold
                 hover-primary
                `}
                onClick={() =>
                  cambiarVista(
                    "subir"
                  )
                }
              >
                Subir Evidencias
              </a>

            </li>

            {/* MIS */}

            <li className="
              nav-item
              btn
            ">

              <a
                className={`
                  nav-link
                  border-0
                  bg-transparent
                  w-100
                  text-end
                  fw-bold    
                `}
                onClick={() =>
                  cambiarVista(
                    "mis-evidencias"
                  )
                }
              >
                Mis Evidencias
              </a>

            </li>

            {/* LOGOUT */}

            <li className="
              nav-item
              btn
            ">

              <a
                className="
                  nav-link
                  border-0
                  bg-transparent
                  text-danger
                  w-100
                  text-end
                  fw-bold
                "
                onClick={salir}
              >
                Cerrar sesión
              </a>

            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}
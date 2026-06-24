import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import logoDesktop  from "../assets/ERS-logo.png";
import logoDesktopDark  from "../assets/ERS-logo-dark.png";

export default function Navbar({  cerrarSesion}) {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem( "theme") === "dark");

  const usuario = localStorage.getItem("usuario");
  const isAdmin = usuario === "admin";

  function salir() {

    setMenuOpen(false);
    cerrarSesion();
  }

  function toggleDarkMode() {

    const nuevoModo = darkMode ? "light" : "dark";

    document.documentElement.setAttribute("data-bs-theme", nuevoModo);

    localStorage.setItem("theme", nuevoModo);

    setDarkMode(!darkMode);
    setMenuOpen(false);
  }

  const navClass = ({ isActive}) =>
    `
      nav-link
      border-0
      bg-transparent
      w-100
      text-end
      fw-bold
      ${
        isActive
          ? "text-primary"
          : ""
      }
    `;

  return (

    <nav className="navbar navbar-expand-lg shadow-sm">

      <div className="container">

        {/* LOGO */}

        <Link
          to={ isAdmin ? "/admin" : "/dashboard" }
          className="navbar-brand px-0"
          onClick={() => setMenuOpen(false)}>

          <img src={darkMode? logoDesktopDark : logoDesktop} alt="ERS" style={{height: "42px" }}/>

        </Link>

        {/* BTN MOBILE */}

        <button className="navbar-toggler border-0" type="button"
          onClick={() => setMenuOpen(!menuOpen)}>

          <span style={{fontSize: "1.5rem", color: darkMode ? "white" : "black",}}>
            { menuOpen ? "✕" : "☰" }
          </span>

        </button>

        {/* MENU */}

        <div className={`navbar-collapse ${menuOpen ? "d-block" : "d-none" } d-lg-flex`}>

          <ul className="navbar-nav ms-auto text-end gap-lg-1 pt-1 pt-lg-0">

            {
              !isAdmin && (

                <>

                <li className="nav-item btn">

                  <NavLink
                    to="/dashboard"
                    className={navClass}
                    onClick={() => setMenuOpen(false)}>
                    Inicio
                  </NavLink>

                </li>

                <li className="nav-item py-1 btn">

                  <NavLink
                    to="/subir"
                    className={navClass}
                    onClick={() => setMenuOpen(false)}>
                    Subir Evidencias
                  </NavLink>

                </li>

                <li className="nav-item btn">

                  <NavLink
                    to="/mis-evidencias"
                    className={navClass}
                    onClick={() => setMenuOpen(false)}>
                    Mis Evidencias
                  </NavLink>

                  </li>

                </>

              )
            }

            <li className="nav-item btn">

              <NavLink
                to="/enlaces"
                className={navClass}
                onClick={() => setMenuOpen(false)}>
                Enlaces
              </NavLink>

            </li>

            <li className="nav-item btn">

              <button className="nav-link border-0 bg-transparent w-100 text-end fw-bold" onClick={toggleDarkMode}>

                { darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro" }

              </button>

            </li>

            <li className="nav-item btn">

              <button className="nav-link border-0 bg-transparent text-danger w-100 text-end fw-bold" onClick={salir}>
                Cerrar sesión
              </button>

            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}
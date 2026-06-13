import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { useEffect } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Enlaces from "./pages/Enlaces";

import Subir from "./pages/Subir";
import MisEvidenciasPage from "./pages/MisEvidenciasPage";

export default function App() {

  const usuario =
    localStorage.getItem(
      "usuario"
    );

  useEffect(() => {

    const theme =
      localStorage.getItem(
        "theme"
      ) || "light";

    document.documentElement
      .setAttribute(
        "data-bs-theme",
        theme
      );

  }, []);

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            usuario
              ? (
                <Navigate
                  to={
                    usuario === "admin"
                      ? "/admin"
                      : "/dashboard"
                  }
                />
              )
              : (
                <Login />
              )
          }
        />

        <Route
          path="/dashboard"
          element={
            usuario
              ? <Dashboard />
              : <Navigate to="/" />
          }
        />

      <Route
        path="/subir"
        element={
          usuario
            ? <Subir />
            : <Navigate to="/" />
        }
      />

      <Route
        path="/mis-evidencias"
        element={
          usuario
            ? <MisEvidenciasPage />
            : <Navigate to="/" />
        }
      />

        <Route
          path="/enlaces"
          element={
            usuario
              ? <Enlaces />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/admin"
          element={
            usuario === "admin"
              ? <Admin />
              : <Navigate to="/" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}
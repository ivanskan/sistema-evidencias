import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

/* NUEVO */
import Admin from "./pages/Admin";

export default function App() {

  const usuario =
    localStorage.getItem(
      "usuario"
    );

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
              : <Login />
          }
        />

        <Route
          path="/dashboard"
          element={

            usuario
              ? (
                <Dashboard />
              )
              : (
                <Navigate to="/" />
              )
          }
        />

        {/* NUEVA RUTA ADMIN */}

        <Route
          path="/admin"
          element={

            usuario === "admin"
              ? (
                <Admin />
              )
              : (
                <Navigate to="/" />
              )
          }
        />

      </Routes>

    </BrowserRouter>
  );
}
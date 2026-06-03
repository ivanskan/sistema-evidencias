import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Enlaces from "./pages/Enlaces";

export default function App() {

  const usuario = localStorage.getItem("usuario");

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

  <Route
          path="/enlaces"
          element={

            usuario
              ? (
                <Enlaces />
              )
              : (
                <Navigate to="/" />
              )
          }
        />

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
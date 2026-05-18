import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

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
                  to="/dashboard"
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

      </Routes>

    </BrowserRouter>
  );
}
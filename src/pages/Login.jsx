import { useState } from "react";
import Swal from "sweetalert2";
import { login } from "../services/api";
import logoDesktop from "../assets/ERS-logo.png";
import logoMobile from "../assets/ERS-logo-min.png";


export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
const [showPassword,
  setShowPassword] =
    useState(false);

    const [loading,
  setLoading] =
    useState(false);

    

  async function handleLogin(e) {

  e.preventDefault();

  if (
    !usuario ||
    !password
  ) {

    Swal.fire(
      "Error",
      "Complete los campos",
      "error"
    );

    return;
  }

  setLoading(true);

  try {

  setLoading(true);

  const resp = await login({

    usuario,

    password,
  });

  if (resp.success) {

    localStorage.setItem(
      "usuario",
      resp.usuario
    );

    localStorage.setItem(
      "nombre",
      resp.nombre
    );

    const Toast =
      Swal.mixin({

        toast: true,

        position: "top-end",

        showConfirmButton: false,

        timer: 1200,

        timerProgressBar: true,
      });

    await Toast.fire({

      icon: "success",

      title: "Bienvenido",
    });

    window.location.href =
  resp.usuario === "admin"
    ? "/admin"
    : "/dashboard";

  } else {

    Swal.fire(
      "Error",
      "Credenciales inválidas",
      "error"
    );
  }

} catch (error) {

  Swal.fire(
    "Error",
    "Ocurrió un error",
    "error"
  );

} finally {

  setLoading(false);
}

}

  return (
    <div className="container d-flex align-items-center vh-100">
      <div className="card p-4 shadow mx-auto" style={{ width: 350}}>
        <div className="text-center mb-4">

  {/* MOBILE */}

  <img
    src={logoMobile}
    alt="ERS"
    className="
      d-block
      d-md-none
      mx-auto
      mb-2
    "
    style={{
      width: "90px",
    }}
  />

  {/* DESKTOP */}

  <img
    src={logoDesktop}
    alt="ERS"
    className="
      d-none
      d-md-block
      mx-auto
      mb-2
    "
    style={{
      maxWidth: "200px",
    }}
  />

  <h3 className="fw-bold">
    Login Evidencias
  </h3>

</div>

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-3"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) =>
              setUsuario(e.target.value)
            }
          />

          <div className="input-group mb-3">

  <input
    type={
      showPassword
        ? "text"
        : "password"
    }
    className="form-control"
    placeholder="Password"
    value={password}
    onChange={(e) =>
      setPassword(
        e.target.value
      )
    }
  />

  <button
    type="button"
    className="
      btn
      btn-outline-secondary
    "
    onClick={() =>
      setShowPassword(
        !showPassword
      )
    }
  >

    {
      showPassword
        ? "🙈"
        : "👁️"
    }

  </button>

</div>

          <button
  disabled={loading}
  className="
    btn
    btn-primary
    w-100
  "
>

  {
    loading
      ? (
        <>
          <span
            className="
              spinner-border
              spinner-border-sm
              me-2
            "
          />

          Validando...
        </>
      )
      : "Ingresar"
  }

</button>
        </form>
      </div>
    </div>
  );
}
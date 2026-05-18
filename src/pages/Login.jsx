import { useState } from "react";
import Swal from "sweetalert2";
import { login } from "../services/api";
import logoDesktop from "../assets/ERS-logo.png";
import logoMobile from "../assets/ERS-logo-min.png";


export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

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

  window.location.href = "/dashboard";

  } else {

    Swal.fire(
      "Error",
      "Credenciales inválidas",
      "error"
    );
  }
}

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: 350}}>
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

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button className="btn btn-primary w-100">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
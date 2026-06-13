import Navbar from "./Navbar";
import PageHeader from "./PageHeader";

export default function Layout({

  title,

  children
}) {

  function cerrarSesion() {

    localStorage.removeItem(
      "usuario"
    );

    localStorage.removeItem(
      "nombre"
    );

    window.location.replace("/");
  }

  return (

    <>

      <Navbar
        cerrarSesion={
          cerrarSesion
        }
      />
          <div className="col-sm-12 col-md-8 mx-auto">

      <div className="container py-4">

        {
          title && (
            <PageHeader
              title={title}
            />
          )
        }
     

          {children}
        </div>

      </div>

    </>

  );
}
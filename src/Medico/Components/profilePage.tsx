import React, { useEffect, useState } from "react";
import "../../assets/css/profile.css";
import userProfileLayout from "../../HOC/profileLayout";

const ProfilePage = () => {
  const [user, setUser] = useState("");
  const [rol, setRol] = useState("");
  const [rut, setRut] = useState("");
  const [correo, setCorreo] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("usuario") || "");
    setRol(localStorage.getItem("cargo") || "");
    setRut(localStorage.getItem("rut") || "");
    setCorreo(localStorage.getItem("correo") || "");
  }, []);

  return (
    <>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0 mb-3">Información Personal</h6>
        <form>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={correo}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  @
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Nombre
              </label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={user}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-user"></i>
                </span>
              </div>
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Rut
              </label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={rut}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-user"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Cargo
              </label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={rol}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-user"></i>
                </span>
              </div>
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Realizar cambios
              </label>
              <div className="input-group mb-3">
                <button type="submit" className="btn btn-default col-md-6">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default userProfileLayout(ProfilePage);
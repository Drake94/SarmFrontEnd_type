/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import adminLayout from './adminLayout';
import '../assets/css/profile.css';
import { NavLink, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const userProfileLayout = (ChildComponent: React.ComponentType<any>) => {
  const UserProfilePageHoc: React.FC<any> = (props) => {
    const auser = localStorage.getItem('usuario');
    const rol = localStorage.getItem('cargo');
    const rut = localStorage.getItem('rut');
    const correo = localStorage.getItem('correo');
    const imgUrl = localStorage.getItem('imgUrl');

    
    return (
      <>
        <div className="container">
          <div className="row profile">
            <div className="col-md-3">
              <div className="profile-sidebar">
                <div className="my-3 p-3 bg-body rounded shadow-sm">
                  {/* <!-- SIDEBAR USERPIC --> */}
                  <div className="profile-userpic">
                    <img alt="hey" src={`${imgUrl}`} className="img-responsive profile-img-center" />
                  </div>
                  {/* <!-- END SIDEBAR USERPIC -->
                  <!-- SIDEBAR USER TITLE --> */}
                  <div className="profile-usertitle">
                    <div className="profile-usertitle-name">Hola {auser}</div>
                    <div className="profile-usertitle-job">{rol}</div>
                  </div>
                  {/* <!-- END SIDEBAR USER TITLE -->
                  <!-- SIDEBAR BUTTONS --> */}
                  <hr />
                  <div>
                    <div className="bd-example">
                      <div className="list-group">
                        <label className="form-label">Nombre: {auser}</label>
                        <label className="form-label">Rut: {rut}</label>
                        <NavLink
                          to="/change-password"
                          className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'active' : ''}`}
                        >
                          Cambiar Clave
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="profile-content">
                <ChildComponent {...props} />
              </div>
            </div>
            {rol === 'Administrador' ? (
              <div className="col-md-5">
                <br />
                <label className="form-label layouttext">Medicos registrados</label>
                <Link to="/medicos" type="submit" className="btn btn-primary btn-lg btn-default2">
                  Ver
                </Link>
              </div>
            ) : (<label className="form-label layouttext"></label>)}
          </div>
        </div>

      </>
    );
  };

  return adminLayout(UserProfilePageHoc);
};

export default userProfileLayout;
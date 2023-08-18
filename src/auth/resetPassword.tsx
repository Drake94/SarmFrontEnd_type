import React from 'react';
import '../assets/css/login.css';
import { Link } from 'react-router-dom';
import authLayout from '../HOC/authLayout';
import 'bootstrap/dist/css/bootstrap.css';

const ResetPassword = () => {
  return (
    <>
      <div className="reset-password-section text-center">
        <h2 className="text-center">¿Olvidaste tu contraseña?</h2>
        <br />
        <p> </p>
        <br />
        <h3>
          <i className="fa fa-lock fa-4x"></i>
        </h3>
        <p>Puedes recuperarla aqui.</p>
        <div className="panel-body">
          <form id="register-form" autoComplete="off" className="form" method="post">
            <div className="form-group">
              <span className="input-group-addon">
                <i className="glyphicon glyphicon-envelope color-blue"></i>
              </span>
              <input type="email" id="email" name="email" placeholder="Email" className="form-control form-control-lg" />
            </div>
            <div className="form-group mt-2">
              <button type="submit" className="btn btn-primary btn-lg">
                Reiniciar contraseña
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-0">
                ¿Recuerdas tu contraseña? <Link to="/login" className="link-danger">Ingresa </Link>
              </p>
              <br />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default authLayout(ResetPassword);
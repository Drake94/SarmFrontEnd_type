import React from 'react';
import '../assets/css/login.css';
import 'bootstrap/dist/css/bootstrap.css';

const authLayout = (ChildComponent: React.ComponentType<any>) => {
  const AuthLayout: React.FC<any> = (props) => {
    return (
      <>
        <section className="vh-100">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-17 img_cen">
                <img alt="hey" src={require('../assets/images/logo blanco.png')} className="img-fluid" />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <ChildComponent {...props} />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return AuthLayout;
};

export default authLayout;
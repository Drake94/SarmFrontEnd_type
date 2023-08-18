import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top border-bottom">
      <div className="container-fluid">
        <h1 className="tittleNav">S.A.R.M</h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Add your content here */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
import React, { useEffect, useState } from 'react';
import Header from '../common/header';
import Sidebar from '../common/sidebar';
import '../assets/css/profile.css';
import Loading from '../component/loading';
import 'bootstrap/dist/css/bootstrap.css';

const adminLayout = (ChildComponent: React.ComponentType<any>) => {
  const AdminLayout: React.FC<any> = (props) => {
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setPageLoaded(true);
      }, 1000);
    }, []);

    const renderHtml = () => {
      if (!pageLoaded) {
        return (
          <div className="loading-page">
            <div className="center">
              <Loading />
            </div>
          </div>
        );
      }

      return (
        <div className="d-flex" id="wrapper">
          {/* <!-- Sidebar--> */}
          <Sidebar />
          {/* <!-- Page content wrapper--> */}
          <div className="main" id="page-content-wrapper">
            {/* <!-- Top navigation--> */}
            <Header />
            {/* <!-- Page content--> */}
            <div className="container-fluid content-container-bef">
              <div className="container-fluid content-container">
                <ChildComponent {...props} />
                <div className="d-flex flex-row-reverse bd-highlight col-md-12">
                  <div className="row">
                    <div className="bottom-1 col-md-6"></div>
                    <div className="column"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return <>{renderHtml()}</>;
  };

  return AdminLayout;
};

export default adminLayout;
import React, { useState } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../assets/css/profile.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaHome, FaUserCheck, FaFileMedical, FaSyringe, FaUserInjured, FaList } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const user = localStorage.getItem('usuario');
  const rol = localStorage.getItem('cargo');
  const rut = localStorage.getItem('rut');
  const correo = localStorage.getItem('correo');
  const imgUrl = localStorage.getItem('imgUrl');

  const sideContainerVariable = {
    true: {
      width: '25rem',
    },
    false: {
      transition: {
        delay: 0.6,
      },
      width: '5rem',
    },
  };

  const subHeading = {
    true: {
      opacity: 1,
    },
    false: {
      display: 'none'
    }
  };

  const subIcon = {
    true: {
      opacity: 1,
    },
    false: {
      alignItems: 'center',
      className: 'centerIcon',
    }
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const LogOut = () => {
    localStorage.removeItem('correo');
    localStorage.removeItem('usuario');
    localStorage.removeItem('cargo');
    localStorage.removeItem('rut');
    localStorage.removeItem('image');
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    const token = '';
    localStorage.clear();
  };

  return (
    <motion.div
      data-Open={open}
      variants={sideContainerVariable}
      initial={`${open}`}
      animate={`${open}`}
      className="border-end sidenav"
      id="sidebar-wrapper"
    >
      <div className="sidebar-heading border-bottom">
        <motion.div
          whileHover={{
            scale: 1.2,
            rotate: 180,
            /* backdropcolor: 'rgba(255, 255, 255, 0.3)',*/
            backdropFilter: 'blur(3.5px)',
            WebkitBackdropFilter: 'blur(3.5px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
          onClick={handleToggle}
          className="menu_icon"
        >
          <FaList />
        </motion.div>
        <Link to="/perfil">
          <img className="imgprofile" alt="Alt content" src={`${imgUrl}`} />
        </Link>
        <br />
        <div>
          <Link to="/perfil" className="Sidebartittle" title="Ver perfil">
            <motion.h1 variants={subHeading}>Hola, {user}</motion.h1>
          </Link>
        </div>
        <p> </p>
        <br />
      </div>
      <motion.div layout className="sidebar-items" variants={subIcon}>
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <Link className="sidebartext" to="/">
              <FaHome /> <motion.abbr variants={subHeading}>Inicio</motion.abbr>
            </Link>
          </li>
          <li className="mb-1">
            <Link className="sidebartext" to="/pacientes">
              <FaUserInjured /> <motion.abbr variants={subHeading}>Pacientes</motion.abbr>
            </Link>
          </li>
          <li className="mb-1">
            <Link className="sidebartext" to="/muestras">
              <FaSyringe /> <motion.abbr variants={subHeading}>Muestra</motion.abbr>
            </Link>
          </li>
          <li className="mb-1">
            <Link className="sidebartext" to="/resultados">
              <FaFileMedical /> <motion.abbr variants={subHeading}>Resultado</motion.abbr>
            </Link>
          </li>
          <li className="mb-1">
            {rol === 'Administrador' ? (
              <Link className="sidebartext" to="/">
                <FaUserCheck /> <motion.abbr variants={subHeading}>Administración</motion.abbr>
              </Link>
            ) : (
              <p className="sidebartextDisabled">
              </p>
            )}
          </li>
        </ul>
      </motion.div>
      <div className="fixed-bottom-dropdown">
        <div className="row">
          <div className="col sidebar-container">
            <motion.a variants={subHeading}>
              <img alt="Alt content" src={require('../assets/images/favicon.png')} width="32" height="32" className="rounded-circle me-2" />
            </motion.a>
          </div>
          <div className="col sidebar-container-text">
            <Link className="dropdown-item" to="/login" onClick={LogOut}>
              <FaSignOutAlt />
              <motion.abbr variants={subHeading}> Cerrar sesión</motion.abbr>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
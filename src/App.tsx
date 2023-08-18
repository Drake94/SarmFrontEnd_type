import React from 'react';
import './assets/css/app.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './auth/loginPage'
import PageError from './auth/errorPage'
import PrivateRoutes from './component/privateRoute'
import ResetPassword from './auth/resetPassword'
import HomePage from './general/homePage';
import ProfilePage from './Medico/Components/profilePage';
import MedicoLayout from './Medico/Components/MedicoLayout'
import SamplePage from './Muestra/Components/sampleLayout'
import PacienteLayout from './Paciente/Components/pacienteLayout';
import ResultLayout from './Resultado/Components/resultLayout';
import './App.css';

function App() {
  return (
    <Router>
            <Routes>
              <Route element={< PrivateRoutes />}>
              <Route path='/' element={<HomePage/>} />
              <Route path='/perfil' element={<ProfilePage/>} />
              <Route path='/medicos' element={<MedicoLayout/>} />
              <Route path='/muestras' element={<SamplePage/>} />
              <Route path='/pacientes' element={<PacienteLayout/>} />
              <Route path='/resultados' element={<ResultLayout/>} />            
              </Route>
              
              <Route path='/*' element={<PageError/>} />
              <Route path='/login' element={< LoginPage />}/>
              <Route path='/reset-password' element={<ResetPassword/>} />

            </Routes>
    </Router>
  );
}

export default App;

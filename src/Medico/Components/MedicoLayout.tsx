import React, { useState, useEffect } from 'react';
import '../../assets/css/app.css';
import { Modal, Container } from 'react-bulma-components';
import adminLayout from '../../HOC/adminLayout';
import AddButton from '../../component/button';
import Header from '../../component/header';
import ListMedics from './listMedicos';
import Form from './form';
import { createMedic } from '../services';
import Loading from '../../component/loading';
import { getMedics } from '../services';
import swal from 'sweetalert2';
import { MedicI } from '../../interfaces/medico'

const MedicoLayout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [medics, setMedics] = useState<MedicI[]>([]);

  async function loadMedics() {
    const response = await getMedics();
    if (response.status === 200) {
      setMedics(response.data.medicolab);
    }
    setIsLoading(false);
  }

  // Retorna los médicos almacenados
  useEffect(() => {
    loadMedics();
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      const response = await createMedic(data);
    if (response.status === 201) {
      swal.fire({
        icon: 'success',
        title: 'Registrado',
        text: 'Médico ' + data.nombre + ' ha sido registrado con éxito',
        confirmButtonText: 'Aceptar',
        timer: 3000,
      });
      setIsModalOpen(false);
      loadMedics();
    } else if (response.status !== 201) {
      swal.fire({
        icon: 'error',
        title: 'No registrado',
        text: 'Ha ocurrido un error ' + response.data,
        confirmButtonText: 'Aceptar',
      });
    }

    } catch (error) {
      const fail:any = error
      swal.fire({
        icon: 'error',
        title: 'No registrados',
        text: 'Ha ocurrido un error ' + fail.response.data,
        confirmButtonText: 'Aceptar',
      });
      loadMedics();
    }
    

    loadMedics();
  };

  return (
    <>
      <Container>
        <AddButton onClick={() => setIsModalOpen(true)} />
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Modal.Card>
            <Modal.Card.Header className='delete'>
              Registrar un médico
            </Modal.Card.Header>
            <Modal.Card.Body>
              <Form handleSubmit={handleSubmit} />
            </Modal.Card.Body>
          </Modal.Card>
        </Modal>
        <Header title='Médicos' />
        {isLoading && <Loading />}

        {!isLoading && !medics.length && (
          <h2 className='title has-text-centered'>
            No hay médicos registrados
          </h2>
        )}

        {!isLoading && medics.length && <ListMedics />}
      </Container>
    </>
  );
};

export default adminLayout(MedicoLayout);
import React, { useState, useEffect } from 'react';
import { Modal, Container } from 'react-bulma-components';
import adminLayout from '../../HOC/adminLayout';
import AddButton from '../../component/button';
import Header from '../../component/header';
import TableSamples from './tableSample';
import Form from './form';
import { createMuestra } from '../services';
import Loading from '../../component/loading';
import { getMuestra } from "../services";
import swal from 'sweetalert2';
import { SampleI } from '../../interfaces/muestra'

const SampleLayout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [samples, setSamples] = useState<SampleI[]>([]);

  async function loadSamples() {
    const response = await getMuestra();
    if (response.status === 200) {
      setSamples(response.data.muestra)
    }
    setIsLoading(false)
  }

  //retorna las muestras almacenados
  useEffect(() => {
    loadSamples()
  }, [])

  const handleSubmit = async (data: any) => {
    try {
      const response = await createMuestra(data);
      if (response.status === 201) {
        swal.fire({
          icon: 'success',
          title: 'Registrado',
          text: 'Muestra registrada con éxito',
          confirmButtonText: 'Aceptar',
          timer: 3000
        });
        setIsModalOpen(false);
        loadSamples();
      } else if (response.status !== 201) {
        swal.fire({
          icon: 'error',
          title: 'No registrado',
          text: 'Ha ocurrido un error ' + response.data,
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      const fail: any = error
      swal.fire({
        icon: 'error',
        title: 'No registrado',
        text: 'Ha ocurrido un error ' + fail.response.data,
        confirmButtonText: 'Aceptar'
      });
      loadSamples();
    }
  };

  return (
    <>
      <Container>
        <AddButton onClick={() => setIsModalOpen(true)} />
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Modal.Card>
            <Modal.Card.Header>
              Registrar Muestra
            </Modal.Card.Header>
            <Modal.Card.Body>
              <Form handleSubmit={handleSubmit} />
            </Modal.Card.Body>
          </Modal.Card>
        </Modal>
        <Header title="Muestras registradas" />
        {isLoading && <Loading />}

        {!isLoading && !samples.length && (
          <h2 className='title has-text-centered'>
            No hay muestras registrados
          </h2>
        )}

        {!isLoading && samples.length && <TableSamples key={samples[0]?._id} />}
      </Container>
    </>
  );
};

export default adminLayout(SampleLayout);
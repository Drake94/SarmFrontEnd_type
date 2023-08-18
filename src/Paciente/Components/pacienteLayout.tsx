import React, { useState, useEffect } from 'react';
import { Modal, Container } from 'react-bulma-components';
import adminLayout from '../../HOC/adminLayout';
import AddButton from '../../component/button';
import Header from '../../component/header';
import ListPacient from './listPaciente';
import Form from './form';
import { createPacient } from '../services';
import Loading from '../../component/loading';
import { getPacient } from "../services";
import swal from 'sweetalert2';
import { PacientI } from '../../interfaces/paciente'



const PacientLayout: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [pacients, setPacients] = useState<PacientI[]>([]);

    async function loadPacients() {
        const response = await getPacient();

        if (response.status === 200) {
            setPacients(response.data.paciente);
        }
        setIsLoading(false);
    }

    // Retorna los pacientes almacenados
    useEffect(() => {
        loadPacients();
    }, []);

    const handleSubmit = async (data: any) => {
        try {
            const response = await createPacient(data);
            if (response.status === 201) {
                swal.fire({
                    icon: 'success',
                    title: 'Registrado',
                    text: `Paciente ${data.nombrePaciente} ha sido registrado con éxito`,
                    confirmButtonText: 'Aceptar',
                    timer: 3000,
                });
                setIsModalOpen(false);
                loadPacients();
            } else if (response.status !== 201) {
                swal.fire({
                    icon: 'error',
                    title: 'No registrado',
                    text: `Ha ocurrido un error: ${response.data}`,
                    confirmButtonText: 'Aceptar',
                });
            }
        } catch (error) {
            const fail: any = error
            swal.fire({
                icon: 'error',
                title: 'No registrado',
                text: `Ha ocurrido un error: ${fail.response.data}`,
                confirmButtonText: 'Aceptar',
            });
        }
    };

    return (
        <Container>
            <AddButton onClick={() => setIsModalOpen(true)} />
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Card>
                    <Modal.Card.Header>
                        Registrar un paciente
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                        <Form handleSubmit={handleSubmit} />
                    </Modal.Card.Body>
                </Modal.Card>
            </Modal>
            <Header title="Pacientes" />
            {isLoading && <Loading />}
            {!isLoading && !pacients.length && (
                <h2 className='title has-text-centered'>
                    No hay pacientes registrados
                </h2>
            )}
            {!isLoading && pacients.length && <ListPacient pacients={pacients} />}
        </Container>
    );
};

export default adminLayout(PacientLayout);
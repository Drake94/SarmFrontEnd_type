import React, { useState, useEffect } from 'react';
import { Modal, Container } from 'react-bulma-components';
import adminLayout from '../../HOC/adminLayout';
import AddButton from '../../component/button';
import Header from '../../component/header';
import TableResult from './tableResult';
import Form from './form';
import { createResult } from '../services';
import Loading from '../../component/loading';
import { getResult } from "../services";
import swal from 'sweetalert2';
import { ResultI } from '../../interfaces/resultado'



const ResultLayout: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState<ResultI[]>([]);

    async function loadResult() {
        const response = await getResult();

        if (response.status === 200) {
            setResults(response.data.resultado);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        loadResult();
    }, []);

    const handleSubmit = async (data: any) => {
        try {
            const response = await createResult(data);
            if (response.status === 201) {
                swal.fire({
                    icon: 'success',
                    title: 'Registrado',
                    text: 'Resultado registrado con éxito',
                    confirmButtonText: 'Aceptar',
                    timer: 3000
                });
                loadResult();
                setIsModalOpen(false);
            } else if (response.status !== 201) {
                swal.fire({
                    icon: 'error',
                    title: 'No registrado',
                    text: 'Ha ocurrido un error ' + response.data,
                    confirmButtonText: 'Aceptar'
                });
                loadResult();
            }
            loadResult();
        } catch (error) {
            const fail: any = error
            swal.fire({
                icon: 'error',
                title: 'No registrado',
                text: 'Ha ocurrido un error ' + fail.response.data,
                confirmButtonText: 'Aceptar'
            });
            loadResult();
        }
        loadResult();
        
    };

    return (
        <>
            <Container>
                <AddButton onClick={() => setIsModalOpen(true)} />
                <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <Modal.Card>
                        <Modal.Card.Header>
                            Registrar Resultados
                        </Modal.Card.Header>
                        <Modal.Card.Body>
                            <Form handleSubmit={handleSubmit} />
                        </Modal.Card.Body>
                    </Modal.Card>
                </Modal>
                <Header title="Resultados" />
                {isLoading && <Loading />}

                {!isLoading && !results.length && (
                    <h2 className='title has-text-centered'>
                        No hay resultados registrados
                    </h2>
                )}

                {!isLoading && results.length && <TableResult results={results} />}
            </Container>
        </>
    );
};

export default adminLayout(ResultLayout);
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Table } from 'react-bulma-components';
import '../../assets/css/profile.css'
import { FaCog, FaPen, FaTrash } from "react-icons/fa"
import { deleteResult } from "../services";
import { Modal } from 'react-bulma-components';
import Pagination from '../../component/pagination';
import { getResult } from "../services";
import { getResultById } from "../services";
import { ResultI } from '../../interfaces/resultado'
import Form from './formEdit';
import swal from "sweetalert2";

interface TableResultProps {
    results: ResultI[];
}

const TableResult: React.FC<TableResultProps> = ({ results }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [result, setResults] = useState<ResultI[]>([]);
    const totalSamples = result.length;
    const [samplesForPage, setSamplesForPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const lastIndex = currentPage * samplesForPage;
    const firstIndex = lastIndex - samplesForPage;
    const [idUP, setIdUP] = useState<any>();
    async function loadResult() {
        const response = await getResult();

        if (response.status === 200) {
            setResults(response.data.resultado);
        }
    }

    useEffect(() => {
        loadResult();
    }, []);

    const handleSubmit = async (_id?: string) => {
        try {
             if(!_id){
            swal.fire({
                icon: 'error',
                title: 'No registrado',
                text: 'no existe ',
                confirmButtonText: 'Aceptar'
            });
        }else{
            await swal.fire({
                icon: 'warning',
                title: 'Confirmación',
                text: 'Desea eliminar este resultado ',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',                
                denyButtonText:'cancelar',
                confirmButtonColor: 'blue',
            }).then(response => {
                if(response.isConfirmed){
                    swal.fire('Se elimino exitosamente');
                    deleteResult(_id);
                    loadResult();
                }else if (response.isDenied){
                    swal.fire('Cancelado')
                    loadResult();
                }else{
                    swal.fire('Error, ocurrió algo inesperado')
                    loadResult();
                }
            });
            
            loadResult();
        }
        } catch (error) {
            const fail: any = error
            swal.fire({
                icon: 'error',
                title: 'No registrado',
                text: 'Ha ocurrido un error ' + fail.response.data,
                confirmButtonText: 'Aceptar',
            });
            loadResult();
        }
        loadResult();
    };

    const _handleSubmit = async (_id?: string) => {
        setIdUP(_id)
        try {
            await getResultById(_id);
        } catch (error) {
            const fail: any = error
            swal.fire({
                icon: 'error',
                title: 'No registrado',
                text: 'Ha ocurrido un error ' + fail.response.data,
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div>
            <Box>
                <Table className="table">
                    <thead>
                        <tr>
                            <th className="abbr">
                                <abbr title="Describa el resultado">Resultado</abbr>
                            </th>
                            <th className="abbr">
                                <abbr title="Tipo de muestra">Tipo de muestra</abbr>
                            </th>
                            <th className="abbr">
                                <abbr title="Descripción">Validado por:</abbr>
                            </th>
                            <th className="abbr">
                                <abbr title="Rut Paciente">Rut del paciente</abbr>
                            </th>
                            <th className="abbr">
                                <abbr title="Fecha última actualización ">Fecha Revisión</abbr>
                            </th>
                            <th className="abbr">
                                <abbr title="Estado">Estado</abbr>
                            </th>
                            <th className="abbr">Opciones</th>
                        </tr>
                    </thead>
                    <tbody className="tbody-1">
                        {results.slice(firstIndex, lastIndex).map(({ result, sampleType, validation, rutPatient, updatedAt, status, _id }) => (
                            <tr className="tr-1" key={_id}>
                                <td>{result}</td>
                                <td>{sampleType}</td>
                                <td>{validation}</td>
                                <td>{rutPatient}</td>
                                <td>{updatedAt}</td>
                                <td>{status}</td>
                                <td className="centerTable">
                                    <div className="dropdown table-action-dropdown">
                                        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButtonSM" data-bs-toggle="dropdown" aria-expanded="false"><FaCog /></button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonSM">
                                            <li>
                                                <button className="btn btn-outline-black " aria-hidden="true" onClick={() => [_handleSubmit(_id), setIsModalOpen(true)]}><FaPen />&nbsp; Editar
                                                </button>
                                                <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                                    <Modal.Card>
                                                        <Modal.Card.Header>
                                                            Actualizar Resultados
                                                        </Modal.Card.Header>
                                                        <Modal.Card.Body>
                                                            <Form _id={idUP} />
                                                        </Modal.Card.Body>
                                                    </Modal.Card>
                                                </Modal>
                                            </li>
                                            <div className="dropdown-divider"></div>
                                            <li>
                                                <button className="btn btn-outline-light  text-danger" aria-hidden="true" onClick={() => handleSubmit(_id)}><FaTrash />&nbsp; Eliminar</button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Box>
            <Pagination
                samplesForPage={samplesForPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalSamples={totalSamples}
            />
        </div>
    );
};

export default TableResult;
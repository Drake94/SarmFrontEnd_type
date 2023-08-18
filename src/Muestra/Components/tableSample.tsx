/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Table } from 'react-bulma-components';
import '../../assets/css/profile.css'
import { FaCog, FaPen, FaTrash } from "react-icons/fa"
import Pagination from '../../component/pagination';
import { getMuestra } from "../services";
import { SampleI } from '../../interfaces/muestra'

const TableSamples: React.FC = () => {
  const [samples, setSamples] = useState<SampleI[]>([]);
  const totalSamples = samples.length;
  const [samplesForPage, setSamplesForPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * samplesForPage;
  const firstIndex = lastIndex - samplesForPage;

  useEffect(() => {
    const loadSamples = async () => {
      const response = await getMuestra();

      if (response.status === 200) {
        setSamples(response.data.muestra);
      }
    };

    loadSamples();
  }, []);

  return (
    <div className="mb-3">
      <Box>
        <Table className="table">
          <thead>
            <tr>
              <th className="abbr">
                <abbr title="Tipo de muestra">Tipo de muestra</abbr>
              </th>
              <th className="abbr">
                <abbr title="Descripción">Descripción</abbr>
              </th>
              <th className="abbr">
                <abbr title="Rut Paciente">Rut del paciente</abbr>
              </th>
              <th className="abbr">
                <abbr title="Fecha muestra">Fecha muestra</abbr>
              </th>
              <th className="abbr">
                <abbr title="Estado">Estado</abbr>
              </th>
              <th className="abbr">
                <abbr>Opciones</abbr>
              </th>
            </tr>
          </thead>
          <tbody className="tbody-1">
            {samples.slice(firstIndex, lastIndex).map(({ _id, sampleType, description, rutPatient, createdAt, status }) => (
              <tr className="tr-1" key={_id}>
                <td>{sampleType}</td>
                <td>{description}</td>
                <td>{rutPatient}</td>
                <td>{createdAt}</td>
                <td>{status}</td>
                <td className="centerTable">
                  <div className="dropdown table-action-dropdown">
                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButtonSM" data-bs-toggle="dropdown" aria-expanded="false"><FaCog /></button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonSM">
                      <li>
                        <button className="btn btn-outline-black " aria-hidden="true" ><FaPen />&nbsp;Editar</button>
                      </li>
                      <div className="dropdown-divider"></div>
                      <li>
                        <button className="btn btn-outline-light  text-danger" aria-hidden="true"><FaTrash />&nbsp;Eliminar</button>
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

export default TableSamples;
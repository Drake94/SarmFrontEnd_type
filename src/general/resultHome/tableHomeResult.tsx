/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Table } from 'react-bulma-components';
import '../../assets/css/profile.css';
import Pagination from '../../component/pagination';
import { getResult } from "../../Resultado/services";
import {ResultI} from '../../interfaces/resultado'


const TableHomeResult: React.FC = () => {
  const [result, setResults] = useState<ResultI[]>([]);
  const totalSamples = result.length;
  const [samplesForPage, setSamplesForPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const lastIndex = currentPage * samplesForPage;
  const firstIndex = lastIndex - samplesForPage;

  async function loadResult() {
    try {
      const response = await getResult();

      if (response.status === 200) {
        setResults(response.data.resultado);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadResult();
  }, []);

  return (
    <div>
      <Box>
        <Table className="table">
          <thead>
            <tr>
              <th className="abbr">
                <abbr>Rut del paciente</abbr>
              </th>
              <th className="abbr">
                <abbr>Validado por:</abbr>
              </th>
              <th className="abbr">
                <abbr>Estado</abbr>
              </th>
            </tr>
          </thead>

          <tbody className="tbody-1">
            {result
              .map(({ validation, rutPatient, createdAt, status, _id }) => (
                <tr className="tr-1" key={_id}>
                  <td>{rutPatient}</td>
                  <td>{validation}</td>
                  <td>{status}</td>
                </tr>
              ))
              .slice(firstIndex, lastIndex)}
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

export default TableHomeResult;
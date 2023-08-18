import React, { useState, useEffect } from 'react';
import { Container } from 'react-bulma-components';
import Header from '../../component/header';
import TableHomeResult from './tableHomeResult';
import Loading from '../../component/loading';
import { getResult } from "../../Resultado/services";
import {ResultI} from '../../interfaces/resultado'

const ResultHomeLayout: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [results, setResults] = useState<ResultI[]>([]);

  async function loadResult() {
    try {
      const response = await getResult();

      if (response.status === 200) {
        setResults(response.data.resultado);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  // Retorna los resultados almacenados
  useEffect(() => {
    loadResult();
  }, []);

  return (
    <>
      <Container>
        <Header title="Resultados" />
        {isLoading && <Loading />}
        {!isLoading && !results.length && (
          <h2 className='title has-text-centered'>
            No hay resultados registrados
          </h2>
        )}
        {!isLoading && results.length && (
          <TableHomeResult />
        )}
      </Container>
    </>
  );
};

export default ResultHomeLayout;
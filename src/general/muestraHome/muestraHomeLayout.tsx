import React, { useState, useEffect } from 'react';
import { Container } from 'react-bulma-components';
import Header from '../../component/header';
import TableHomeSamples from './tableHomeSample';
import Loading from '../../component/loading';
import { getMuestraPorRevisar } from "../../Muestra/services";
import {SampleI} from '../../interfaces/muestra'


const SampleHomeLayout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [samples, setSamples] = useState<SampleI[]>([]);

  async function loadSamples() {
    try {
      const response = await getMuestraPorRevisar();

      if (response.status === 200) {
        setSamples(response.data.Muestrafound);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadSamples();
  }, []);

  return (
    <>
      <Container>
        <Header title="Muestras por revisar" />
        {isLoading && <Loading />}

        {!isLoading && !samples.length && (
          <h2 className='title has-text-centered'>
            No hay muestras registradas
          </h2>
        )}

        {!isLoading && samples.length && <TableHomeSamples />}
      </Container>
    </>
  );
};

export default SampleHomeLayout;
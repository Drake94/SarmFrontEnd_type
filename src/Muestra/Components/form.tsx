import React, { useEffect, useState } from "react";
import { Form as BulmaForm, Button } from 'react-bulma-components';
import { getSampleType, getStatus } from '../../general/generalService'
import { getPacient } from '../../Paciente/services'
import { SampleI } from '../../interfaces/muestra'
import { PacientI } from '../../interfaces/paciente'
import { StatusI } from '../../interfaces/status'
import { SampleTypeI } from '../../interfaces/sampleType'
const { Field, Control, Label, Input, Select } = BulmaForm

interface FormProps {
    handleSubmit: (formValues: SampleI) => void;
  }
const Form: React.FC<FormProps> = ({ handleSubmit }) => {
    const [sampleType, setSampleType] = useState<SampleTypeI[]>([]);
    const [pacients, setPacients] = useState<PacientI[]>([]);
    const [status, setStatus] = useState<StatusI[]>([]);
    const [formValues, setFormValues] = useState({
      sampleType: '',
      description: '',
      rutPatient: '',
      status: '',
    });
  
    useEffect(() => {
      const loadSamples = async () => {
        const response = await getSampleType();
        if (response.status === 200) {
          setSampleType(response.data.tipoMuestra);
        }
      };
      loadSamples();
    }, []);
  
    useEffect(() => {
      const loadPacients = async () => {
        const response = await getPacient();
        if (response.status === 200) {
          setPacients(response.data.paciente);
        }
      };
      loadPacients();
    }, []);
  
    useEffect(() => {
      const loadStatus = async () => {
        const response = await getStatus();
        if (response.status === 200) {
          setStatus(response.data.statusfound);
        }
      };
      loadStatus();
    }, []);
  
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    }
  
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(formValues);
    }
  
    return (
      <form onSubmit={handleFormSubmit}>
        <Field>
          <Label>Tipo de muestra</Label>
          <Control>
            <Select
              name="sampleType"
              value={formValues.sampleType}
              onChange={handleChange}
            >
              <option>Ej: Orina</option>
              {
                sampleType.map(tipo => (
                  <option key={tipo._id} value={tipo.name}>{tipo.name}</option>
                ))
              }
            </Select>
          </Control>
        </Field>
        <Field>
          <Label>Descripción</Label>
          <Control>
            <Input
              placeholder="Describir la muestra"
              name="description"
              value={formValues.description}
              onChange={handleChange}
            />
          </Control>
        </Field>
        <Field>
          <Label>Rut del paciente</Label>
          <Control>
            <Select
              name="rutPatient"
              value={formValues.rutPatient}
              onChange={handleChange}
            >
              <option>Ej. 15321569-4</option>
              {
                pacients.map(pacient => (
                  <option key={pacient._id} value={pacient.rut}>{pacient.rut}</option>
                ))
              }
            </Select>
          </Control>
        </Field>
        <Field>
          <Label>Estado</Label>
          <Control>
            <Select
              name="status"
              value={formValues.status}
              onChange={handleChange}
            >
              <option>Ej: Realizado</option>
              {
                status.map(statu => (
                  <option key={statu._id} value={statu.name}>{statu.name}</option>
                ))
              }
            </Select>
          </Control>
        </Field>
  
        <Button type="submit" color="primary">
          Registrar
        </Button>
      </form>
    );
  }
  
  export default Form;
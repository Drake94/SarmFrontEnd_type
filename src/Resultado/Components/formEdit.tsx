/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Form as BulmaForm, Button } from 'react-bulma-components';
import { getSampleType, getStatus } from '../../general/generalService'
import { getPacient } from '../../Paciente/services'
import { getMuestra } from '../../Muestra/services'
import { ResultI } from '../../interfaces/resultado'
import { PacientI } from '../../interfaces/paciente'
import { StatusI } from '../../interfaces/status'
import { SampleTypeI } from '../../interfaces/sampleType'
import { getResultById } from '../services'
const { Field, Control, Label, Input, Select } = BulmaForm;

interface TableResultProps {
    _id?: string;
}


const Form: React.FC<TableResultProps> = ({ _id }) => {
    const [sampleType, setSampleType] = useState<SampleTypeI[]>([]);
    const [pacients, setPacient] = useState<PacientI[]>([]);
    const [status, setStatus] = useState<StatusI[]>([]);
    const [sample, setSample] = useState([]);
    const [result, setResult] = useState<ResultI[]>([])
    const [formValues, setFormValues] = useState({
        result: '',
        sampleType: '',
        validation: '',
        rutPatient: '',
        status: '',
    });

    async function loadResult() {
        const response = await getResultById(_id);
        if (response.status === 200) {
            setResult(response.data.resultadofound);
        }
    }

    useEffect(() => {
        loadResult();
    });

    async function loadSamples() {
        const response = await getMuestra();
        if (response.status === 200) {
            setSample(response.data.muestra);
        }
    }

    useEffect(() => {
        loadSamples();
    }, []);

    async function loadSamplesType() {
        const response = await getSampleType();
        if (response.status === 200) {
            setSampleType(response.data.tipoMuestra);
        }
    }

    useEffect(() => {
        loadSamplesType();
    }, []);

    async function loadPacient() {
        const response = await getPacient();

        if (response.status === 200) {
            setPacient(response.data.paciente);
        }
    }

    useEffect(() => {
        loadPacient();
    }, []);

    async function loadStatus() {
        const response = await getStatus();
        if (response.status === 200) {
            setStatus(response.data.statusfound);
        }
    }

    useEffect(() => {
        loadStatus();
    }, []);



    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formValues)
    };

    return (
        <form onSubmit={handleSubmit}>
            {result.map((results) => (
                <Field>
                    <Label>Rut Paciente</Label>
                    <Control>
                        <Select
                            name="rutPatient"
                            value={formValues.rutPatient}
                            onChange={handleChange}
                        >
                            <option key={results.rutPatient} value={results.rutPatient}> {results.rutPatient} </option>

                            {pacients.map((pacient) => (
                                <option key={pacient._id} value={pacient.rut}>
                                    {pacient.rut}
                                </option>
                            ))}
                        </Select>
                    </Control>
                </Field>
            ))}
            {result.map((results) => (
                <Field>
                    <Label>Tipo de muestra</Label>
                    <Control>
                        <Select
                            name="sampleType"
                            value={formValues.sampleType}
                            onChange={handleChange}
                        >
                            <option key={results.sampleType} value={results.sampleType}>{results.sampleType}</option>

                            {sampleType.map((tipo) => (
                                <option key={tipo._id} value={tipo.name}>
                                    {tipo.name}
                                </option>
                            ))}
                        </Select>
                    </Control>
                </Field>
            ))}
            {result.map((results) => (
                <Field>
                    <Label>validado por</Label>
                    <Control>
                        <Input
                            placeholder = {results.validation}
                            name="validation"
                            type="text"
                            value={formValues.validation}
                            onChange={handleChange}
                        />
                    </Control>
                </Field>
            ))}
            {result.map((results) => (
                <Field>
                    <Label>Estado</Label>
                    <Control>
                        <Select
                            placeholder="Ej: Realizado"
                            name="status"
                            value={formValues.status}
                            onChange={handleChange}
                        >
                            <option key={results.status} value={results.status}>{results.status}</option>
                            {status.map((statu) => (
                                <option key={statu._id} value={statu.name}>
                                    {statu.name}
                                </option>
                            ))}
                        </Select>
                    </Control>
                </Field>
            ))}
            {result.map((results) => (
                <Field>
                    <Label>Resultado</Label>
                    <Control>
                        <Input
                            className="textarea"
                            placeholder={results.result}
                            name="result"
                            value={formValues.result}
                            onChange={handleChange}
                        />
                    </Control>
                </Field>
            ))}
            <Button type="submit" color="primary">
                Registrar
            </Button>
        </form>
    );
};

export default Form;
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
const { Field, Control, Label, Input, Select } = BulmaForm;



const Form: React.FC<{ handleSubmit: (data: ResultI) => void }> = ({ handleSubmit }) => {
    const [sampleType, setSampleType] = useState<SampleTypeI[]>([]);
    const [pacients, setPacient] = useState<PacientI[]>([]);
    const [status, setStatus] = useState<StatusI[]>([]);
    const [sample, setSample] = useState([]);
    const [formValues, setFormValues] = useState({
        result: '',
        sampleType: '',
        validation: '',
        rutPatient: '',
        status: '',
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

    const _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit({ ...formValues });
    };

    return (
        <form onSubmit={_handleSubmit}>
            <Field>
                <Label>Rut Paciente</Label>
                <Control>
                    <Select
                        name="rutPatient"
                        value={formValues.rutPatient}
                        onChange={handleChange}
                    >
                        <option>Ej. 15321569-4</option>
                        {pacients.map((pacient) => (
                            <option key={pacient._id} value={pacient.rut}>
                                {pacient.rut}
                            </option>
                        ))}
                    </Select>
                </Control>
            </Field>

            <Field>
                <Label>Tipo de muestra</Label>
                <Control>
                    <Select
                        name="sampleType"
                        value={formValues.sampleType}
                        onChange={handleChange}
                    >
                        <option>Ej: Orina</option>
                        {sampleType.map((tipo) => (
                            <option key={tipo._id} value={tipo.name}>
                                {tipo.name}
                            </option>
                        ))}
                    </Select>
                </Control>
            </Field>
            <Field>
                <Label>validado por</Label>
                <Control>
                    <Input
                        placeholder="EJ. Validado por el Dr."
                        name="validation"
                        type="text"
                        value={formValues.validation}
                        onChange={handleChange}
                    />
                </Control>
            </Field>

            <Field>
                <Label>Estado</Label>
                <Control>
                    <Select
                        placeholder="Ej: Realizado"
                        name="status"
                        value={formValues.status}
                        onChange={handleChange}
                    >
                        <option>Ej: Realizado</option>
                        {status.map((statu) => (
                            <option key={statu._id} value={statu.name}>
                                {statu.name}
                            </option>
                        ))}
                    </Select>
                </Control>
            </Field>
            <Field>
                <Label>Resultado</Label>
                <Control>
                    <Input
                        className="textarea"
                        placeholder="Describir resultado"
                        name="result"
                        value={formValues.result}
                        onChange={handleChange}
                    />
                </Control>
            </Field>
            <Button type="submit" color="primary">
                Registrar
            </Button>
        </form>
    );
};

export default Form;
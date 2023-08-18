import React, { useState, ChangeEvent } from "react";
import { Form as BulmaForm, Button } from 'react-bulma-components';
import { PacientI } from '../../interfaces/paciente'

const { Field, Control, Label, Input } = BulmaForm;



interface FormProps {
  handleSubmit: (formValues: PacientI) => void;
}

const Form: React.FC<FormProps> = ({ handleSubmit }) => {
  const [formValues, setFormValues] = useState({
    nombrePaciente: '',
    edad: 0,
    rut: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        <Label>Nombre paciente</Label>
        <Control>
          <Input
            placeholder="Ej. Mars"
            name="nombrePaciente"
            value={formValues.nombrePaciente}
            onChange={handleChange}
          />
        </Control>
      </Field>

      <Field>
        <Label>Edad</Label>
        <Control>
          <Input
            placeholder="Ej. 10"
            type="number"
            name="edad"
            value={formValues.edad}
            onChange={handleChange}
          />
        </Control>
      </Field>

      <Field>
        <Label>Rut</Label>
        <Control>
          <Input
            placeholder="11111111-5"
            name="rut"
            value={formValues.rut}
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
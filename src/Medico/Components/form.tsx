import React, { useState, ChangeEvent } from 'react';
import { Form as BulmaForm, Button } from 'react-bulma-components';
import swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../assets/css/forms.css';
import { MedicI } from '../../interfaces/medico'

const { Field, Control, Label, Input } = BulmaForm;


interface FormProps {
  handleSubmit: (formValues: MedicI) => void;
}

const Form: React.FC<FormProps> = ({ handleSubmit }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formValues, setFormValues] = useState({
    nombre: '',
    cargo: '',
    correo: '',
    clave: '',
    confirmarClave: '',
    rut: '',
  });

  const [showPWD, setShowPWD] = useState(false);
  const [showPWD2, setShowPWD2] = useState(false);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    console.log(selectedFile);

  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValues.nombre.trim().length === 0 || formValues.nombre.length <= 2 || formValues.nombre.length > 25) {
      swal.fire({
        icon: 'info',
        title: 'Error',
        text: 'Nombre no puede quedar vacío, y no puede tener menos de tres caracteres o más de 25',
        confirmButtonText: 'Aceptar',
      });
    } else if (formValues.cargo === '') {
      swal.fire({
        icon: 'info',
        title: 'Campos requeridos',
        text: 'Cargo no puede quedar vacío',
        confirmButtonText: 'Aceptar',
      });
    } else if (formValues.correo === '') {
      swal.fire({
        icon: 'info',
        title: 'Campos requeridos',
        text: 'Correo no puede quedar vacío',
        confirmButtonText: 'Aceptar',
      });
    } else if (formValues.clave === '' || formValues.confirmarClave === '') {
      swal.fire({
        icon: 'info',
        title: 'Campos requeridos',
        text: 'Clave no puede quedar vacío',
        confirmButtonText: 'Aceptar',
      });
    } else if (formValues.clave.length <= 4 || formValues.confirmarClave.length <= 4) {
      swal.fire({
        icon: 'info',
        title: 'Demasiado corto',
        text: 'Las claves deben tener más de 4 caracteres',
        confirmButtonText: 'Aceptar',
      });
    } else if (formValues.clave.length >= 21 || formValues.confirmarClave.length >= 21) {
      swal.fire({
        icon: 'info',
        title: 'Demasiado largo',
        text: 'Las claves deben tener menos de 20 caracteres',
        confirmButtonText: 'Aceptar',
      });
    } else if (formValues.rut === '') {
      swal.fire({
        icon: 'info',
        title: 'Campos requeridos',
        text: 'Rut no puede quedar vacío',
        confirmButtonText: 'Aceptar',
      });
    } else if( !selectedFile  ){
      swal.fire({
          icon: 'info',
          title: 'Campos requeridos',
          text: 'Debe seleccionar una imagen',
          confirmButtonText: 'Aceptar'
          });  
  } else {
      
        handleSubmit({ ...formValues, imgUrl : selectedFile });
        console.log(selectedFile)
      
    }
    
  };
  return (
    <form onSubmit={_handleSubmit}>
      <Field>
        <Label>Nombre</Label>
        <Control>
          <Input
            placeholder="Ej. Mars"
            name="nombre"
            required={true}
            value={formValues.nombre}
            onChange={handleChange}
          />
        </Control>
      </Field>
      <Field>
        <Label>Cargo</Label>
        <Control>
          <Input
            placeholder="Ej. Tens"
            name="cargo"
            required={true}
            value={formValues.cargo}
            onChange={handleChange}
          />
        </Control>
      </Field>
      <Field>
        <Label>Email</Label>
        <Control>
          <Input
            placeholder="EJ. ACL@acl.cl"
            name="correo"
            type="email"
            required={true}
            value={formValues.correo.toLowerCase()}
            onChange={handleChange}
          />
        </Control>
      </Field>
      <Field>
        <Label>Clave</Label>
        <Control className="controlBox">
          <Input
            className="inputBox"
            placeholder="Clave"
            name="clave"
            type={showPWD ? 'text' : 'password'}
            required={true}
            value={formValues.clave}
            onChange={handleChange}
          />
          {showPWD ? (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a className="showPwDForm" onClick={() => setShowPWD(!showPWD)}>
              {' '}
              <FaEyeSlash />
            </a>
          ) : (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a className="showPwDForm" onClick={() => setShowPWD(!showPWD)}>
              {' '}
              <FaEye />
            </a>
          )}
        </Control>
      </Field>
      <Field>
        <Label>Confirmar Clave</Label>
        <Control className="controlBox">
          <Input
            className="inputBox"
            placeholder="Confirmar Clave"
            name="confirmarClave"
            type={showPWD2 ? 'text' : 'password'}
            required={true}
            value={formValues.confirmarClave}
            onChange={handleChange}
          />
          {showPWD2 ? (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a className="showPwDForm" onClick={() => setShowPWD2(!showPWD2)}>
              {' '}
              <FaEyeSlash />
            </a>
          ) : (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a className="showPwDForm" onClick={() => setShowPWD2(!showPWD2)}>
              {' '}
              <FaEye />
            </a>
          )}
        </Control>
      </Field>
      <Field>
        <Label>Rut</Label>
        <Control>
          <Input
            placeholder="11111111-5"
            name="rut"
            required={true}
            value={formValues.rut}
            onChange={handleChange}
          />
        </Control>
      </Field>

      <Field>
        <Label>Imagen</Label>
        <Control>
          <input type="file"onChange={handleFileInput}  />
        </Control>
      </Field>
      <Button type="submit" color="primary">
        Registrar
      </Button>
    </form>
  );
};

export default Form;
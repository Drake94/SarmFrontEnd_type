/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getMedics() {
  try {
    const response = await axios({
      url: `${baseUrl}/medicolab`,
      method: 'GET',
    });
    return response;
  } catch (e) {
    throw e;
  }
}

export async function createMedic(medicData:any) {
  try {
    const formData = new FormData();

    formData.append('nombre', medicData.nombre);
    formData.append('cargo', medicData.cargo);
    formData.append('correo', medicData.correo);
    formData.append('clave', medicData.clave);
    formData.append('confirmarClave', medicData.confirmarClave);
    formData.append('rut', medicData.rut);
    formData.append('image', medicData.imgUrl);

    const response = await axios({
      url: `${baseUrl}/medicolab`,
      method: 'POST',
      data: formData,
    });
    return response;
  } catch (e) {
    throw e;
  }
}

export async function loginMedic(medicData:any) {
  try {
    const data = new URLSearchParams();
    data.append('correo', medicData.correo);
    data.append('clave', medicData.clave);

    const response = await axios({
      url: `${baseUrl}/medicoLabLogIn`,
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: data,
    });
    if (response.status === 200) {
      document.cookie = `token = ${response.data.token};`;
    }
    // eslint-disable-next-line no-unused-vars
    const token = document.cookie.replace('token=', '');
    return response;
  } catch (e) {
    throw e;
  }
}
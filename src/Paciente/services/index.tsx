import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getPacient() {
  try {
    const response = await axios({
      url: `${baseUrl}/paciente`,
      method: 'GET',
    });
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function createPacient(pacientData:any) {
  try {
    const data = new URLSearchParams();
    const token = document.cookie.replace('token=', '');
    data.append('nombrePaciente', pacientData.nombrePaciente);
    data.append('edad', pacientData.edad);
    data.append('rut', pacientData.rut);

    const response = await axios({
      url: `${baseUrl}/paciente`,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': token,
      },
      data: data,
    });
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
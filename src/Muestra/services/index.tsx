import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getMuestra() {
  try {
    const response = await axios({
      url: `${baseUrl}/muestra`,
      method: 'GET',
    });
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getMuestraPorRevisar() {
  try {
    const response = await axios({
      url: `${baseUrl}/muestraporrevisar`,
      method: 'GET',
    });
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function createMuestra(sampleData:any) {
  try {
    const data = new URLSearchParams();

    data.append('sampleType', sampleData.sampleType);
    data.append('description', sampleData.description);
    data.append('rutPatient', sampleData.rutPatient);
    data.append('status', sampleData.status);
    const token = document.cookie.replace('token=', '');
    const response = await axios({
      url: `${baseUrl}/muestra`,
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
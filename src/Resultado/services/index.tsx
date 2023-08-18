import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getResult() {
  try {
    const response = await axios({
      url: `${baseUrl}/resultado`,
      method: 'GET',
    });
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function createResult(resultData:any) {
  try {
    const data = new URLSearchParams();
    const token = document.cookie.replace('token=', '');
    data.append('result', resultData.result);
    data.append('sampleType', resultData.sampleType);
    data.append('validation', resultData.validation);
    data.append('rutPatient', resultData.rutPatient);
    data.append('status', resultData.status);

    const response = await axios({
      url: `${baseUrl}/resultado`,
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

export async function getResultById(data:any) {
  try {
    const response = await axios({
      url: `${baseUrl}/resultado/`+ data,
      method: 'GET',
    });
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function updateResult(_id:any, resultData:any) {
  try {
    const data = new URLSearchParams();
    const token = document.cookie.replace('token=', '');
    data?.append('result', resultData.result);
    data?.append('sampleType', resultData.sampleType);
    data?.append('validation', resultData.validation);
    data?.append('rutPatient', resultData.rutPatient);
    data?.append('status', resultData.status);

    const response = await axios({
      url: `${baseUrl}/resultado/`+ _id,
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

export async function deleteResult(data:any) {
  const token = document.cookie.replace('token=', '');
  try {
    const response = await axios({
      url: `${baseUrl}/resultado/` + data,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': token,
      },
      method: 'DELETE',
    });
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
import axios, { AxiosResponse } from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
const token = document.cookie.replace('token=', '');

interface SampleType {
  name: string;
}

interface Status {
  name: string;
}

export async function getSampleType(): Promise<AxiosResponse> {
  try {
    const response = await axios({
      url: `${baseUrl}/tipomuestra`,
      method: 'GET',
    });
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function createSampleType(sampleTypeData: SampleType): Promise<AxiosResponse> {
  try {
    const data = new URLSearchParams();

    data.append('name', sampleTypeData.name);

    const response = await axios({
      url: `${baseUrl}/tipomuestra`,
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

export async function getStatus(): Promise<AxiosResponse> {
  try {
    const response = await axios({
      url: `${baseUrl}/status`,
      method: 'GET',
    });
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function createStatus(status: Status): Promise<AxiosResponse> {
  try {
    const data = new URLSearchParams();

    data.append('name', status.name);

    const response = await axios({
      url: `${baseUrl}/status`,
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
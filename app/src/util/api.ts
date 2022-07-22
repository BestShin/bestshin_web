import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  // withCredentials: true,
});

export const get = (path: string, headers: object): Promise<AxiosResponse> =>
  api.get(path, headers);

export const post = (
  path: string,
  body: object,
  headers: object
): Promise<AxiosResponse> => api.post(path, body, headers);

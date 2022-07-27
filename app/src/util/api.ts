import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

interface CommonHeaderProperties {
  'x-access-token': string | null;
}

const api = axios.create({
  baseURL: 'http://localhost:3001',
  // withCredentials: true,
});
api.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  const axiosConfig = config;
  const jwtToken = localStorage.getItem('jwtToken');
  if (jwtToken) {
    (
      axiosConfig.headers as unknown as Record<string, CommonHeaderProperties>
    ).common['x-access-token'] = jwtToken;
  }
  return axiosConfig;
});

export const get = (
  path: string,
  headers: object | undefined = undefined
): Promise<AxiosResponse> => api.get(path, headers);

export const post = (
  path: string,
  body: object | undefined = undefined,
  headers: object | undefined = undefined
): Promise<AxiosResponse> => api.post(path, body, headers);

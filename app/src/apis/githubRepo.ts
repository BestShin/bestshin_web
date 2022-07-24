import { AxiosResponse } from 'axios';
import { post } from '../util/api';

export const createUserRepo = async (name: string): Promise<AxiosResponse> => {
  const response = await post(
    '/api/repo',
    {
      name,
    },
    {}
  );
  return response;
};

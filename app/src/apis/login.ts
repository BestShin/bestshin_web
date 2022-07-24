import { AxiosResponse } from 'axios';
import { post } from '../util/api';

export const createLoginToken = async (
  oauthCode: string
): Promise<AxiosResponse> => {
  const response = await post(
    '/api/oauth/token',
    {
      oauthCode,
    },
    {}
  );

  return response;
};

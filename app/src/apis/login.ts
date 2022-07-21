import { post } from '../util/api';

export const createLoginToken = async (oauthCode: string): Promise<any> => {
  const response = await post(
    '/api/oauth/token',
    {
      oauthCode,
    },
    {}
  );
  return response;
};

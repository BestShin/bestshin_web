import { AxiosResponse } from 'axios';
import { post, get } from '../util/api';

export const createUserRepo = async (name: string): Promise<AxiosResponse> => {
  const response = await post(
    '/api/repo',
    {
      repo: name,
    },
    {}
  );
  return response;
};

export const getUserRepoContents = async (
  owner: string,
  name: string,
  path: string
): Promise<AxiosResponse> => {
  const response = await get(
    `api/repo/${owner}/${name}/contents/${encodeURIComponent(path)}`
  );
  return response;
};

export const createRepoTreeSHA = async (
  // TODO: 신동준 | git tree R&D한 후 수정 예정
  owner: string,
  name: string,
  sha: string
): Promise<AxiosResponse> => {
  const response = await post(
    `/api/repo/${owner}/${name}/git/trees`,
    {
      sha,
    },
    {}
  );
  return response;
};

export const getUserRepoTree = async (
  owner: string,
  name: string,
  sha: string
): Promise<AxiosResponse> => {
  const response = await get(`api/repo/${owner}/${name}/git/trees/${sha}'`);
  return response;
};

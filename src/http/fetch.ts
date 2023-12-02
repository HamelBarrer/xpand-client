import { API } from '../constants/api.constant';

export const fetchBasic = async (url: string, options: RequestInit = {}) => {
  const request = new Request(`${API.API_BASE}${url}`, options);

  return await fetch(request);
};

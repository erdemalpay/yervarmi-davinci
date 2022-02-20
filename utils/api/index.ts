import axios from "axios";

export const get = (path: string): Promise<any> => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_HOST}${path}`);
};

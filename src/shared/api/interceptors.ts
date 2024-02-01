import axios, { AxiosError } from "axios";
import { authControllerRefreshTokens } from "./generated";

const retries = 3;

export function authInterceptorClouser() {
  let retry = 0;
  return async function (error: AxiosError) {
    if (error.response?.status === 401 && retry <= retries && error.config) {
      retry++;
      await authControllerRefreshTokens();
      return axios.request(error.config);
    }
    return Promise.reject(error);
  };
}

import axios, { AxiosError } from "axios";
import { authControllerRefreshTokens } from "./generated";
import { string } from "zod";

export function authInterceptorClouser() {
  let retry = 0;
  return async function (error: AxiosError) {
    if (error.response?.status === 401 && retry <= 3 && error.config) {
      retry++;
      await authControllerRefreshTokens();
      return axios.request(error.config);
    }
    return Promise.reject(error);
  };
}

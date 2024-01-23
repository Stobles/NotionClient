import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { authControllerRefreshTokens } from "./generated";
import { authInterceptorClouser } from "./interceptors";

export const apiInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  return apiInstance({
    ...config,
    ...options,
  }).then((r) => r.data);
};

const authInterceptorError = authInterceptorClouser();

apiInstance.interceptors.response.use(
  (response) => response,
  authInterceptorError
);

export type BodyType<Data> = Data;

export type ErrorType<Error> = AxiosError<Error>;

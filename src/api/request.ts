import axios, { type AxiosInstance } from 'axios';

export const env = {
	basePath: import.meta.env.VITE_PUBLIC_BASE_PATH
};

export const request: AxiosInstance = axios.create({
	baseURL: env.basePath
});

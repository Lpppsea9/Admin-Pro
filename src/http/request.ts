import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { getMessageInfo } from './status';

interface BaseResponse<T = any> {
	code: string | number;
	message: string;
	data: T;
	status?: number | string;
}

// 创建实例
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_USE_MOCK
		? import.meta.env.VITE_APP_MOCK_BASEURL
		: import.meta.env.VITE_APP_API_BASEURL,
	timeout: 15000
});

// axios实例拦截请求
service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

// axios实例拦截响应
service.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response.status === 200) {
			return response.data;
		}
		ElMessage({
			message: getMessageInfo(response.status),
			type: 'error'
		});
		return response.data;
	},
	(error: any) => {}
);

const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
	const conf = config;
	return new Promise((resolve, reject) => {
		service.request<any, AxiosResponse<BaseResponse>>(conf).then((res: AxiosResponse<BaseResponse>) => {
			const data = res.data;
			if (data.code != 0) {
				ElMessage({
					message: data.message,
					type: 'error'
				});
				reject(data.message);
			} else {
				ElMessage({
					message: data.message,
					type: 'success'
				});
				resolve(data.data as T);
			}
		});
	});
};

export default service;

export function get<T = any, U = any>(config: AxiosRequestConfig, url: string, parms?: U): Promise<T> {
	return requestInstance({ ...config, url, method: 'GET', params: parms });
}

export function post<T = any, U = any>(config: AxiosRequestConfig, url: string, data?: U): Promise<T> {
	return requestInstance({ ...config, url, method: 'POST', data: data });
}

export function put<T = any, U = any>(config: AxiosRequestConfig, url: string, parms?: U): Promise<T> {
	return requestInstance({ ...config, url, method: 'PUT', params: parms });
}

export function del<T = any, U = any>(config: AxiosRequestConfig, url: string, data?: U): Promise<T> {
	return requestInstance({ ...config, url, method: 'DELETE', data: data });
}

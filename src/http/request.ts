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
			const data = response.data;
			if (data.code !== 0) {
				ElMessage({
					message: data.message,
					type: 'error'
				});
				return Promise.reject(data);
			} else {
				return data;
			}
		}
		ElMessage({
			message: getMessageInfo(response.status),
			type: 'error'
		});
		return response;
	},
	(error: any) => {
		const { response } = error;
		if (response) {
			ElMessage({
				message: getMessageInfo(response.status),
				type: 'error'
			});
			return Promise.reject(response.data);
		}
		ElMessage({
			message: '网络连接异常,请稍后重试!',
			type: 'error'
		});
	}
);

export default service;

import { get } from '@/http/request';

export const getProjectsList = (data: any) => {
	return get({}, '/projects', data);
};

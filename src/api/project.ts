// import { get } from '@/http/request';
import service from '@/http/request';

// export const getProjectsList = (data: any) => {
// 	return get({}, '/projects', data);
// };

export function getProjectsList() {
	return service({
		url: '/projects'
	});
}

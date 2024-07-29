// import { get } from '@/http/request';
import service from '@/http/request';

// 角色列表接口
// export function getRoleList() {
// 	return get({}, '/getRoleList');
// }

export function getRoleList() {
	return service({
		url: '/getRoleList'
	});
}

import { get } from '@/http/request';

// 角色列表接口
export function getRoleList() {
	return get({}, '/getRoleList');
}

export interface IRole {
	role: number; //角色编号
	roleName: string; //角色名称
}

export interface IUser {
	id: number;
	nickName: string; //姓名
	userName: string; //用户名
	role: IRole[];
}

export interface IRoleWithAuth {
	roleId: number; //角色编号
	roleName: string; //角色名称
	auth: []; //权限
}

export interface IQueryUser {
	nickName: string;
	role: number;
}

export interface IUserEdit {
	id: number;
	nickName: string;
	role: [];
	userName: string;
}

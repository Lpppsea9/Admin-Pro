import { defineStore } from 'pinia';
import { refreshUserInfo, userLogin } from '@/api/user';
import pinia from '@/store';

export interface UserState {
	username: string;
	accessToken: string;
	refreshToken?: string;
	roles: Array<string>;
}

export const useUserStoreHook = defineStore('user', {
	state: (): UserState => {
		return {
			username: 'sea9',
			accessToken: '',
			roles: ['common']
		};
	},
	getters: {},
	actions: {
		storeUserLogin(data) {
			return userLogin(data).then((res) => {
				console.log('Res', res);
				this.username = res.data.username;
				this.accessToken = res.data.accessToken;
				this.roles = res.data.roles;
				return res;
			});
		},
		storeRefreshUserInfo() {
			if (this.username === 'sea9' && this.accessToken != '') {
				refreshUserInfo({ accessToken: this.accessToken })
					.then((res) => {
						this.username = res.data.username;
						this.accessToken = res.data.accessToken;
						this.roles = res.data.roles;
					})
					.catch(() => {
						this.accessToken = '';
					});
			}
		}
	},
	persist: {
		key: 'userInfo',
		storage: sessionStorage,
		paths: ['accessToken']
	}
});

export function useUserStore() {
	return useUserStoreHook(pinia);
}

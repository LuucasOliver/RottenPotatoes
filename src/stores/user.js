import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
	state: () => ({
		isLogged: false,
		user: {}
	}),
	actions: {
		setUser(user) {
			this.user = user
			this.isLogged = true
		}
	}
})
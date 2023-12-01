<template>
	<section class="modal" v-if="modelValue">
		<div class="modal-content" v-if="mode === 'login'">
			<div class="header">
				<div class="title">
					Login
				</div>
				<div class="close" @click="close()">x</div>
			</div>
			<div class="body">
				<div class="form-input">
					<div class="label">User name</div>
					<input type="text" v-model="username">
				</div>
				<div class="form-input">
					<div class="label">Senha</div>
					<input type="password" v-model="password">
				</div>
				<div class="signOn">
					Não possui conta? <span @click="mode = 'register'">Cadastre-se</span>
				</div>
				<div class="error" v-show="error === 'validation'">
					Credenciais inválidas
				</div>
			</div>
			<div class="actions">
				<button class="primary" @click="login">Entrar</button>
			</div>
		</div>
		<div class="modal-content" v-else>
			<div class="header">
				<div class="title">
					Login
				</div>
				<div class="close" @click="close()">x</div>
			</div>
			<div class="body">
				<div class="form-input">
					<div class="label">User name</div>
					<input type="text" v-model="username">
				</div>
				<div class="form-input">
					<div class="label">Nome</div>
					<input type="text" v-model="name">
				</div>
				<div class="form-input">
					<div class="label">Senha</div>
					<input type="password" v-model="password">
				</div>
				<div class="form-input">
					<div class="label">Email</div>
					<input type="text" v-model="email">
				</div>
				<div class="form-input">
					<div class="label">Idade</div>
					<input type="number" v-model="age">
				</div>
				<div class="form-input">
					<div class="label">Genêro</div>
					<input type="text" v-model="gender">
				</div>
				<div class="signOn">
					Possui conta? <span @click="mode = 'login'">Entrar</span>
				</div>

			</div>
			<div class="actions">
				<button class="primary" @click="register()">Cadastrar</button>
			</div>
		</div>
	</section>
</template>
<script>

import { signin, signOn } from '../api/user'
import { useUserStore } from '../stores/user'
export default {
	props: {
		modelValue: Boolean
	},
	data: () => ({
		username: '',
		password: '',
		age: '',
		gender: '',
		name: '',
		email: '',
		mode: 'login',
		error: ''
	}),
	emits: ["update:modelValue"],
	methods: {
		resetFields(){
			this.username = ''
			this.password = ''
			this.age = ''
			this.gender = ''
			this.name = ''
			this.email = ''
			this.mode = 'login'
			this.error = ''
		},
		close () {
			this.$emit('update:modelValue', false)
			this.resetFields()
		},
		async login() {
			try {
				this.error = ''
				const userStore = useUserStore()
				const validated = await signin(this.username, this.password)
				userStore.setUser(validated)
				this.close()
			} catch (error) {
				if (error.response.status === 404) this.error = 'validation'
			}
		},
		async register() {
			const userStore = useUserStore()
			const user = await signOn(
				this.username,
				this.name,
				this.password,
				this.email,
				this.age,
				this.gender
			)
			userStore.setUser(user)
			this.close()
		}
	}
}
</script>
<style lang="scss" scoped>
.error { color: red;}
.modal {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(39, 39, 39, 0.414);
	display: flex;
	justify-content: center;
	align-items: center;

	.modal-content {
		background-color: #2f2841;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 300px;
		border-radius: 20px;
		min-width: 600px;
		.header {
			font-weight: bold;
			padding: 1rem;
			color: #00ff88;
			border-bottom: 1px soid rgb(205, 205, 205);
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title {
				height: fit-content;
			}
			.close {
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 24px;
				width: 24px;
			}
		}
		.signOn {
			color: #fff;
			span {
				cursor: pointer;
			}
		}
		.body {
			padding: 1rem;
			box-flex-group: 1;
			display: flex;
			flex-direction: column;
			gap: 12px;
		}
		.actions {
			padding: 1rem;
			display: flex;
			justify-content: flex-end;
			gap: 16px;
			button {
				padding: 1rem;
				font-size: 1rem;
				width: 150px;
				font-weight: bold;
				background-color: #00ff88;
				border: 1px solid #7C8596;
				color: #2b134b;
				background: #00ff88;
				cursor: pointer;
				box-shadow: 0px 10px 40px -12px #00ff8052;
				border-radius: 1rem;
				cursor: pointer;
			}
		}
	}

	.form-input {
		display: flex;
		flex-direction: column;
		gap: 8px;
		color: white;
		input {
			width: 100%;
			border: none;
			border-radius: 10px;
			padding: 15px;
			background: #514869;
			color: #f0ffffde;
			font-size: 12pt;
			box-shadow: 0px 10px 40px #00000056;
			outline: none;
			box-sizing: border-box;
		}
	}
}
</style>
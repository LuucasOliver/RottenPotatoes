<template>
	<section class="modal" v-if="open">
		<div class="modal-content">
			<div class="header">
				<div class="title">
					Adicionar filme
				</div>
				<div class="close" @click="close()">x</div>
			</div>
			<div class="body">
				<div class="form-input">
					<div class="label">Imagem</div>
					<input type="text" v-model="imagem">
				</div>
				<div class="form-input">
					<div class="label">Nome</div>
					<input type="text" v-model="name">
				</div>
				<div class="form-input">
					<div class="label">Sinopse</div>
					<textarea v-model="synopsis"/>
				</div>
			</div>
			<div class="actions">
				<button class="secondary" @click="close()">Cancelar</button>
				<button class="primary" @click="save()">Salvar</button>
			</div>
		</div>
	</section>
</template>
<script>

import { save as saveMovie, updateMovie } from '../api/movie'
export default {
	props: {
		open: Boolean,
		reloadMovies: Function,
		selectedMovie: Object
	},
	data: () => ({
		imagem: '',
		name: '',
		synopsis: ''
		
	}),
	watch: {
		selectedMovie(value) {
			if (value) {
				this.$emit('update:open', true)
				const { imagem, name, synopsis } = value
				this.imagem = imagem
				this.name = name,
				this.synopsis = synopsis
			} else {
				this.imagem = null
				this.name = null
				this.synopsis = null
			}
			
		}
	},
	emits: ["update:open", "update:selectedMovie"],
	methods: {
		close () {
			this.$emit('update:open', false)
			this.$emit('update:selectedMovie', null)
		},
		async save() {
			if (!this.selectedMovie) await saveMovie(this.imagem, this.name, this.synopsis)
			else await updateMovie(this.selectedMovie.id, this.imagem, this.name, this.synopsis)
			await this.reloadMovies()
			this.close()
		}
	}
}
</script>
<style lang="scss">
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
				border-radius: 1rem;
				border: none;
				cursor: pointer;
				&.primary {
					color: #2b134b;
					background-color: #00ff88;
					box-shadow: 0px 10px 40px -12px #00ff8052;
				}
				&.secondary {
					border: 1px solid #7C8596;
					background-color: transparent;
					color: #fff;
				}
			}
		}
	}

	.form-input {
		display: flex;
		flex-direction: column;
		gap: 8px;
		color: white;
		textarea {
			resize: none;
			height: 150px;
		}
		input, textarea {
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
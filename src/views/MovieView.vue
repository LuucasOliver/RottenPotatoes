<template>
	<section>
		<div class="content">
			<div class="movie">
				<div class="cover">
					<div class="name">{{ name }}</div>
					<img :src="imagem">
					<div class="synopsis">{{ synopsis }}</div>
				</div>
				<div class="comments">
					<div class="wrapper">
						<div class="title">Comentarios</div>
						<div class="comment-wrapper">
							<div class="owner">Kaian Santos - 01/12/2023 01:05</div>
							<div class="comment">{{ synopsis }}</div>
						</div>
					</div>
					<div class="new-comment">
						<input type="text">
						<IconSend class="icon-send"/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import { get } from '../api/movie'
import IconSend from '../components/icons/IconSend.vue'

export default {
	props: {
		movie: Number
	},
	components: {
		IconSend
	},
	data: () => ({
		imagem: '',
		name: '',
		synopsis: '',
		comments: []
	}),
	async mounted() {

		const { imagem, name, synopsis } = await get(this.movie)

		this.imagem = imagem
		this.name = name
		this.synopsis = synopsis
	}
}
</script>
<style lang="scss" scoped>
section {
	padding: 2rem;
	display: flex;
	justify-content: center;
	min-height: calc(100vh - 151px);
}
.content {
	max-width: 1650px;
	background-color: #2f2841;
	padding: 24px;
	width: 100%;
	border-radius: 10px;
	min-height: calc(100% - (24px + 2rem));
}
.movie {
	display: flex;
	gap: 2rem;
	color: #fff;
	height: 100%;
	.cover {
		display: flex;
		flex-direction: column;
		width: 400px;
		gap: 1rem;
		.name {
			font-size: 36px;
			font-weight: 700;
		}
	}
	.comments {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		.title {
			font-size: 2rem;
			margin-bottom: 2rem;
		}
		.comment {
			background-color: #4a3f67;
			padding: 20px;
			border-radius: 10px;
			font-size: 26px;
		}
		.comment-wrapper {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
		.new-comment {
			display: flex;
			align-items: center;
			gap: 1rem;
			input {
				flex-grow: 1;
        font-size: 24px;
        border-radius: 10px;
        padding: 0.5rem;
        background-color: #514869;
        border: none;
        color: white;
        outline: none;
			}
			.icon-send {
				height: 32px;
				fill: #00ff88;
			}
		}
	}
}

</style>
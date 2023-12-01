import api from '../libs/api'

export const getAllMovies = async () => {
	const { data } = await api.get('/movie')

	return data
}

export const save = async (imagem, name, synopsis) => {
	const { data } = await api.post('/movie', {
		imagem, name, synopsis
	})
	return data
}

export const updateMovie = async (id, imagem, name, synopsis) => {
	const { data } = await api.put(`/movie/${id}`, {
		imagem, name, synopsis
	})

	return data
}

export const remove = async (id) => {
	const { data } = await api.delete(`/movie/${id}`)
	return data
}

export const get = async (movie) => {
	const { data } = await api.get(`/movie/${movie}`)
	return data
}
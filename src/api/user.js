import api from '../libs/api'

export const signin = async (userName, password) => {
	const { data } = await api.post('/user/signin', {
		userName, password
	})

	return data
}

export const signOn = async (
	userName,
	name,
	password,
	email,
	age,
	gender
) => {
	const { data } = await api.post('/user', {
		email,
		userName,
		password,
		name,
		age,
		gender
	})

	return data
}


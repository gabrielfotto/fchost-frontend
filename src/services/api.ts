import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:8080/',
	headers: {
		'X-Api-Key': 'beb81bdc06d706629f9c966ac497be7c',
	},
})

export default api

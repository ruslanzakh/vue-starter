const mocks = {
	'auth': { 'POST': { token: 'This-is-a-mocked-token' } },
	'user/me': { 'GET': { name: 'doggo', title: 'sir' } }
}

const apiCall = ({url, method = 'GET', ...args}) => new Promise((resolve, reject) => {
	setTimeout(() => {
		try {
			resolve(mocks[url][method]);
			console.warn(`Mocked '${url}' - ${method}`);
			console.warn('response: ', mocks[url][method]);
		} catch (err) {
			reject(new Error(err));
		}
	}, 1000)
})

export default apiCall
const roda = (state = "This is roda.", action) => {
	switch (action.type) {
		case 'SAY_RODA':
			return action.text
		default:
			return state
	}
}

export default roda

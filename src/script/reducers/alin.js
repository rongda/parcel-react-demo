const alin = (state = "This is alin.", action) => {
	switch(action.type) {
		case 'SAY_ALIN':
			return action.text
		default:
			return state
	}
}

export default alin

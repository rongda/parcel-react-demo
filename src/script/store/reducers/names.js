const defaultNames = ["Roda", "Alin"]
const names = (state = defaultNames, action) => {
  switch (action.type) {
    case 'ADD_NAME':
      console.log(action)
      let newName = [...state]
      newName.splice(action.index+1, 0, action.name)
      return newName
    default:
      return state
  }
}

export default names

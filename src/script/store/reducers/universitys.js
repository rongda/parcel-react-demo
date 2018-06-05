const defaultUniversitys = ["北京大学", "厦门大学"]
const universitys = (state = defaultUniversitys, action) => {
  switch (action.type) {
    case 'ADD_UNIVERSITY':
      let newUniversity = [...state]
      newUniversity.splice(action.index+1, 0, action.university)
      return newUniversity
    default:
      return state
  }
}

export default universitys

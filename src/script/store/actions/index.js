import { 
  ADD_NAME,
  ADD_UNIVERSITY
 } from '../actionsType'

export const addName = (name, index) => ({
  type: ADD_NAME,
  name,
  index
})
export const addUniversity = (university, index) => ({
  type: ADD_UNIVERSITY,
  university,
  index
})

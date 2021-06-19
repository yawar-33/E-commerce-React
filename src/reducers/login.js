export default function login(state = null, action) {
  if (action.type === 'LOGIN_ACTION') {
    return action.payload
  }
  return state
}

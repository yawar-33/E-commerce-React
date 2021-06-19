export default function Login(token) {
  return {
    type: 'LOGIN_ACTION',
    payload: {
      token: token,
    },
  }
}

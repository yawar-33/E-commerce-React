import axios from 'axios'

// import { useSelector } from 'react-redux'

export default function GET(url,token) {
  // const token = useSelector((state) =>
  //   state.login ? state.login.token.token : null,
  // )
  const URL = process.env.REACT_APP_URL + url
  return axios(URL, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + token,
      Accept: '*/*',
    },
  })
}

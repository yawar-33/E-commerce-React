import axios from 'axios'

export default function POST(url, payload,token) {
  const URL = process.env.REACT_APP_URL + url

  return axios(URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // whatever you want
      Authorization: 'Bearer ' + token,
      Accept: '*/*',
    },
    data: payload,
  })
}

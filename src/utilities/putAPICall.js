import axios from 'axios'

export default function PUT(url, payload,token) {
  const URL = process.env.REACT_APP_URL + url

  return axios(URL, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json', // whatever you want
      Authorization: 'Bearer ' + token,
      Accept: '*/*',
    },
    data: payload,
  })
}

import axios from 'axios'

export default function POST(url, payload) {
  const URL = process.env.REACT_APP_URL + url
  return axios(URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // whatever you want
    },
    data: payload,
  })
}

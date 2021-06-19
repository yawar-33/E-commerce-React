import axios from 'axios'

export default function GET(url) {
  const URL = process.env.REACT_APP_URL+url;
  return axios(URL, {
    method: 'GET',
    headers: {
      'content-type': 'application/json', // whatever you want
    },
  })
    
}

import axios from 'axios'
console.log('process:', process )
let baseUrl = 'http://localhost:3000/'
let Api = {}

Api.custom = axios
Api.create = function(url, data) {
  return axios({
    url: baseUrl + url,
    method: 'post',
    data,
  })
}
Api.post = function(url, data) {
  return axios({
    url: baseUrl + url,
    method: 'post',
    data,
  })
}
Api.get = function(url, params) {
  return axios({
    url: baseUrl + url,
    method: 'get',
    params,
  })
}

export default Api


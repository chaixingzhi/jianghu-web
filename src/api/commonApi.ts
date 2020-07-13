import axios from 'axios';
const baseUrl = 'http://localhost:3000/';

interface ApiValue {
    custom?: any,
    create?: any,
    post?: any,
    get?: any,
    delete?: any
}
const Api: ApiValue= {};


Api.custom = axios
Api.create = function(url: string, data: object) {
  return axios({
    url: baseUrl + url,
    method: 'post',
    data,
  })
}
Api.post = function(url: string, data: object) {
  return axios({
    url: baseUrl + url,
    method: 'post',
    data,
  })
}
Api.get = function(url: string, params: any) {
  return axios({
    url: baseUrl + url,
    method: 'get',
    params,
  })
}

Api.delete = function(url: string) {
    return axios({
        url: baseUrl + url,
        method: 'DELETE',
    })
};

export default Api;


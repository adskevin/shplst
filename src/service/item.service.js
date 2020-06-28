import Vue from 'vue'
import { authHeader } from '../helpers/auth'

export const itemService = {
  find,
  getById,
  getByList,
  save,
  edit,
  delete: _delete
}

function find () {
  const requestCfg = {
    method: 'GET',
    headers: authHeader()
  }
  return Vue.axios.get('https://localhost:44325/api/Items', requestCfg)
}

function getById (idItems) {
  const requestCfg = {
    method: 'GET',
    headers: authHeader()
  }
  return Vue.axios.get(`https://localhost:44325/api/Items/${idItems}`, requestCfg)
}

function getByList (idList) {
  const requestCfg = {
    method: 'GET',
    headers: authHeader()
  }
  return Vue.axios.get(`https://localhost:44325/api/items/list/${idList}`, requestCfg)
}

function save (items) {
  const requestCfg = {
    method: 'POST',
    headers: authHeader()
  }
  return Vue.axios.post('https://localhost:44325/api/Items', items, requestCfg)
}

function edit (items, idItems) {
  const requestCfg = {
    method: 'POST',
    headers: authHeader()
  }
  return Vue.axios.put(`https://localhost:44325/api/Items/${idItems}`, items, requestCfg)
}

function _delete (idItems) {
  const requestCfg = {
    method: 'DELETE',
    headers: authHeader()
  }
  return Vue.axios.delete(`https://localhost:44325/api/Items/${idItems}`, requestCfg)
}

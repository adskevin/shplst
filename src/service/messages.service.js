import Vue from 'vue'
import { authHeader } from '../helpers/auth'


export const messagesService = {
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
  return Vue.axios.get('https://shoplist.cfapps.io/api/Messages', requestCfg)
}

function getById (idMessages) {
  const requestCfg = {
    method: 'GET',
    headers: authHeader()
  }
  return Vue.axios.get(`https://shoplist.cfapps.io/api/Messages/${idMessages}`, requestCfg)
}

function getByList (idList) {
  const requestCfg = {
    method: 'GET',
    headers: authHeader()
  }
  return Vue.axios.get(`https://shoplist.cfapps.io/api/Messages/List/${idList}`, requestCfg)
}

function save (message) {
  const requestCfg = {
    method: 'POST',
    headers: authHeader()
  }
  return Vue.axios.post('https://shoplist.cfapps.io/api/Messages', message, requestCfg)
}

function edit (message, idMessage) {
  const requestCfg = {
    method: 'POST',
    headers: authHeader()
  }
  return Vue.axios.put(`https://shoplist.cfapps.io/api/Messages/${idMessage}`, message, requestCfg)
}

function _delete (idMessage) {
  const requestCfg = {
    method: 'DELETE',
    headers: authHeader()
  }
  return Vue.axios.delete(`https://shoplist.cfapps.io/api/Messages/${idMessage}`, requestCfg)
}

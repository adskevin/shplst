import Vue from 'vue'
import { authHeader } from '../helpers/auth'

export const peopleService = {
  find,
  save,
  enviaHash,
  getById,
  edit,
  delete: _delete
}

function find () {
  const requestCfg = {
    method: 'GET',
    headers: authHeader()
  }
  return Vue.axios.get('https://shoplist.cfapps.io/api/People', requestCfg)
}

function save (people) {
  const requestCfg = {
    method: 'POST',
    headers: authHeader()
  }
  return Vue.axios.post('https://shoplist.cfapps.io/api/People', people, requestCfg)
}

function enviaHash (verifica) {
  const requestCfg = {
    method: 'POST'
  }
  return Vue.axios.post('https://shoplist.cfapps.io/api/EmailSender/sendauth', verifica, requestCfg)
}

function getById (idPeople) {
  const requestCfg = {
    method: 'GET',
    headers: authHeader()
  }
  return Vue.axios.get(`https://shoplist.cfapps.io/api/People/${idPeople}`, requestCfg)
}

function edit (people, idPeople) {
  const requestCfg = {
    method: 'PUT',
    headers: authHeader()
  }
  return Vue.axios.put(`https://shoplist.cfapps.io/api/People/${idPeople}`, people, requestCfg)
}

function _delete (idPeople) {
  const requestCfg = {
    method: 'DELETE',
    headers: authHeader()
  }
  return Vue.axios.delete(`https://shoplist.cfapps.io/api/Lists/${idPeople}`, requestCfg)
}

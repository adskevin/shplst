import Vue from 'vue'
import { authHeader } from '../helpers/auth'

export const listPersonService = {
  find,
  getById,
  getByListPeople,
  save,
  edit,
  delete: _delete
}

function find () {
  const requestCfg = {
    method: 'GET',
    headers: authHeader()
  }
  return Vue.axios.get('https://shoplist.cfapps.io/api/Lists', requestCfg)
}

function getById (idLista) {
  const requestCfg = {
    method: 'GET',
    headers: authHeader()
  }
  return Vue.axios.get(`https://shoplist.cfapps.io/api/Lists/${idLista}`, requestCfg)
}

function getByListPeople (idUser) {
  const requestCfg = {
    method: 'GET',
    headers: authHeader()
  }
  return Vue.axios.get(`https://shoplist.cfapps.io/api/Lists/person/${idUser}`, requestCfg)
}

function save (listaCompartilhada) {
  const requestCfg = {
    method: 'POST',
    headers: authHeader()
  }
  return Vue.axios.post('https://shoplist.cfapps.io/api/listperson/sharebyemail', listaCompartilhada, requestCfg)
}

function edit (lista, idLista) {
  const requestCfg = {
    method: 'POST',
    headers: authHeader()
  }
  return Vue.axios.put(`https://shoplist.cfapps.io/api/Lists/${idLista}`, lista, requestCfg)
}

function _delete (idLista) {
  const requestCfg = {
    method: 'DELETE',
    headers: authHeader()
  }
  return Vue.axios.delete(`https://shoplist.cfapps.io/api/Lists/${idLista}`, requestCfg)
}

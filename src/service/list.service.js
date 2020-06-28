import Vue from 'vue'
import { authHeader } from '../helpers/auth'

export const listService = {
  find,
  getById,
  getByListPeople,
  GetListByShared,
  GetListByMe,
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

function GetListByShared (idUser) {
  const requestCfg = {
    method: 'GET',
    headers: authHeader()
  }
  return Vue.axios.get(`https://shoplist.cfapps.io/api/Lists/Shared/${idUser}`, requestCfg)
}

function GetListByMe () {
  const requestCfg = {
    method: 'GET',
    headers: authHeader()
  }
  return Vue.axios.get('https://shoplist.cfapps.io/api/lists/sharedbyme', requestCfg)
}

function save (lista) {
  const requestCfg = {
    method: 'POST',
    headers: authHeader()
  }
  return Vue.axios.post('https://shoplist.cfapps.io/api/Lists', lista, requestCfg)
}

function edit (lista) {
  const requestCfg = {
    method: 'PUT',
    headers: authHeader()
  }
  return Vue.axios.put(`https://shoplist.cfapps.io/api/Lists/`, lista, requestCfg)
}

function _delete (idLista) {
  const requestCfg = {
    method: 'DELETE',
    headers: authHeader()
  }
  return Vue.axios.delete(`https://shoplist.cfapps.io/api/Lists/${idLista}`, requestCfg)
}

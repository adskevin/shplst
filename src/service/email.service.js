import Vue from 'vue'

export const emailService = {
  verificaEmail,
  recuperaSenha,
}

function verificaEmail (verifica) {
  const requestCfg = {
    method: 'POST'
  }
  return Vue.axios.post('https://shoplist.cfapps.io/api/People/verif', verifica, requestCfg)
}

function recuperaSenha (esqueciSenha) {
  const requestCfg = {
    method: 'POST'
  }
  return Vue.axios.post('https://shoplist.cfapps.io/api/EmailSender/sendpass', esqueciSenha, requestCfg)
}

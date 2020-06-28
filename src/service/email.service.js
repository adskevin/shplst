import Vue from 'vue'

export const emailService = {
  verificaEmail,
  recuperaSenha,
}

function verificaEmail (verifica) {
  const requestCfg = {
    method: 'POST'
  }
  return Vue.axios.post('https://localhost:44325/api/People/verif', verifica, requestCfg)
}

function recuperaSenha (esqueciSenha) {
  const requestCfg = {
    method: 'POST'
  }
  return Vue.axios.post('https://localhost:44325/api/EmailSender/sendpass', esqueciSenha, requestCfg)
}

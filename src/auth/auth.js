import decode from 'jwt-decode'
import request from './request'

export async function signIn (email, password) {
  await request('POST', '/auth', {
    email,
    password
  }).then((data) => {
    localStorage.setItem('token', JSON.stringify(data.token))
    localStorage.setItem('id', JSON.stringify(data.id))
    localStorage.setItem('name', data.name);
    localStorage.setItem('email', data.email);
  })
}

export function signOut () {
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  localStorage.removeItem('name')
}

export function isSignedIn () {
  const token = localStorage.getItem('token')

  if (!token) { // Se não existe o token no LocalStorage
    return false // significa que o usuário não está assinado.
  }
  try {
    const { exp: expiration } = decode(token)
    const isExpired = !!expiration && Date.now() > expiration * 1000

    if (isExpired) { // Se o token tem uma data de expiração e
      return false // essa data é menor que a atual o usuário
    }// não está mais assinado.
    return true
  } catch (_) { // O "jwt-decode" lança erros pra tokens inválidos.
    return false // Com um token inválido o usuário não está assinado.
  }
}
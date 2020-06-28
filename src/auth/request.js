const baseURL = 'https://shoplist.cfapps.io/api'

function getHeaders () {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...token && {
      ' Authorization ': `bearer ${token}`
    }
  }
}

async function request (method, url, body) {
  const options = {
    method,
    headers: getHeaders(),
    ...(method !== 'GET') && {
      body: JSON.stringify(body)
    }
  }
  const response = await fetch(baseURL + url, options)
  return await response.json()
}

export { request as default, request, getHeaders }

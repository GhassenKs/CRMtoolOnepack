import store from 'store'
import axios from 'axios'
import { notification } from 'antd'

export async function login(email, password) {
  try {
    const response = await axios.post('http://localhost:5000/admins/login', {
      email,
      password,
    })
    if (response) {
      if (response.data.token) {
        store.set('accessToken', response.data.token)
        store.set('isAuthorized', true)
        store.set('name', response.data.name)
        store.set('img', response.data.profilePicture)
        return response.data
      }
    }
    return false
  } catch (err) {
    const { response } = err
    const { data } = response
    if (data) {
      notification.error({
        message: data.msg,
      })
    }
    return false
  }
}

export async function loginClient(email, password) {
  try {
    const response = await axios.post('http://localhost:5000/clients/login', {
      email,
      password,
    })
    if (response) {
      if (response.data.token) {
        store.set('accessToken', response.data.token)
        store.set('isAuthorized', true)
        store.set('name', response.data.name)
        store.set('img', response.data.profilePicture)
        return response.data
      }
    }
    return false
  } catch (err) {
    const { response } = err
    const { data } = response
    if (data) {
      notification.error({
        message: data.msg,
      })
    }
    return false
  }
}

/* export async function register(email, password, name) {
  return apiClient
    .post('/auth/register', {
      email,
      password,
      name,
    })
    .then((response) => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch((err) => console.log(err))
} */

export async function logout() {
  store.remove('accessToken')
  store.remove('isAuthorized')
  store.remove('name')
  store.remove('img')
  return true
}

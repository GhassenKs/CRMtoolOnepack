import { notification } from 'antd'
import { history } from 'index'
import store from 'store'
import { login, logout, loginClient } from 'services/jwt'
import actions from './actions'

const jwt = require('jsonwebtoken')

const getRole = () => {
  const token = localStorage.getItem('accessToken')
  if (token === null) return undefined
  try {
    const decoded = jwt.verify(JSON.parse(token), 'secret')
    const { role } = decoded
    return role
  } catch (err) {
    console.log(err)
    store.remove('accessToken')
    store.remove('isAuthorized')
    store.remove('name')
  }
  return ''
}

export const getId = () => {
  const token = localStorage.getItem('accessToken')
  if (token === null) return undefined
  try {
    const decoded = jwt.verify(JSON.parse(token), 'secret')
    const { sub } = decoded
    return sub
  } catch (err) {
    console.log(err)
    store.remove('accessToken')
    store.remove('isAuthorized')
    store.remove('name')
    store.remove('img')
  }
  return ''
}

const initialState = {
  id: getId() || '',
  name: store.get('name') || '',
  role: getRole() || '',
  email: '',
  profilePicture: store.get('img'),
  authorized: store.get('isAuthorized') || false,
  loading: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const loginThunk = (email, password) => async (dispatch) => {
  dispatch({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const data = await login(email, password)
  if (data) {
    const { userEmail, name, profilePicture } = data
    dispatch({
      type: 'user/SET_STATE',
      payload: {
        id: getId(),
        name,
        email: userEmail,
        profilePicture,
        role: getRole(),
        authorized: true,
      },
    })
    history.push('/')
    notification.success({
      message: 'Logged In',
      description: 'You have successfully logged in!',
    })
  }
  if (!data) {
    dispatch({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export const loginClientThunk = (email, password) => async (dispatch) => {
  dispatch({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const data = await loginClient(email, password)
  if (data) {
    const { userEmail, name, avatar } = data
    dispatch({
      type: 'user/SET_STATE',
      payload: {
        id: getId(),
        name,
        email: userEmail,
        avatar,
        role: getRole(),
        authorized: true,
      },
    })
    history.push('/')
    notification.success({
      message: 'Logged In',
      description: 'You have successfully logged in!',
    })
  }
  if (!data) {
    dispatch({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export const logoutThunk = () => async (dispatch) => {
  const res = await logout()
  console.log(res)
  dispatch({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      authorized: false,
      loading: false,
    },
  })
}

export default userReducer

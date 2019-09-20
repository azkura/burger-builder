import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSucces = ( authData ) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart())
    const apiKey = 'AIzaSyDd1M0qCKqQ2oz9B4LirtQKXIiJ1PShSIU'
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
    if(!isSignUp) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
    }
    
    axios.post(url, authData)
      .then(response => {
        console.log(response)
        dispatch(authSucces(response.data))
      })
      .catch(error => {
        console.log(error)
        dispatch(authFail(error))
      })
  }
}
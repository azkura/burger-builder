import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSucces = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCES,
    id: id,
    orderData: orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = (orderData) => {
  return dispatch => {
    axios.post('/orders.json', orderData)
    .then(response => {
      console.log(response)
      dispatch(purchaseBurgerSucces(response.data, orderData))
    }).catch(error => {
      // console.log(error)
      dispatch(purchaseBurgerFail(error))
    })
  }
}
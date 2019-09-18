import * as actionType from '../actions/actionTypes'

const initialState = () => {
  return {
    order: [],
    loading: false
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      }

    case actionType.PURCHASE_BURGER_SUCCES:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      }
      return {
        ...state,
        loading: false,
        order: state.order.concat(newOrder)
      }

    case actionType.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}

export default reducer
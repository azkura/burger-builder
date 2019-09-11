import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-burger-builder-app-81b53.firebaseio.com/'
})

export default instance
import axios from 'axios'

const ENDPOINTS = {
  allProducts: '/api/shop',
  singleProduct: (id) => `/api/shop/${id}`,

  register: '/api/register'
}

const GET = (endpoint) => axios.get(endpoint)



export const API = { GET, ENDPOINTS }
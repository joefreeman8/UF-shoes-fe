import axios from 'axios'

const ENDPOINTS = {
  allProducts: '/api/shop',
  singleProduct: (id) => `/api/shop/${id}`,

  register: '/api/register',
  login: '/api/login'
}

const GET = (endpoint) => axios.get(endpoint)

const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body)

export const API = { GET, POST, ENDPOINTS }
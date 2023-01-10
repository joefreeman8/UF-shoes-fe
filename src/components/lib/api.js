import axios from 'axios'
import { AUTH } from './auth'

const ENDPOINTS = {
  allProducts: '/api/shop',
  singleProduct: (id) => `/api/shop/${id}`,
  createReview: (productId) => `/api/shop/${productId}/reviews`,

  register: '/api/register',
  login: '/api/login'
}

const getHeaders = () => ({
  headers: {
    authorization: `Bearer ${AUTH.getToken()}`
  }
})


const GET = (endpoint) => axios.get(endpoint)

const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body)

export const API = { GET, POST, ENDPOINTS, getHeaders }
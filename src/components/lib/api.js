import axios from 'axios'
import { AUTH } from './auth'

const ENDPOINTS = {
  allProducts: '/api/shop',
  singleProduct: (id) => `/api/shop/${id}`,
  createReview: (id) => `/api/shop/${id}/reviews`,
  singleReview: (productId, reviewId) => `/api/shop/${productId}/reviews/${reviewId}`,

  register: '/api/register',
  login: '/api/login',
  basketItems: (userId) => `/api/basket/${userId}`
}

const getHeaders = () => ({
  headers: {
    authorization: `Bearer ${AUTH.getToken()}`
  }
})


const GET = (endpoint) => axios.get(endpoint)

const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body)

const PUT = (endpoint, body, headers) => axios.put(endpoint, body, headers)

const DELETE = (endpoint, headers) => axios.delete(endpoint, headers)

export const API = { GET, POST, PUT, DELETE, ENDPOINTS, getHeaders }
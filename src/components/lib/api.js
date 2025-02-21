import axios from 'axios'
import { AUTH } from './auth'
import { baseUrl } from '../../config'

const ENDPOINTS = {
  allProducts: `${baseUrl}/shop`,
  singleProduct: (id) => `${baseUrl}/shop/${id}`,
  createReview: (id) => `${baseUrl}/shop/${id}/reviews`,
  singleReview: (productId, reviewId) => `${baseUrl}/shop/${productId}/reviews/${reviewId}`,

  register: `${baseUrl}/register`,
  login: `${baseUrl}/login`,

  toggleBasketItems: (id) => `${baseUrl}/shop/${id}/basket`,
  basketItems: (userId) => `${baseUrl}/basket/${userId}`,
  deleteBasketItem: (userId, productId) => `${baseUrl}/basket/${userId}/${productId}`,
  clearBasket: () => `${baseUrl}/basket`
}


const getHeaders = () => ({
  headers: {
    authorization: `Bearer ${AUTH.getToken()}`
  }
})


const GET = (endpoint, headers) =>
  headers ? axios.get(endpoint, headers) : axios.get(endpoint)

const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body)

const PUT = (endpoint, body, headers) => axios.put(endpoint, body, headers)

const DELETE = (endpoint, headers) => axios.delete(endpoint, headers)

export const API = { GET, POST, PUT, DELETE, ENDPOINTS, getHeaders }
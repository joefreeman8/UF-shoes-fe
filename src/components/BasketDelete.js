import { useNavigate, useParams } from "react-router-dom"
import { API } from "./lib/api"

const BasketDelete = () => {

  const navigate = useNavigate()
  const { userId, productId } = useParams()



  setTimeout(() => {
    API.DELETE(
      API.ENDPOINTS.deleteBasketItem(userId, productId),
      API.getHeaders(),
      navigate(`/basket/${userId}`)
    )
  }, 1000)



  return (
    <p>.......removing from basket</p>
  )
}

export default BasketDelete
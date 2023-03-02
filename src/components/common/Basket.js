import { Box, Button, Card, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { API } from "../lib/api"
// import { AUTH } from "../lib/auth"

import '../../styles/Basket.scss'

function Basket() {
  const [basket, setBasket] = useState([])
  const [isUpdated, setIsUpdated] = useState(false)

  // const userId = AUTH.getPayload().userId
  const { userId } = useParams()




  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await API.GET(API.ENDPOINTS.basketItems(userId),
          API.getHeaders()
        )
        setBasket(data.basket)
        console.log(data.basket)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
    setIsUpdated(false)
  }, [userId, isUpdated])


  // const deleteItemFromBasket = (e) => {
  //   console.log('target ->', e.target.value)

  //   const arrayOfItemIdsFromBasket = basket.map(items => items._id)

  //   const productId = arrayOfItemIdsFromBasket.forEach(item => {
  //     if (item === e.target.value) {
  //       console.log('its a match ->', item)
  //     }
  //   })
  //   API.DELETE(
  //     API.ENDPOINTS.deleteBasketItem(userId, productId),
  //     API.getHeaders()
  //   )
  //     .then(() => {
  //       setIsUpdated(true)
  //     })
  //     .catch((e) => console.log(e))

  // }



  //   if (productId === e.target.value) {

  // }
  // .catch((e) => console.log(e))



  const getTotal = basket?.reduce((acc, item) => {
    return acc + item.price
  }, 0)

  return (
    <>
      {!!basket?.length ? (
        <Container className="basket-container">
          <Card>
            {basket?.map((item) => (
              <Card sx={{ maxWidth: 400, mb: 4 }} key={item._id}>
                <Typography>{item.name}</Typography>
                <img height={"80px"} width={"80px"} src={item.image} alt={item.name} />
                <Typography>£{item.price}</Typography>
                <Link to={`/basket/${userId}/${item._id}`}>
                  <Button>X</Button>
                </Link>
              </Card>
            ))}
            <Box>
              <Typography>
                Total: £{getTotal.toFixed(2)}
              </Typography>
            </Box>
          </Card>
        </Container>
      ) : (
        <Container className="basket-container">
          <Box className="fail-box">
            <Typography
              fontWeight={'bold'}
            >
              Your cart is currently empty.
            </Typography>
            <Typography>
              Back to the <Link to='/shop'>shop</Link>
            </Typography>
            <img maxheight={500} width={'80%'} src="https://media.giphy.com/media/3o7WTIMJo0rRaZW4ms/giphy.gif" alt="empty cart gif" />
          </Box>
        </Container>
      )}
    </>
  )
}


export default Basket
import { Box, Card, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { API } from "../lib/api"
import { AUTH } from "../lib/auth"

function Basket() {
  const [basket, setBasket] = useState([])

  const userId = AUTH.getPayload().userId

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await API.GET(API.ENDPOINTS.basketItems(userId))
        setBasket(data.basket)
        console.log(data.basket)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [userId])

  return (
    <>
      {!!basket?.length && (
        <Container>
          <Card sx={{ maxWidth: 800 }}>
            {basket?.map((item) => (
              <Box sx={{ maxWidth: 400, mb: 4 }} key={item._id}>
                <Typography>{item.name}</Typography>
                <img height={"80px"} width={"80px"} src={item.image} alt={item.name} />
                <Typography>£{item.price}</Typography>
              </Box>
            ))}
          </Card>
          <Card sx={{ maxWidth: 800 }}>
            <Typography>Total £
              {basket?.reduce((acc, item) => {
                return acc + item.price
              }, 0)}

            </Typography>
          </Card>
        </Container>
      )}
    </>
  )
}

export default Basket
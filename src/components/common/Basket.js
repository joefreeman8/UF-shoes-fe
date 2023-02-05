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
          <Box>
            {basket?.map((item) => (
              <Card sx={{ minWidth: 275, mb: 3 }} key={item._id}>
                <Typography>{item.name}</Typography>
                <img height={"80px"} width={"80px"} src={item.image} alt={item.name} />
                <Typography>£{item.price}</Typography>
              </Card>
            ))}
          </Box>
        </Container>
      )}
    </>
  )
}

export default Basket
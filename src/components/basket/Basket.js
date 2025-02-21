import { Box, Button, Card, Container, Grid, Typography, CardMedia, CardContent } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { API } from "../lib/api"
import { AUTH } from "../lib/auth"

import '../../styles/Basket.scss'

function Basket() {
  const [basket, setBasket] = useState([])
  const [isUpdated, setIsUpdated] = useState(false)
  const { userId } = useParams()
  const user = AUTH.getPayload()

  const capitaliseUsername = user.username.charAt(0).toUpperCase()
  const remainingLetters = user.username.slice(1)
  const username = capitaliseUsername + remainingLetters


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await API.GET(
          API.ENDPOINTS.basketItems(userId),
          API.getHeaders()
        );
        setBasket(data.basket)
      } catch (err) {
        console.log(err)
      }
    };
    getData()
    setIsUpdated(false)
  }, [userId, isUpdated])

  const deleteItemFromBasket = async (e) => {
    try {
      await API.DELETE(
        API.ENDPOINTS.deleteBasketItem(userId, e.target.value),
        API.getHeaders()
      )
      setIsUpdated(true)
    } catch (err) {
      console.log(err)
    }
  }

  const getTotal = basket?.reduce((acc, item) => {
    return acc + item.price
  }, 0)

  const handleCheckout = async () => {
    window.confirm('Thank you for purchasing these shoes')
    try {
      if (basket.length > 0) {
        await API.DELETE(
          API.ENDPOINTS.clearBasket(),
          API.getHeaders()
        )
        setBasket([])
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {!!basket?.length ? (
        <Container
          maxWidth="lg"
          sx={{ mt: 5 }}
        >
          <h1 sx={{ mt: 3 }}>
            {username}'s basket:
          </h1>
          <Box sx={{ display: "flex", justifyContent: "center" }} >
            <Card sx={{ p: 3, width: { xs: "80%", sm: "70%", md: "50%" }, mt: 10 }}>
              <Grid container spacing={3}>
                {basket?.map((item) => (
                  <Grid item xs={12} key={item._id}>
                    <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.name}
                        sx={{ width: 100, height: 100 }}
                      />
                      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", pl: 2 }}>
                        <Typography component="div">
                          <Box fontWeight="bold">{item.name}</Box>
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ flexGrow: 1 }}>
                          <Box>{`£${item.price}`}</Box>
                        </Typography>
                      </CardContent>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        value={item._id}
                        onClick={deleteItemFromBasket}
                      >
                        X
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: 'center',
                  flexDirection: "column"
                }}
              >
                <Typography fontWeight="bold">
                  Total: £{getTotal.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  sx={{ mt: 2 }}
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </Box>
            </Card>
          </Box>
        </Container>
      ) : (
        <Container className="basket-container">
          <Box className="fail-box" sx={{ textAlign: "center" }}>
            <Typography fontWeight="bold" variant="h5" sx={{ mb: 2 }}>
              Your basket is currently empty.
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3 }}>
              Head back to the <Link to="/shop">shop</Link> and start adding
              items to your basket!
            </Typography>
            <img src="https://media.giphy.com/media/3o7WTIMJo0rRaZW4ms/giphy.gif" alt="empty cart gif" />
          </Box>
        </Container>
      )
      }
    </>
  )
}

export default Basket


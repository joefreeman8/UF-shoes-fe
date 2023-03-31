import { Box, Button, Card, Container, Grid, Typography, CardMedia, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../lib/api";

import '../../styles/Basket.scss';

function Basket() {
  const [basket, setBasket] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await API.GET(
          API.ENDPOINTS.basketItems(userId),
          API.getHeaders()
        );
        setBasket(data.basket);
        console.log(data.basket);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    setIsUpdated(false);
  }, [userId, isUpdated]);

  const deleteItemFromBasket = (e) => {
    console.log("target ->", e.target.value);

    API.DELETE(
      API.ENDPOINTS.deleteBasketItem(userId, e.target.value),
      API.getHeaders()
    )
      .then(() => {
        setIsUpdated(true);
      })
      .catch((e) => console.log(e));
  };

  const getTotal = basket?.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  return (
    <>
      {!!basket?.length ? (
        <Container
          maxWidth="lg"
          sx={{ mt: 5 }}
        >
          <h1 sx={{ mt: 3 }}>
            Your Basket
          </h1>
          <Box sx={{ display: "flex", justifyContent: "center" }} >
            <Card sx={{ p: 3, width: "50%", mt: 10, }}>
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
                        <Typography component="div" sx={{ mb: 1 }}>
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
              <Box sx={{ mt: 3, display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: "column" }}>
                <Typography fontWeight="bold">
                  Total: £{getTotal.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  sx={{ mt: 2 }}
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
              Your cart is currently empty.
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


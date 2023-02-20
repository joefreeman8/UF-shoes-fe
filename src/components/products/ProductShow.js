import { useEffect, useState, useMemo } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Container,
  Typography
} from "@mui/material"

import { API } from "../lib/api"
import { AUTH } from "../lib/auth"
import { useAuthenticated } from "../hooks/useAuthenticated"
import ReviewCard from "../reviews/ReviewCard"
import ProductRatings from "./ProductRatings"

import '../../styles/ProductShow.scss'

function ProductShow() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [singleProduct, setSingleProduct] = useState(null)
  const [isUpdated, setIsUpdated] = useState(false)
  const [isLoggedIn] = useAuthenticated()

  const [isAddedToBasket, setIsAddedToBasket] = useState(false)

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleProduct(id))
      .then(({ data }) => {
        setSingleProduct(data)
      })
      .catch(({ message, response }) => {
        console.log(message, response)
      })
    setIsUpdated(false)
  }, [id, isUpdated])

  const goToIndex = () => navigate('/shop')

  const userHasReviewed = useMemo(() => {
    return singleProduct?.reviews
      .map((review) => review.addedBy._id)
      .some((id) => AUTH.isOwner(id))
  }, [singleProduct])


  const toggleBasket = () => {
    API.POST(API.ENDPOINTS.addAndRemoveBasketItems(id),
      {},
      API.getHeaders(),
    )
      .then(({ data }) => {
        const userBasket = data.likedBy.includes(AUTH.getPayload().userId)
        setIsAddedToBasket(userBasket)
      })
  }

  const loginToReviewOrBuy = () => navigate('/login')


  return (
    <>
      <Container maxWidth='lg' sx={{ display: 'flex' }} className='product-show'>
        <Box sx={{ mt: 5 }}>
          <img
            src={singleProduct?.image}
            alt={singleProduct?.name}
          />
        </Box>
        <Box sx={{ mt: 5, ml: 3, width: 450 }}>
          <CardContent>
            <Typography
              variant='h3'
              component='p'
              sx={{ mb: 1 }}
            >
              {singleProduct?.name}
            </Typography>
            <Typography
              variant='subtitle1'
              component='p'
              sx={{ mb: 2, fontSize: 16 }}
            >
              £ {singleProduct?.price}
            </Typography>
            <Typography
              sx={{ mb: 2 }}
            >
              {singleProduct?.description}
            </Typography>
            <ProductRatings
              rating={singleProduct?.avgRating}
            />
          </CardContent>
          <CardActions
            className="card-buttons"
          >
            <Button size="small" onClick={goToIndex}>back to shop</Button>
            {isLoggedIn ? (
              <>
                {!userHasReviewed ? (
                  <Link to={`/shop/${singleProduct?._id}/reviews`}>
                    <Button size="small">review</Button>
                  </Link>
                ) : (
                  <Button size="small" disabled>review</Button>
                )}
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={toggleBasket}
                >
                  {isAddedToBasket ? 'Remove basket' : 'Add to basket'}
                </Button>
              </>
            ) : (
              <>
                <Button size="small" onClick={loginToReviewOrBuy}>review</Button>
                <Button size="small" variant="contained" color="success" onClick={loginToReviewOrBuy}>Add to basket</Button>
              </>
            )}
          </CardActions>
        </Box>
      </Container >
      {
        !!singleProduct?.reviews.length && (
          <Container sx={{ mt: 5 }}>
            <Box className="view-cards-newest-first">
              {singleProduct?.reviews.map((review) => (
                <ReviewCard
                  className="test"
                  key={review._id}
                  text={review.text}
                  rating={review.rating}
                  addedBy={review.addedBy}
                  reviewId={review._id}
                  productId={id}
                  setIsUpdated={setIsUpdated}
                />
              ))}
            </Box>
          </Container>
        )
      }
    </>
  )
}

export default ProductShow
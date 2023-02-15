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
import '../../styles/ProductShow.scss'
import { useAuthenticated } from "../hooks/useAuthenticated"
import ReviewCard from "../reviews/ReviewCard"
import ProductRatings from "./ProductRatings"


function ProductShow() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [singleProduct, setSingleProduct] = useState(null)
  const [isUpdated, setIsUpdated] = useState(false)
  const [isLoggedIn] = useAuthenticated()

  const [isAdded, setIsAdded] = useState(false)

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
        console.log(data)
        setIsAdded(data.likedBy.includes(AUTH.getPayload().userId))
      })

  }


  return (
    <>
      <Container maxWidth='lg' sx={{ display: 'flex' }} className='product-show'>
        <Box sx={{ mt: 5 }}>
          <img src={singleProduct?.image} alt={singleProduct?.name} />
        </Box>
        <Box sx={{ mt: 5 }}>
          <CardContent>
            <Typography variant='h3' component='p'>
              {singleProduct?.name}
            </Typography>
            <Typography variant='h4' component='p'>
              £ {singleProduct?.price}
            </Typography >
            <ProductRatings
              rating={singleProduct?.avgRating}
            />
          </CardContent>
          <CardActions>
            <Button size="small" onClick={goToIndex}>back to shop</Button>
            {isLoggedIn &&
              !userHasReviewed && (
                <Link to={`/shop/${singleProduct?._id}/reviews`}>
                  <Button size="small">review</Button>
                </Link>
              )}

            <Button size="small" onClick={toggleBasket}>
              {isAdded ? 'Remove from basket' : 'Add to basket'}
            </Button>

          </CardActions>
        </Box>
      </Container>
      {!!singleProduct?.reviews.length && (
        <Container>
          <Box>
            {singleProduct?.reviews.map((review) => (
              <ReviewCard
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
      )}
    </>
  )
}

export default ProductShow
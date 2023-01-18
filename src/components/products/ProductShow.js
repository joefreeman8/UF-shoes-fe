import { useEffect, useState } from "react"
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
import '../../styles/ProductShow.scss'
import { useAuthenticated } from "../hooks/useAuthenticated"
import ReviewCard from "../reviews/ReviewCard"


function ProductShow() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [singleProduct, setSingleProduct] = useState(null)
  const [isLoggedIn] = useAuthenticated()

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleProduct(id))
      .then(({ data }) => {
        setSingleProduct(data)
      })
      .catch(({ message, response }) => {
        console.log(message, response)
      })
  }, [id])

  const goToIndex = () => navigate('/shop')


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
          </CardContent>
          <CardActions>
            <Button size="small" onClick={goToIndex}>back to shop</Button>
            {isLoggedIn && (
              <Link to={`/shop/${singleProduct?._id}/reviews`}>
                <Button size="small">review</Button>
              </Link>
            )}
            <Button size="small">Add to Cart</Button>
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
                addedBy={review.addedBy.username}
              />
            ))}
          </Box>
        </Container>
      )}
    </>
  )
}

export default ProductShow
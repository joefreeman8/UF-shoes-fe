import { Box, Button, Container, TextareaAutosize } from "@mui/material"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API } from "../lib/api"
import ProductRatings from "../products/ProductRatings"

import '../../styles/ReviewProduct.scss'


export default function ReviewProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [textValue, setTextValue] = useState('')
  const [rating, setRating] = useState(0)

  const handleChange = (e) => {
    setTextValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await API.POST(API.ENDPOINTS.createReview(id),
        { text: textValue, rating: rating },
        API.getHeaders()
      )
      console.log(`Review given to ${data.name}`)
      navigate(`/shop/${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container className='review-container'>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextareaAutosize
            name='text'
            value={textValue}
            placeholder="Leave your review"
            onChange={handleChange}
            minRows={10}
            style={{ width: 500 }}
          />
        </Box>
        <ProductRatings
          rating={rating}
          setRating={setRating}
        />
        <Button sx={{ mt: 2 }} color="success" variant="contained" type="submit">submit review</Button>
      </form>
    </Container>
  )
}
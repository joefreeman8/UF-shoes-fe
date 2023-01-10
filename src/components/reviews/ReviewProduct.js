import { Box, Button, Container, TextareaAutosize } from "@mui/material"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API } from "../lib/api"
import ProductRatings from "../products/ProductRatings"


export default function ReviewProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [textValue, setTextValue] = useState('')
  const [rating, setRating] = useState(0)

  const handleChange = (e) => {
    setTextValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    API.POST(API.ENDPOINTS.createReview(id),
      { text: textValue, rating: rating },
      API.getHeaders()
    )
      .then(({ data }) => {
        console.log(`Review given to ${data.name}`)
        navigate(`/shop/${id}`)
      })
      .catch((e) => console.log(e))
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Box>
          <TextareaAutosize
            name='text'
            value={textValue}
            placholder="Leave your review"
            onChange={handleChange}
            minRows={10}
            style={{ width: 500 }}
          />
        </Box>
        <ProductRatings
          rating={rating}
          setRating={setRating}
        />
        <Button type="submit">submit review</Button>
      </form>
    </Container>
  )
}
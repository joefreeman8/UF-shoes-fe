import { useState } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextareaAutosize,
  Typography,
} from '@mui/material'

import ProductRatings from '../products/ProductRatings'
import { API } from '../lib/api'
import { AUTH } from '../lib/auth'

export default function ReviewCard({
  text,
  rating,
  addedBy,
  productId,
  reviewId,
  setIsUpdated
}) {

  const [isEditMode, setIsEditMode] = useState(false)
  const [reviewText, setReviewText] = useState(text)
  const [reviewRating, setReviewRating] = useState(rating)

  const toggleEditMode = () => setIsEditMode(!isEditMode)
  const handleReviewTextChange = (e) => setReviewText(e.target.value)

  const saveEditChanges = async () => {
    try {
      if (text !== reviewText || rating !== reviewRating) {
        await API.PUT(
          API.ENDPOINTS.singleReview(productId, reviewId),
          { text: reviewText, rating: reviewRating },
          API.getHeaders()
        )
        toggleEditMode()
        setIsUpdated(true)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const deleteReview = async () => {
    try {
      await API.DELETE(
        API.ENDPOINTS.singleReview(productId, reviewId),
        API.getHeaders()
      )
      setIsUpdated(true)
    } catch (e) {
      console.log(e)
    }
  }

  const Rating = () =>
    isEditMode ? (
      <ProductRatings
        rating={reviewRating}
        size="20px"
        setRating={setReviewRating}
      />
    ) : (
      <ProductRatings
        rating={rating}
        size="20px"
      />
    )

  return (
    <Card sx={{ minWidth: 275, mb: 3 }} className='review-card'>
      <CardContent>
        <Typography
          variant='overline'
          component='h6'
          disabled
        >
          {addedBy.username}
        </Typography>
        {isEditMode ? (
          <TextareaAutosize
            value={reviewText}
            onChange={handleReviewTextChange}
            style={{ width: '100%', height: '50px' }}
          />
        ) : (
          <Typography
            variant='h6'
            component='p'
            fontSize={16}
            gutterBottom
          >
            {text}
          </Typography>
        )}
        <Rating />
      </CardContent>
      {
        (AUTH.isOwner(addedBy._id) || AUTH.getPayload().isAdmin) && (
          <CardActions>
            {AUTH.isOwner(addedBy._id) && (
              <Button color={isEditMode ? 'secondary' : 'success'} onClick={toggleEditMode}>
                {isEditMode ? 'cancel' : 'edit review'}
              </Button>
            )}
            <Button color={isEditMode ? 'success' : 'secondary'} onClick={isEditMode ? saveEditChanges : deleteReview}>
              {isEditMode ? 'save changes' : 'delete review'}
            </Button>
          </CardActions>
        )
      }
    </Card >
  )
}
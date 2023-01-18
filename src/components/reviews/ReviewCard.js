import {
  Card,
  CardContent,
  Typography,
} from '@mui/material'

import ProductRatings from '../products/ProductRatings'

export default function ReviewCard({ text, rating, addedBy }) {

  return (
    <Card sx={{ minWidth: 275, mb: 3 }}>
      <CardContent>
        <Typography>{addedBy}</Typography>
        <Typography>{text}</Typography>
        <ProductRatings
          rating={rating}
          size="20px"
        />
      </CardContent>
    </Card>
  )
}
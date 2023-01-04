import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ name, image, price, id }) {

  const navigate = useNavigate()
  const navigateToProduct = () => navigate(`/shop/${id}`)

  return (
    <Card sx={{ maxWidth: 275, height: 340 }}>
      <CardActionArea onClick={navigateToProduct}>
        <CardContent className='product-centered'>
          <Typography
            gutterBottom
            variant="h6"
            component="p"
            align="center"
            sx={{
              mt: 2,
              minHeight: 50
            }}

          >
            {name}
          </Typography>
          <CardMedia
            component="img"
            image={image}
            alt={name}
            sx={{ mt: 1, height: 200, width: '100%', objectFit: 'contain' }}
          />
          <Typography
            variant="h6"
            align="center"
            sx={{
              minHeight: 60

            }}
          >
            £{price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

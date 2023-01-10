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



    // <>
    //   <h1>ProductShow</h1>
    //   <div>
    //     {product && (
    //       <div key={product._id}>
    //         <h2>{product?.name}</h2>
    //         <p>{product?.type}</p>
    //         <img src={product?.image} alt={product.name} />
    //         <p>£{product?.price}</p>
    //         <div>
    //           <h4>Comments</h4>
    //           {product?.comments.map(comment => (
    //             <div key={comment._id} >
    //               <p><strong>{comment.text}</strong></p>
    //               <p><strong>{comment.rating}</strong></p>
    //               <p><strong>{comment.addedBy}</strong></p>
    //               <p><strong>{comment.createdAt}</strong></p>
    //             </div>
    //           )
    //           )}
    //           <p>{product.comments.text}</p>
    //           <p>{product.comments.rating}</p>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </>
  )
}

export default ProductShow
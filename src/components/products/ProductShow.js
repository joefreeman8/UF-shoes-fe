import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Button, CardActions, CardContent, Container, Typography } from "@mui/material"

import '../../styles/ProductShow.scss'


function ProductShow() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const [singleProduct, setSingleProduct] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/shop/${productId}`)
        setSingleProduct(data)
        console.log({ data })
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [productId])

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
          <Button size="small">review</Button>
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
import { useEffect, useState } from 'react'
import { Container, Grid } from '@mui/material'

import ProductCard from './ProductCard'
import { API } from '../lib/api'
import '../../styles/ProductIndex.scss'

function ProductIndex() {
  const [products, setProducts] = useState([])


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await API.GET(API.ENDPOINTS.allProducts)
        console.log(data)
        setProducts(data)
      } catch (err) {
        console.log(err)
      }

    }
    getData()
  }, [])

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 5 }}
    >
      <h1 className='products-header'>Products</h1>
      <Grid container spacing={4}>
        {products?.map(product => (
          <Grid item xs={6} sm={4} md={3} key={product._id}>
            <ProductCard
              name={product.name}
              image={product.image}
              price={product.price}
              id={product._id}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ProductIndex
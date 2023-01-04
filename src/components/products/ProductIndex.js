import '../../styles/ProductIndex.scss'

import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Grid } from '@mui/material'
import ProductCard from './ProductCard'

function ProductIndex() {
  const [products, setProducts] = useState([])


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/shop/`)
        console.log(data)
        setProducts(data)
      } catch (err) {
        console.log(err)
      }

    }
    getData()
  }, [])

  return (
    <Container maxWidth="lg">
      <h1>Products</h1>
      <Grid container spacing={4}>
        {products?.map(product => (
          <Grid item xs={4} key={product._id}>
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
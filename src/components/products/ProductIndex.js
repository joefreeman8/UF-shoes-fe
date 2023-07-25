import { useEffect, useState, lazy, Suspense } from 'react'
import { Box, Container, Grid, Select, MenuItem } from '@mui/material'

import { API } from '../lib/api'
import '../../styles/ProductIndex.scss'

const ProductCard = lazy(() => import('./ProductCard'))

function ProductIndex() {
  const [products, setProducts] = useState([])
  const [filteredBrands, setFilteredBrands] = useState([])
  const [filters, setFilters] = useState({ brand: 'All' })


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await API.GET(API.ENDPOINTS.allProducts)
        setProducts(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [filters])


  const handleFilterChange = (e) => {
    setFilters({ ...filters, brand: e.target.value })
  }

  // this useEffect is waiting and listening for a change in the filtering. 
  useEffect(() => {
    if (products.length) {
      setFilteredBrands(products.filter(product => {
        return filters.brand === product.brand || filters.brand === 'All'
      }))
    }
  }, [filters, products])

  //removes the duplicates from my brands and puts them in alphabetical order. 
  const brands = [...new Set(products?.map(product => product.brand))].sort()
  brands.unshift('All')


  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 5 }}
    >
      <h1 className='products-header'>Products</h1>
      <Box className='filter-container'>
        <Select id="brand-filter" onChange={handleFilterChange} value={filters.brand}>
          {brands.map(brand => (
            <MenuItem key={brand} value={brand}>{brand}</MenuItem>
          ))}
        </Select>
      </Box>
      <Suspense fallback={<div>Loading...</div>}>
        <Grid container spacing={4}>
          {(filteredBrands.length ? filteredBrands : products).map(product => (
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
      </Suspense>
    </Container >
  )
}

export default ProductIndex
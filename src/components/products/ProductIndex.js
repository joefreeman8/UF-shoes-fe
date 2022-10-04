import '../../styles/ProductIndex.scss'

import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import axios from 'axios'

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
    <>
      <h1>Products</h1>
      <div>
        {products.map(product => (
          <div key={product._id}>
            <Link to={`/shop/${product._id}`} >
              <h2>{product.name}</h2>
              <p>{product.type}</p>
              <img src={product.image} alt={product.name} />
              <p>£{product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductIndex
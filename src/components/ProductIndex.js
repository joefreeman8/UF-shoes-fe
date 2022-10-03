import { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/ProductIndex.scss'

function ProductIndex() {
  const [products, setProducts] = useState([])


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/shop/`)
        console.log(res.data)
        setProducts(res.data)
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
            <h2>{product.name}</h2>
            <p>{product.type}</p>
            <img src={product.image} alt={product.name}/>
            <p>£{product.price}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductIndex
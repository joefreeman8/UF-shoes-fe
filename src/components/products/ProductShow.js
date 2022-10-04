import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"



function ProductShow() {

  const { productId } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/shop/${productId}`)
        setProduct(data)
        console.log({ data })
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [productId])


  return (
    <>
      <h1>ProductShow</h1>
      <div>
        {product && (
          <div key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.type}</p>
            <img src={product.image} alt={product.name} />
            <p>£{product.price}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default ProductShow
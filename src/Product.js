import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const Product = () => {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const { productID } = useParams()

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/products?id=${productID}`)
      setProduct(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return (
      <section className="section section-center">
        <h2>Loading...</h2>
      </section>
    )
  }

  const { fields } = product
  const { id, name, desc, price, images } = fields
  console.log(name)

  return (
    <section className="section section-center">
      <Link to="/" className="link">
        back home
      </Link>
      <div>
        <div className="title">
          <h2>{name}</h2>
          <div className="title-underline"></div>
        </div>
        <article className="single-product" key={id}>
          <img src={images[0].url} alt={name} className="single-product-img" />
          <div>
            <h5>{name}</h5>
            <h5 className="price">${price}</h5>
            <p>{desc}</p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Product

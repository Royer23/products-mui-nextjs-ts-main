'use client'
import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import NewsList from './ui/NewsList'
import ProductsList from './ui/ProductsList'
import { News } from '../../types/News'
import axios from 'axios'
import { Products } from '../../types/Products'

const HomePage: React.FC = () => {
  const [news, setNews] = useState<News[]>([])
  const [products, setProducts] = useState<Products[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    


    const fetchProducts = async () => {
      try {
        const response = await axios.get<Array<Products>>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
        )
        setProducts(response.data)
        setLoading(false)
        
      } catch (error) {
        console.error('Error fetching products:', error)
        setLoading(false)
      }
    }

    fetchProducts()


  }, [])

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Productos
      </Typography>
      <ProductsList products={products} />
    </Container>
  )
}

export default HomePage

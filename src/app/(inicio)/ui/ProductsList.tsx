'use client'
import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
} from '@mui/material'
import Image from "next/legacy/image"
import { useRouter } from 'next/navigation'
import { Products } from '../../../types/Products'

interface ProductsListProps {
  products: Products[]
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  const router = useRouter()

  return (
    <Grid container spacing={2}>
      {products.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card data-testid={`producto-${item.id}`}>
            <CardActionArea
              onClick={(event) => {
                router.push(`/products/${item.id}`)
              }}
            >
              <Image
                src={`https://picsum.photos/200/100?random=${item.id}`}
                alt={item.name}
                width={200}
                height={100}
                layout="responsive"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.price}
                </Typography>
                <Typography variant="body1">{item.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductsList

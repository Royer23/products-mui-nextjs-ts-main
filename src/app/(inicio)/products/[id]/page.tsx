'use client'
import { usePathname, useRouter } from 'next/navigation'
import { WebService } from '../../../../services'
import { Constantes } from '../../../../config'
import React, { useEffect, useState } from 'react'

import { imprimir } from '../../../../utils/imprimir'
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import Image from "next/legacy/image"
import { Icono } from '../../../../components/Icono'
import { Products } from '../../../../types/Products'

const DetalleProducto = () => {
  const pathname = usePathname()

  const pathParts = pathname.split('/')
  const productsId = pathParts[pathParts.length - 1]

  // para las noticias
  const [products, setProducts] = useState<Products>()

  const router = useRouter()

  const obtenerDetalle = async () => {
    const response = await WebService.get({
      url: `${Constantes.baseUrl}/api/products/${productsId}`,
    })
    setProducts(response)
    imprimir(response)
  }

  useEffect(() => {
    if (productsId) {
      obtenerDetalle()
    }
  }, [])

  return products ? (
    <Box >
      <Button
        variant="text"
        color="primary"
        onClick={() => router.back()}
        style={{ marginBottom: '1rem' }}
      >
        <Icono>arrow_back</Icono> Volver Atrás
      </Button>
      <Image
        data-testid={`producto-image-${products.id}`}
        src={`https://picsum.photos/200/100?random=${products.id}`}
        alt={products.name}
        width={800}
        height={400}
        layout="responsive"
      />
      <List>
        <ListItem>
          <ListItemText 
            primary={<Typography data-testid={`producto-name-${products.id}`}
            variant="h5">{products.name}</Typography>}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Typography data-testid={`producto-price-${products.id}`}
              variant="body2" color="text.secondary">
                {products.price}
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="body1">{products.description}</Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
      <Typography variant="h6" style={{ marginLeft: '1rem' }}>
        Cargando Producto...
      </Typography>
    </Box>
  )
}

export default DetalleProducto

import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'
import Image from "next/legacy/image"
import { IconoTooltip } from '../../../../components/botones/IconoTooltip'
import { WebService } from '../../../../services'
import { CustomDialog } from '../../../../components/dialog/CustomDialog'
import { AlertDialog } from '../../../../components/dialog/AlertDialog'
import { Constantes } from '../../../../config'
import { eliminarCookie, leerCookie } from '../../../../utils/cookies'
import { ModalProducts } from './ModalProducts'

export interface Products {
  id?: number
  name: string
  description: string
  price: number
}

const ProductsListAdmin: React.FC = () => {
  // para las noticias
  const [products, setProducts] = useState<Products[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [currentProduct, setCurrentProduct] = useState<Products | null>()
  const [openModalEdicion, setOpenModalEdicion] = useState<boolean>(false)
  const [openAlertaBorrar, setAlertaBorrar] = useState<boolean>(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const token = leerCookie('token')
      const response = await WebService.get({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setProducts(response)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const eliminarPeticion = async (producto: Products) => {
    try {
      const token = leerCookie('token')
      await WebService.delete({
        url: `${Constantes.baseUrl}/api/products/${producto.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  const editarProducto = (producto: Products) => {
    setCurrentProduct(producto)
    setOpenModalEdicion(true)
  }

  const cerrarModal = async () => {
    setCurrentProduct(null)
    setOpenModalEdicion(false)
    await fetchProducts()
  }

  const abrirAlertaBorrar = (producto: Products) => {
    setCurrentProduct(producto)
    setAlertaBorrar(true)
  }

  const aceptarAlertaBorrar = async () => {
    if (!currentProduct) {
      return
    }
    await eliminarPeticion(currentProduct)
    setAlertaBorrar(false)
    await fetchProducts()
  }

  const cerrarAlertaBorrar = () => {
    setAlertaBorrar(false)
  }

  return (
    <>
      <AlertDialog
        isOpen={openAlertaBorrar}
        titulo={'Alerta'}
        texto={`¿Esta seguro de borrar el producto?`}
      >
        <Button variant={'outlined'} onClick={cerrarAlertaBorrar} data-testid="cancelar-eliminar">
          Cancelar
        </Button>
        <Button variant={'contained'} onClick={aceptarAlertaBorrar} data-testid="aceptar-eliminar">
          Aceptar
        </Button>
      </AlertDialog>
      <CustomDialog
        isOpen={openModalEdicion}
        handleClose={cerrarModal}
        title={'Editar producto'}
      >
        <ModalProducts  producto={currentProduct} handleClose={cerrarModal} />
      </CustomDialog>
      <Grid container sx={{ pb: 2 }}>
        <Grid item xs={6} sm={6} md={6}>
          Aquí puedes gestionar la aplicación
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'end'}
            flexDirection={'row'}
          >
            <Button
              data-testid="agregar-producto"
              variant={'contained'}
              onClick={() => {
                setOpenModalEdicion(true)
              }}
            >
              Agregar
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {products.map((item) => (
          <Grid item xs={12} sm={6} md={6} key={item.id}>
            <Card>
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
              <CardActions>
                <Grid container flexDirection={'row'} alignItems={'end'}>
                  <Grid item>
                    <Box
                      display={'flex'}
                      justifyContent={'end'}
                      flexDirection={'row'}
                    >
                      <IconoTooltip
                        titulo={'editar'}
                        icono={'edit'}
                        accion={() => {
                          editarProducto(item)
                        }}
                        name={'editar'}
                        id={`editar-producto-${item.id}`}
                      />
                      <IconoTooltip
                        titulo={'eliminar'}
                        icono={'delete'}
                        color={'error'}
                        accion={() => {
                          abrirAlertaBorrar(item)
                        }}
                        name={'eliminar'}
                        id={`eliminar-producto-${item.id}`}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default ProductsListAdmin

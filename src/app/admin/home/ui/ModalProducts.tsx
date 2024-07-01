// @flow
import Box from '@mui/material/Box'
import { Button, DialogContent, Grid, Typography } from '@mui/material'
import { FormInputText } from '../../../../components/form'
import ProgresoLineal from '../../../../components/progreso/ProgresoLineal'
import { useForm } from 'react-hook-form'
import { eliminarCookie, leerCookie } from '../../../../utils/cookies'
import { WebService } from '../../../../services'
import { imprimir } from '../../../../utils/imprimir'
import { useState } from 'react'
import { Products } from './ProductsListAdmin'

type Props = {
  producto: Products | null | undefined
  handleClose: () => void
}

export const ModalProducts = ({ producto, handleClose }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { handleSubmit, control } = useForm<Products>({
    defaultValues: {
      id: producto?.id,
      name: producto?.name,
      description: producto?.description,
      price: producto?.price,
    },
  })

  async function crearOActualizar(producto: Products) {
    try {
      setLoading(true)
      const token = leerCookie('token')
      producto.price=parseFloat(producto.price+"");
      console.log(producto)
      if (producto.id) {
        
        const response = await WebService.patch({
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${producto.id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: producto,
        })
        console.log(response)
      } else {
        const response = await WebService.post({
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: producto,
        })
        console.log(response)
      }
    } catch (error) {
      imprimir(error)
    } finally {
      setLoading(false)
      handleClose()
    }
  }

  return (
    <DialogContent>
      <Grid container direction={'column'} justifyContent="space-evenly">
        <form onSubmit={handleSubmit(crearOActualizar)}>
          <Grid item xs={12} sm={12} md={12}>
            <FormInputText
              id={'titulo'}
              control={control}
              name="name"
              label="Título"
              size={'medium'}
              labelVariant={'subtitle1'}
              disabled={loading}
              rules={{ required: 'Este campo es requerido' }}
            />
          </Grid>
          
          <Box sx={{ mt: 1, mb: 1 }}></Box>
          <Grid item xs={12} sm={12} md={12}>
            <FormInputText
              id={'description'}
              control={control}
              name="description"
              label="Descripción"
              size={'medium'}
              rows={5}
              multiline
              labelVariant={'subtitle1'}
              disabled={loading}
              rules={{
                required: 'Este campo es requerido',
                minLength: {
                  value: 3,
                  message: 'Mínimo 3 caracteres',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormInputText
              id={'price'}
              control={control}
              name="price"
              label="Precio"
              size={'medium'}
              labelVariant={'subtitle1'}
              disabled={loading}
              rules={{ required: 'Este campo es requerido',
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: 'El precio debe ser un número válido con hasta dos decimales',
                },
               }}
              
            />
          </Grid>
          <Box sx={{ mt: 0.5, mb: 0.5 }}>
            <ProgresoLineal mostrar={loading} />
          </Box>
          <Box sx={{ height: 15 }}></Box>
          <Button
            data-testid="guardar-producto"
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            <Typography sx={{ fontWeight: '600' }}>Guardar</Typography>
          </Button>
        </form>
      </Grid>
    </DialogContent>
  )
}

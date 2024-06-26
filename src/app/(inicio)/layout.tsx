'use client'

import React, { PropsWithChildren } from 'react'
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material'
import Link from 'next/link'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            style={{ flexGrow: 1 }}
            color={'text.primary'}
          >
            Mi Aplicación de Productos
          </Typography>
          <Button color="primary" component={Link} href="/">
            Inicio
          </Button>
          
          <Button data-testid="ingresar" color="primary" component={Link} href="/login">
            Ingresar
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ p: 2 }}>{children}</Container>
    </>
  )
}

export default Layout

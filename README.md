# Demo - Aplicación de Productos

Una aplicación de productos construida con Next.js, TypeScript y Material-UI, utilizando el App Router para la renderización del lado del servidor (SSR) y la revalidación de páginas desde el backend.

## Características

- Renderización del lado del servidor (SSR) para una carga rápida y SEO optimizado.
- Actualización periódica de noticias en el cliente.
- Revalidación de páginas desde el backend.
- Uso de Material-UI para una interfaz de usuario moderna y responsiva.
- Uso de imágenes optimizadas con `next/image`.

## Estructura del Proyecto

```plaintext
my-products-app/
├── public/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   └── products/
│   │   │       └── route.ts
│   │   ├── revalidate/
│   │   │   └── route.ts
│   │   └── page.tsx
│   ├── components/
│   │   └── ProductsList.tsx
│   ├── styles/
│   ├── types/
│   │   └── Products.ts
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Configuración del Proyecto

### Requisitos

- Node.js
- npm o yarn

### Instalación

1. Clona el repositorio:

   ```bash
   git clone git@github.com:Royer23/products-mui-nextjs-ts.git
   ```

2. Instala las dependencias:

   ```bash
   cd products-mui-nextjs
   npm install
   # o
   yarn install
   ```

3. Crea un archivo `.env.local` en la raíz del proyecto y añade la siguiente variable:

   ```plaintext
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

### Ejecución en Desarrollo

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:8080](http://localhost:8080) en tu navegador para ver la aplicación.

### Configuración de Imágenes

Asegúrate de que tu archivo `next.config.js` permite la carga de imágenes desde "picsum.photos":

```javascript
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['picsum.photos'],
  },
}

module.exports = nextConfig
```


### Obtener Noticias

Endpoint: `/api/products`

Método: `GET`

Descripción: Devuelve un array de objetos de prodcutos.

## Componentes

### Componente `ProductsList`

Ubicación: `src/app/components/ProductsList.tsx`

Descripción: Renderiza una lista de productos en formato de tarjetas.

### Página Principal

Ubicación: `src/app/page.tsx`

Descripción: Renderiza la página principal con productos utilizando SSR y actualización periódica en el cliente.

### Página "Acerca de"

Ubicación: `src/app/about/page.tsx`

Descripción: Renderiza una página sencilla con información sobre la aplicación.

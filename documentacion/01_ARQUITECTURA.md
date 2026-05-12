# Arquitectura del Proyecto (Next.js 15 App Router)

El prototipo utiliza los estándares de Next.js **App Router**, priorizando Server Components e interactividad granular a través de Client Components donde sea estrictamente necesario.

## Estructura de Directorios

```text
/ (Raíz del proyecto)
 ├── /app                   # Directorio base del enrutamiento
 │   ├── layout.tsx         # Contiene <html> y Navbar global/Footer/Toast container
 │   ├── globals.css        # Core del Sistema de Diseño y tokens CSS
 │   ├── page.tsx           # Landing page (Ruta: /)
 │   ├── /cart              # Carpeta de carrito
 │   │   └── page.tsx       # Vista detallada de compra (Ruta: /cart)
 │   └── /products          # Carpeta de Catálogo
 │       ├── page.tsx       # Grilla de productos (Ruta: /products)
 │       └── /[slug]        # Rutas dinámicas
 │           └── page.tsx   # Detalle aislado de un producto (Ruta: /products/...)
 ├── /components            # UI reutilizable
 │   ├── Header.tsx         # Navegación principal (Client Component con hidratación selectiva)
 │   ├── Footer.tsx         # Footer general de la marca
 │   ├── ProductCard.tsx    # Card visual (incluye iteración rápida de añadir/carrito)
 │   ├── PageTransition.tsx # Contenedor Framer Motion 
 │   └── ToastContainer.tsx # Capa visual que pinta las alertas de `toast-store`
 ├── /lib                   # Lógica de negocio, estado y servicios externos
 │   ├── data.ts            # Fuente centralizada de objetos (Mocks de Ropa)
 │   ├── store.ts           # Motor de Zustand (Carrito persistente)
 │   ├── toast-store.ts     # Manejador del sistema de notificaciones de la UI
 │   └── supabase.ts        # Archivo inicial de configuración para BaaS (Supabase)
 ├── /public                # Recursos estáticos
 │   └── /products          # Imágenes web de los componentes (shirts, dresses...)
 └── package.json           # Dependencias y scripts
```

## Patrones de Desarrollo Importantes

**1. Interacción en el Cliente ("use client")**
Puesto que se necesita CSS modular condicionado a estados (`useState`, `useEffect`), el proyecto emplea directivas de cliente en la parte superior de las rutas principales e interactivos (Páginas, Card de Producto, Carrito, Header). 

**2. Prevención de Mismatches de Hidratación**
El proyecto contiene directrices de `suppressHydrationWarning` en la etiqueta `<html>` de `layout.tsx` como prevención de inyectores HTML de terceros, y usa la condicional `mounted` en el `Header` para leer del `localStorage`.

**3. "Central Source of Truth" de la Información**
En lugar de repetir diccionarios o `JSONS` en cada página web, `lib/data.ts` retiene la fuente singular de datos mock, facilitando su futura transformación hacia queries/fetch llamadas a un backend (ej: Supabase o API de Stripe).

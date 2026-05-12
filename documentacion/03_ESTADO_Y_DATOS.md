# Gestión de Estado, Datos y Persistencia

## El Ecosistema "Zustand"

Este prototipo usa `Zustand` como su gestor global de estados (state-manager), remplazando efectivamente al complejo Boilerplate de Redux. Tenemos dos Stores activos en el `lib/`:

### 1. `store.ts` (Carrito)
Tiene el propósito principal de mantener, persistir en disco y actualizar los datos financieros de la orden de un usuario.

**Características:**
- **Local Storage persistente**: A través de `persist()`, todo lo que el usuario añade se vincula bajo la llave local "aura-cart-storage". Reiniciar el equipo no borra la canasta de compras.
- **Evaluación Estricta Múltiple:** El store verifica duplicidad leyendo y uniendo 3 métricas claves: `Id de Producto` + `Talla` + `Color`. (Para así evitar que un usuario combine tallas en una misma tarjeta).
- **Cálculos Vivos (`get()`)**: Calcula en tiempo real las cantidades sumadas para la insignia flotante del Header, así como los Sub-totales.

### 2. `toast-store.ts` (Notificaciones)
Maneja las alertas (pequeñas píldoras informativas) generadas al hacer una advertencia o confimar un éxito en pantalla (Ejemplo: "Por favor selecciona una talla").

**Características:**
- **Autodestrucción por Timeout:** Inserta en el arreglo global un registro con ID generada al azar y a los 3000ms lo destruye, lo que resulta en una alarma que desaparece sola.

## Flujo de Datos Mock (El Catálogo)

Toda información de producto vive en `lib/data.ts`. La estructura base define un `Product`:

```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  slug: string;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
}
```

- En las rutas del catálogo (`/products`), los componentes importan y llaman un `.map`, segmentando mediante los atributos "category".
- En las rutas profundas (`/products/[slug]`), el sistema intercepta la variable de la URL (a través del gancho estándar de Params) y hace una interpolación por similitud llamando `ALL_PRODUCTS.find((p) => p.slug === slug)`. 

## Integración con Backend Creada (Supabase)
Si bien el Mocking está sirviendo propósitos prototipados, la conexión a **Supabase** ha sido provista dentro de `lib/supabase.ts`. Un futuro `createClient()` estará amarrado a `NEXT_PUBLIC_SUPABASE_URL` en las variables de entorno para recibir órdenes reales de compra y poblar el inventario desde Tablas Relacionales PostgreSQL.

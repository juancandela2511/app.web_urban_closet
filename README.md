# FASHION STORE: Prototipo E-Commerce Premium

Este proyecto es un **prototipo de alta fidelidad** para una tienda de ropa elegante y minimalista. Está construido pensando en la escalabilidad técnica y el impacto visual, logrando una experiencia rápida y responsiva mediante tecnologías modernas de frontend.

## 🚀 Tecnologías Principales

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Estilos**: CSS puro implementando variables globales y Glassmorphism (Sin Tailwind).
- **Diseño UI/UX**: Sistema de diseño con tipografía unificada (`Inter`), barra de navegación sticky expansible, tema claro/oscuro dinámico.
- **Gestor de Estado Global**: Zustand + Persistencia Local (para el Carrito y Toasts).
- **Animaciones**: Framer Motion (Transiciones fluidas de página y alertas emergentes).
- **Iconografía**: Lucide-React.
- **Backend (Inicializado)**: Cliente de Supabase configurado.

## 📂 Visión Rápida de Funciones (Actuales)
1. **Landing Page Editorial**: Estéticamente limpia, enfocada en la ropa.
2. **Catálogo Dinámico (`/products`)**: Filtrado funcional de prendas.
3. **Detalles Dinámicos (`/products/[slug]`)**: Selección de Talla, Color, y adición al carrito validada.
4. **Carrito de Compras (`/cart`)**: Cálculo en vivo de costos (Subtotal, costo de envío condicional) y manipulación de artículos (+, -, eliminar).
5. **Ajustes y Retroalimentación UI**: Buscador en panel superior oculto/mostrado dinámicamente, cambio de Modo (oscuro/claro) y notificaciones tipo "Toast".

## 📚 Documentación Detallada

Para comprender la arquitectura y los fundamentos de diseño del proyecto, se recomienda revisar la carpeta `/documentacion`:

- [01_ARQUITECTURA.md](./documentacion/01_ARQUITECTURA.md)
- [02_DISENO_Y_COMPONENTES.md](./documentacion/02_DISENO_Y_COMPONENTES.md)
- [03_ESTADO_Y_DATOS.md](./documentacion/03_ESTADO_Y_DATOS.md)

## 🏃 Instrucciones de Ejecución

1. Clona el repositorio e ingresa a la carpeta raz:
   ```bash
   cd "proyecto Juan Sebastian"
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el entorno de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador preferido.

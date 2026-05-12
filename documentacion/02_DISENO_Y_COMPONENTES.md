# Diseño y UI Components (FASHION)

El diseño UI ha sido conceptualizado bajo los estándares del "High-End E-Commerce Minimalist". Evita la saturación, utiliza fuentes limpias y delega el protagonismo a las fotografías.

## 🎨 Modulamiento CSS y Tokens

Hemos optado por no depender de frameworks engorrosos de utilidad (como Tailwind) en este prototipo, decidiendo construir el núcleo de UI con **CSS puro** a través de **Variables CSS Globales**.

`app/globals.css`
El motor estético del sitio habita aquí:

1. **Variables de Color Puras:** Todo código duro (hexa, rgba) está mapeado a variables (`--bg-primary`, `--fg-primary`) para facilitar el desarrollo cruzado entre temas (Claro/Oscuro).
2. **Cristal y Desvanecido:** Componentes como `Header` logran su estado dinámico con una variable global llamada `--glass` emparejada con un desenfoque de fondo `-webkit-backdrop-filter`.
3. **Tipografía Unificada:** Se emplea `Inter` a través de toda la aplicación, manipulando jerarquías y peso tipográfico (font-weight), logrando estética moderna tipo Apple/Balenciaga.

## ✨ Micro-interacciones

El proyecto incluye elementos que reaccionan de manera sofisticada a las decisiones del usuario:

- **Efecto Zoom de Imágenes**: Usado extensamente en `ProductCard`. Al hacer 'hover' sobre una tarjeta, la imagen (con un contenedor absoluto y `overflow: hidden`) hace scale hasta 1.05.
- **Scroll del Header**: Mediante el rastreo de `window.scrollY` y el evento `scroll`, el `Header` muta al bajar 20 píxeles, encogiéndose desde 80px hacia 70px e implementando el fondo `--glass`.
- **Selector Inteligente de Tallas y Colores**: Usa bordes contrastantes de var(--accent) para señalar el "focus" en la página de producto individual.
- **Transiciones Envolventes**: Envolver la caja principal dentro de `PageTransition` (`framer-motion`) permite un deslizado suave y sutil del canal `y` al cambiar de ruta.

## ⚙️ Estilos Adhesivos - Scoped CSS-in-JS (Styled JSX)

Se utilizan etiquetas `<style jsx>{...}</style>` localizadas directo en los componentes (como `Header`, `Footer`, `ProductCard` y las `pages`). Esto previene el sangrado de clases; por ejemplo, el `.hero-description` es inaccesible desde otra página distinta previniendo choques estilísticos futuros.

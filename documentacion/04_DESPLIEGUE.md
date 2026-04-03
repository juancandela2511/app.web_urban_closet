# Guía Completa de Despliegue para Producción

Para llevar el proyecto "FASHION" de un entorno local de desarrollo (localhost) hacia un entorno público (Producción), es necesario conectar diversas piezas de la infraestructura: Base de Datos, Autenticación, Pasarela de Pagos (Futuro) y el alojamiento Frontend.

Esta guía cubre todo el ciclo de vida del despliegue.

---

## 1. Prerrequisitos

Asegúrate de tener cuentas creadas en las siguientes plataformas:
- **GitHub / GitLab / Bitbucket**: Para alojar el código fuente.
- **Vercel**: Para hospedar la aplicación web Next.js (Hosting Serverless).
- **Supabase**: Para la Base de Datos PostgreSQL y Autenticación.
- **Stripe** *(Opcional en esta fase)*: Para procesar pagos reales.

---

## 2. Configuración del Backend (Supabase)

Antes de subir el código, la base de datos pública debe estar lista para recibir consultas.

1. Ingresa a tu panel de **Supabase** y haz clic en "New Project".
2. Asigna un nombre (Ej. *Fashion Store DB*), una contraseña fuerte para la base de datos y elige la región más cercana a tus clientes principales.
3. Dirígete a **Project Settings > API**. Ahí encontrarás dos claves esenciales:
   - `Project URL`
   - `Project API Keys` (La llave *anon / public*).
4. **Creación de Tablas (SQL Editor):**
   Para reemplazar `lib/data.ts` con datos reales, ejecuta los siguientes comandos en el SQL Editor de Supabase:
   
   ```sql
   -- Crear tabla de productos
   CREATE TABLE products (
       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
       name TEXT NOT NULL,
       price DECIMAL(10, 2) NOT NULL,
       image TEXT NOT NULL,
       category TEXT NOT NULL,
       slug TEXT UNIQUE NOT NULL,
       description TEXT
   );

   -- Políticas de Seguridad (RLS)
   -- Permitir lectura pública de productos
   ALTER TABLE products ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Allow public read access" ON products FOR SELECT USING (true);
   ```

---

## 3. Configuración Local y Preparación

Una vez que Supabase está configurado, asegúrate de que el código funciona localmente simulando el entorno de producción.

1. Crea o modifica el archivo `.env.local` en la raíz de tu proyecto:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_project_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
   ```
2. (Opcional) Ejecuta una compilación local para prever errores de Vercel:
   ```bash
   npm run build
   ```
   Si el compilado finaliza con corrección (marcas verdes), el código es seguro para subir.

3. Sube todos los cambios (`git commit` y `git push`) a tu repositorio central.

---

## 4. Despliegue en Vercel (Frontend & Serverless)

La arquitectura Serverless de Vercel es ideal para lanzar y escalar aplicaciones Next.js.

1. Inicia sesión en [Vercel](https://vercel.com/dashboard) y presiona **Add New... > Project**.
2. Vincula tu proveedor Git y busca el repositorio del proyecto FASHION. Da clic en **Import**.
3. Asegúrate de configurar la sección **Environment Variables** antes de desplegar. Añade exactamente las mismas llaves del archivo `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Pulsa **Deploy**.
5. Vercel comenzará a correr los scripts de *Build*. Tardará 1-3 minutos. Al finalizar, te proveerá de una URL viva encriptada con SSL (Ej: `fashion-store.vercel.app`).

---

## 5. Configuración de Dominio Personalizado

La URL provista por Vercel es una subdirección. Para utilizar tu marca propia (Ej. `www.tu-marca-fashion.com`):

1. Dentro del panel de tu proyecto en Vercel, entra a **Settings > Domains**.
2. Ingresa el nombre de dominio que has comprado previamente (ej. Hostinger, GoDaddy, Namecheap).
3. Vercel te proporcionará dos configuraciones DNS a realizar en el panel de tu registrador de dominio:
   - **Registro A**: Apuntando a la IP `76.76.21.21`.
   - **Registro CNAME**: Para `www`, apuntando a `cname.vercel-dns.com`.
4. Tras configurar tu registrador, espera a que Vercel verifique (puede tomar desde minutos hasta horas según la propagación DNS).

---

## 6. Fase Futura: Checkout y Stripe (Webhooks)

El actual carrito redirecciona una orden de compra vacía. Para procesar transacciones vivas deberás ejecutar los siguientes pasos en una actualización futura:

1. **Stripe Dashboard**: Crear la cuenta y obtener las claves:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (Cliente)
   - `STRIPE_SECRET_KEY` (Solo Servidor)
2. **Webhooks**: Configurar un "Endpoint Webhook" en Stripe, apuntando a `https://www.tu-marca-fashion.com/api/webhooks/stripe`.
   - Obtendrás un `STRIPE_WEBHOOK_SECRET`. Configúralo en Vercel *Environment Variables*.
3. **Manejo de rutas de API**: Asegurarte de que al finalizar el webhook (confirmación de cobro), Node.js mande una ejecución a la base de datos de Supabase insertando la "Orden de Compra Definitiva" mediante la clave privada de servicio: `SUPABASE_SERVICE_ROLE_KEY`.

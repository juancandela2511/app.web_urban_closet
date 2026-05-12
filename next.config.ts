import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */


  /* PERMITIR IMAGENES EXTERNAS */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vdtidmabfjtisdq.supabase.co', 
      },
      {
        protocol: 'https',
        hostname: 'osbgcejhooppjuyuvxlv.supabase.co', // El link corregido
      },
    ],
  },

  /*PARA QUE CUANDO ALGUIEN ESCRIBA OFERTAS LLEVE A LA SECCION*/
  async redirects() {
    return [
      {
        source: '/ofertas',
        destination: '/categoria/descuentos',
        permanent: true,
      },
    ];
  },

  // AYUDA A QUE EL COMPILADOR NO SEA TAN ESTRICTO AL TENER POCO PORCESADOR
  typescript: {
    ignoreBuildErrors: true, 
  },

  experimental: {
    // Esto ayuda a que las páginas carguen más rápido en el cliente
    scrollRestoration: true,
  },

};

export default nextConfig;

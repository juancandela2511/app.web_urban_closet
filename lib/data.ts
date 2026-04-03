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

export const ALL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Camisa de Lino Minimalista super gay",
    price: 380000,
    image: "/products/shirt.png",
    category: "Sobre",
    slug: "camisa-lino-minimalista",
    description: "Una camisa de lino de corte recto, ideal para climas cálidos y ocasiones casuales sofisticadas. Textura suave y transpirable.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blanco Crema", hex: "#f5f5f5" },
      { name: "Arena", hex: "#d2b48c" },
      { name: "Azul Pálido", hex: "#add8e6" }
    ]
  },
  {
    id: "2",
    name: "Vestido de Seda Champagne",
    price: 850000,
    image: "/products/dress.png",
    category: "Vestidos",
    slug: "vestido-seda-champagne",
    description: "Vestido largo de seda con acabado satinado. Un diseño fluido que realza la elegancia natural para eventos nocturnos.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Champagne", hex: "#fad6a5" },
      { name: "Negro", hex: "#121212" }
    ]
  },
  {
    id: "3",
    name: "Pantalón de Lana Sastre",
    price: 520000,
    image: "/products/trousers.png",
    category: "Pantalones",
    slug: "pantalon-lana-sastre",
    description: "Pantalón de lana con corte sastre y pinzas frontales. Perfecto para un look profesional impecable y cómodo.",
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Gris Carbón", hex: "#36454f" },
      { name: "Azul Marino", hex: "#000080" }
    ]
  },
  {
    id: "4",
    name: "Blazer Estructurado Negro",
    price: 950000,
    image: "/products/shirt.png",
    category: "Chaquetas",
    slug: "blazer-estructurado-negro",
    description: "Blazer de corte estructurado con solapas clásicas. Una pieza esencial en cualquier guardarropa de lujo.",
    sizes: ["S", "M", "L"],
    colors: [{ name: "Negro", hex: "#121212" }]
  },
  {
    id: "5",
    name: "Falda Midi Plisada",
    price: 420000,
    image: "/products/dress.png",
    category: "Vestidos",
    slug: "falda-midi-plisada",
    description: "Falda midi con plisado soleil que genera un movimiento elegante al caminar. Tejido ligero y versátil.",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Marfil", hex: "#fffff0" },
      { name: "Verde Bosque", hex: "#228b22" }
    ]
  },
  {
    id: "6",
    name: "Suéter de Cachemira",
    price: 680000,
    image: "/products/trousers.png",
    category: "Tejidos",
    slug: "sueter-cachemira",
    description: "Suéter de cachemira 100% premium. Calidez extrema y suavidad incomparable para los días más frescos.",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Camel", hex: "#c19a6b" },
      { name: "Gris Melange", hex: "#bebebe" }
    ]
  }
];

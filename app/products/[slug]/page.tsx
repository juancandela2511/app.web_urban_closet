"use client";

import { use, useState } from "react";
import { ALL_PRODUCTS, Product } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { ShoppingBag, ChevronLeft, Check } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { useToastStore } from "@/lib/toast-store";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  const addItem = useCartStore((state) => state.addItem);
  const addToast = useToastStore((state) => state.addToast);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0].name || "");
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="error-page">
        <Header />
        <div className="container error-content">
          <h1>Producto no encontrado</h1>
          <Link href="/products" className="back-link">Volver al catálogo</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast("Por favor selecciona una talla", "info");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });

    addToast(`${product.name} añadido al carrito`);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="product-page-container">
      <Header />
      
      <main className="product-detail container">
        <Link href="/products" className="back-btn">
          <ChevronLeft size={20} /> Volver al catálogo
        </Link>

        <div className="product-layout">
          {/* Gallery Section */}
          <div className="product-gallery">
            <div className="main-image premium-shadow">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="product-info">
            <span className="product-category">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">${product.price.toLocaleString('es-CO')}</p>
            
            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Size Selector */}
            <div className="selector-group">
              <div className="selector-header">
                <span className="selector-label">Talla: {selectedSize}</span>
                <button className="size-guide">Guía de tallas</button>
              </div>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button 
                    key={size}
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="selector-group">
              <span className="selector-label">Color: {selectedColor}</span>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button 
                    key={color.name}
                    className={`color-btn ${selectedColor === color.name ? "active" : ""}`}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    style={{ '--color-hex': color.hex } as any}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="product-actions">
              <button 
                className={`add-btn ${isAdded ? "success" : ""}`}
                onClick={handleAddToCart}
                disabled={isAdded}
              >
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.span 
                      key="added"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="btn-content"
                    >
                      <Check size={20} /> Añadido
                    </motion.span>
                  ) : (
                    <motion.span 
                      key="add"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="btn-content"
                    >
                      <ShoppingBag size={20} /> Añadir al Carrito
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
            
            <div className="product-meta">
              <p>Envío gratuito en compras superiores a $500.000</p>
              <p>Devoluciones gratuitas en un plazo de 30 días</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .product-page-container {
          padding-top: var(--header-height);
          background: var(--bg-primary);
        }

        .product-detail {
          padding-top: 2rem;
          padding-bottom: 8rem;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--fg-secondary);
          margin-bottom: 3rem;
          transition: color 0.3s ease;
        }

        .back-btn:hover {
          color: var(--fg-primary);
        }

        .product-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 6rem;
        }

        .main-image {
          position: relative;
          aspect-ratio: 3/4;
          width: 100%;
          border-radius: 4px;
          overflow: hidden;
          background: var(--bg-secondary);
        }

        .product-info {
          display: flex;
          flex-direction: column;
        }

        .product-category {
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          font-size: 0.8rem;
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .product-title {
          font-size: 3.5rem;
          margin-bottom: 1rem;
        }

        .product-price {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--fg-primary);
          margin-bottom: 2.5rem;
          font-weight: 400;
        }

        .product-description {
          font-size: 1.1rem;
          color: var(--fg-secondary);
          line-height: 1.8;
          margin-bottom: 3rem;
          max-width: 500px;
        }

        .selector-group {
          margin-bottom: 2.5rem;
        }

        .selector-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .selector-label {
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05rem;
        }

        .size-guide {
          font-size: 0.8rem;
          text-decoration: underline;
          color: var(--fg-secondary);
        }

        .size-options {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .size-btn {
          width: 54px;
          height: 54px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .size-btn:hover {
          border-color: var(--fg-primary);
        }

        .size-btn.active {
          background: var(--fg-primary);
          color: var(--bg-primary);
          border-color: var(--fg-primary);
        }

        .color-options {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .color-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background-color: var(--color-hex);
          position: relative;
          transition: transform 0.3s ease;
        }

        .color-btn.active {
          transform: scale(1.15);
          box-shadow: 0 0 0 2px var(--bg-primary), 0 0 0 4px var(--accent);
        }

        .product-actions {
          margin-top: 2rem;
          margin-bottom: 3rem;
        }

        .add-btn {
          width: 100%;
          background: var(--fg-primary);
          color: var(--bg-primary);
          padding: 1.5rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .add-btn:hover:not(:disabled) {
          background: var(--accent);
          transform: translateY(-2px);
        }

        .add-btn.success {
          background: #2e7d32;
          cursor: default;
        }

        .btn-content {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .product-meta {
          border-top: 1px solid var(--border);
          padding-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          font-size: 0.85rem;
          color: var(--fg-secondary);
        }

        @media (max-width: 1100px) {
          .product-layout {
            gap: 3rem;
          }
          .product-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 992px) {
          .product-layout {
            grid-template-columns: 1fr;
          }
          .product-detail {
            max-width: 600px;
            margin: 0 auto;
          }
          .main-image {
            aspect-ratio: 4/5;
          }
        }
      `}</style>
    </div>
  );
}

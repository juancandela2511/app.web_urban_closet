"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

import { ALL_PRODUCTS } from "@/lib/data";

const CATEGORIES = ["Todos", "Sobre", "Vestidos", "Pantalones", "Chaquetas", "Tejidos"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProducts = activeCategory === "Todos" 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="catalog-container">
      <Header />
      
      <main className="catalog-content container">
        <header className="catalog-header">
          <h1 className="catalog-title">Nuestro Catálogo</h1>
          <p className="catalog-count">{filteredProducts.length} Piezas encontradas</p>
        </header>

        <section className="catalog-filters">
          <div className="filter-list">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .catalog-container {
          padding-top: var(--header-height);
          background: var(--bg-primary);
          min-height: 100vh;
        }

        .catalog-content {
          padding-top: 4rem;
          padding-bottom: 8rem;
        }

        .catalog-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .catalog-title {
          font-size: 3.5rem;
          margin-bottom: 1rem;
        }

        .catalog-count {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--fg-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1rem;
        }

        .catalog-filters {
          display: flex;
          justify-content: center;
          margin-bottom: 5rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1.5rem;
        }

        .filter-list {
          display: flex;
          gap: 2.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          scrollbar-width: none; /* Firefox */
        }

        .filter-list::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }

        .filter-btn {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          font-weight: 500;
          color: var(--fg-secondary);
          position: relative;
        }

        .filter-btn::after {
          content: '';
          position: absolute;
          bottom: -1.6rem;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .filter-btn.active {
          color: var(--fg-primary);
        }

        .filter-btn.active::after {
          transform: scaleX(1);
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4rem 3rem;
        }

        @media (max-width: 992px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .catalog-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 600px) {
          .product-grid {
            grid-template-columns: 1fr;
          }
          .filter-list {
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

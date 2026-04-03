"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

import { ALL_PRODUCTS } from "@/lib/data";

const FEATURED_PRODUCTS = ALL_PRODUCTS.slice(0, 3);

export default function Home() {
  return (
    <div className="home-container">
      <Header />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <span className="hero-subtitle">Nueva Colección 2026</span>
          <h1 className="hero-title">Elegancia en cada detalle</h1>
          <p className="hero-description">
            Descubre nuestra exclusiva selección de prendas diseñadas para destacar tu esencia personal.
          </p>
          <div className="hero-actions">
            <Link href="/products" className="btn-primary">
              Explorar Colección <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="hero-image-wrapper premium-shadow">
            <Image 
              src="/hero.png" 
              alt="Editorial de Moda Premium" 
              fill 
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured container">
        <div className="section-header">
          <h2 className="section-title">Piezas Destacadas</h2>
          <Link href="/products" className="view-all">Ver todo</Link>
        </div>
        
        <div className="product-grid">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .home-container {
          min-height: 100vh;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          min-height: 100vh;
          align-items: center;
          padding-top: var(--header-height);
        }

        .hero-content {
          padding-right: 4rem;
          animation: fadeIn 1s ease-out;
          z-index: 10;
        }

        .hero-subtitle {
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          font-size: 0.8rem;
          color: var(--accent);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .hero-title {
          font-size: clamp(3rem, 7vw, 5.5rem);
          margin-bottom: 1.5rem;
          color: var(--fg-primary);
          line-height: 1.1;
        }

        .hero-description {
          font-size: 1.1rem;
          max-width: 500px;
          margin-bottom: 2.5rem;
          color: var(--fg-secondary);
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: var(--fg-primary);
          color: var(--bg-primary);
          padding: 1.2rem 2.5rem;
          font-weight: 500;
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .btn-primary:hover {
          background: var(--accent);
          transform: translateY(-2px);
          opacity: 1;
        }

        .hero-visual {
          height: 100%;
          position: relative;
          padding: 2rem 0 2rem 2rem;
        }

        .hero-image-wrapper {
          position: relative;
          width: 100%;
          height: calc(100vh - var(--header-height) - 4rem);
          overflow: hidden;
          border-radius: 4px 0 0 4px;
        }

        :global(.object-cover) {
          object-fit: cover;
        }

        /* Featured Section Styles */
        .featured {
          padding: 8rem 2rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 3rem;
        }

        .view-all {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          font-weight: 600;
          padding-bottom: 5px;
          border-bottom: 2px solid var(--accent);
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 992px) {
          .hero {
            grid-template-columns: 1fr;
            text-align: center;
            padding-top: 6rem;
          }
          
          .hero-content {
            padding-right: 0;
            padding-bottom: 4rem;
          }
          
          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }
          
          .hero-visual {
            height: 60vh;
            padding: 0 1rem;
          }
          
          .hero-image-wrapper {
            border-radius: 8px;
            height: 100%;
          }

          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 600px) {
          .product-grid {
            grid-template-columns: 1fr;
          }
          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

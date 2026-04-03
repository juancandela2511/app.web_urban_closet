"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useToastStore } from "@/lib/toast-store";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  slug: string;
}

export default function ProductCard({ id, name, price, image, category, slug }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const addToast = useToastStore((state) => state.addToast);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      price,
      image,
      size: "M", 
      color: "Original",
      quantity: 1
    });
    addToast(`${name} añadido al carrito`);
  };

  return (
    <div className="product-card">
      <Link href={`/products/${slug}`} className="product-image-link">
        <div className="product-image-wrapper">
          <Image 
            src={image} 
            alt={name} 
            fill 
            className="object-cover transition-zoom"
          />
          <div className="product-badge">{category}</div>
          <button 
            className="quick-add" 
            aria-label="Añadir al carrito"
            onClick={handleQuickAdd}
          >
            <Plus size={20} />
          </button>
        </div>
      </Link>
      
      <div className="product-info">
        <Link href={`/products/${slug}`}>
          <h3 className="product-name">{name}</h3>
        </Link>
        <p className="product-price">${price.toLocaleString('es-CO')}</p>
      </div>

      <style jsx>{`
        .product-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          animation: fadeIn 0.8s ease-out;
        }

        .product-image-wrapper {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: var(--bg-secondary);
          border-radius: 4px;
        }

        :global(.transition-zoom) {
          transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .product-image-wrapper:hover :global(.transition-zoom) {
          transform: scale(1.05);
        }

        .product-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--glass);
          backdrop-filter: var(--glass-blur);
          padding: 0.4rem 0.8rem;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          font-weight: 600;
          border-radius: 2px;
        }

        .quick-add {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: var(--fg-primary);
          color: var(--bg-primary);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .product-image-wrapper:hover .quick-add {
          opacity: 1;
          transform: translateY(0);
        }

        .product-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .product-name {
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 500;
          color: var(--fg-primary);
        }

        .product-price {
          font-family: var(--font-serif);
          font-weight: 400;
          color: var(--accent);
          font-size: 1.1rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

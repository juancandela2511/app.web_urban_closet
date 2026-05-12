"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCartStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const subtotal = totalPrice();
  const shipping = subtotal > 500000 ? 0 : 25000;
  const total = subtotal + shipping;

  return (
    <div className="cart-page-container">
      <Header />
      
      <main className="cart-content container">
        <header className="cart-header">
          <h1 className="cart-title">Tu Carrito</h1>
          <p className="cart-subtitle">{items.length} artículos en tu selección</p>
        </header>

        {items.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={64} strokeWidth={1} />
            <h2>Tu carrito está vacío</h2>
            <p>Parece que aún no has añadido ninguna pieza a tu colección.</p>
            <Link href="/products" className="btn-primary">
              Volver a la Tienda
            </Link>
          </div>
        ) : (
          <div className="cart-grid">
            {/* Items List */}
            <div className="cart-items">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    key={`${item.id}-${item.size}-${item.color}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="cart-item"
                  >
                    <div className="item-image">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    
                    <div className="item-details">
                      <div className="item-header">
                        <Link href={`/products/${item.id}`} className="item-name">{item.name}</Link>
                        <button 
                          className="remove-btn" 
                          onClick={() => removeItem(item.id, item.size, item.color)}
                          aria-label="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <div className="item-meta">
                        <span>Talla: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>
                      
                      <div className="item-actions">
                        <div className="quantity-selector">
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="item-price">${(item.price * item.quantity).toLocaleString('es-CO')}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <aside className="order-summary">
              <div className="summary-card glass">
                <h2 className="summary-title">Resumen del Pedido</h2>
                
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString('es-CO')}</span>
                </div>
                
                <div className="summary-row">
                  <span>Envío</span>
                  <span>{shipping === 0 ? "Gratis" : `$${shipping.toLocaleString('es-CO')}`}</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${total.toLocaleString('es-CO')}</span>
                </div>
                
                <button className="checkout-btn">
                  Finalizar Compra <ArrowRight size={20} />
                </button>
                
                <div className="summary-footer">
                  <p>Aceptamos pagos con tarjeta de crédito, débito y transferencia bancaria.</p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />

      <style jsx>{`
        .cart-page-container {
          padding-top: var(--header-height);
          background: var(--bg-primary);
          min-height: 100vh;
        }

        .cart-content {
          padding-top: 4rem;
          padding-bottom: 8rem;
        }

        .cart-header {
          margin-bottom: 4rem;
          text-align: center;
        }

        .cart-title {
          font-size: 3.5rem;
          margin-bottom: 0.5rem;
        }

        .cart-subtitle {
          color: var(--fg-secondary);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
        }

        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 4rem;
          align-items: start;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .cart-item {
          display: flex;
          gap: 2rem;
          padding: 1.5rem;
          background: var(--bg-secondary);
          border-radius: 4px;
          border: 1px solid var(--border);
        }

        .item-image {
          position: relative;
          width: 120px;
          height: 160px;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 2px;
        }

        .item-details {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .item-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--fg-primary);
        }

        .remove-btn {
          color: var(--fg-secondary);
          transition: color 0.3s ease;
        }

        .remove-btn:hover {
          color: #d32f2f;
        }

        .item-meta {
          display: flex;
          gap: 1.5rem;
          font-size: 0.85rem;
          color: var(--fg-secondary);
          margin-bottom: 1.5rem;
        }

        .item-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          border: 1px solid var(--border);
          padding: 0.4rem 1rem;
          border-radius: 20px;
          background: var(--bg-primary);
        }

        .quantity-selector button {
          color: var(--fg-secondary);
        }

        .quantity-selector button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .item-price {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-weight: 500;
        }

        /* Summary */
        .summary-card {
          padding: 2.5rem;
          border-radius: 8px;
          position: sticky;
          top: calc(var(--header-height) + 2rem);
        }

        .summary-title {
          font-size: 1.8rem;
          margin-bottom: 2rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.2rem;
          font-size: 1rem;
          color: var(--fg-secondary);
        }

        .summary-divider {
          height: 1px;
          background: var(--border);
          margin: 1.5rem 0;
        }

        .summary-row.total {
          color: var(--fg-primary);
          font-weight: 700;
          font-size: 1.4rem;
        }

        .checkout-btn {
          width: 100%;
          background: var(--fg-primary);
          color: var(--bg-primary);
          padding: 1.2rem;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
          margin-bottom: 1.5rem;
        }

        .checkout-btn:hover {
          background: var(--accent);
          transform: translateY(-2px);
        }

        .summary-footer {
          font-size: 0.75rem;
          color: var(--fg-secondary);
          text-align: center;
          line-height: 1.5;
        }

        .empty-cart {
          text-align: center;
          padding: 6rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .empty-cart h2 {
          font-size: 2rem;
        }

        .empty-cart p {
          color: var(--fg-secondary);
          margin-bottom: 1rem;
        }

        .btn-primary {
          background: var(--fg-primary);
          color: var(--bg-primary);
          padding: 1rem 2.5rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
        }

        @media (max-width: 1100px) {
          .cart-grid {
            grid-template-columns: 1fr;
          }
          .order-summary {
            position: static;
          }
        }

        @media (max-width: 600px) {
          .cart-title {
            font-size: 2.5rem;
          }
          .cart-item {
            gap: 1rem;
            padding: 1rem;
          }
          .item-image {
            width: 80px;
            height: 110px;
          }
          .item-name {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ShoppingBag, User, Search, Menu, Sun, Moon, X } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled glass" : ""}`}>
      <div className="header-inner container">
        <button className="menu-btn" aria-label="Menu">
          <Menu size={24} />
        </button>

        <nav className="nav-desktop">
          <Link href="/products">Catálogo</Link>
          <Link href="/products?category=men">Hombre</Link>
          <Link href="/products?category=women">Mujer</Link>
        </nav>

        <Link href="/" className="logo">
          FASHION
        </Link>

        <div className="header-actions">
          <div className={`search-container ${isSearchOpen ? "open" : ""}`}>
            <input type="text" placeholder="Buscar prendas..." className="search-input" />
            <button className="action-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              {isSearchOpen ? <X size={20} /> : <Search size={22} />}
            </button>
          </div>
          
          <button className="action-btn theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {mounted && (theme === "light" ? <Moon size={22} /> : <Sun size={22} />)}
          </button>
          
          <button className="action-btn" aria-label="Account">
            <User size={22} />
          </button>
          <Link href="/cart" className="cart-btn" aria-label="Cart">
            <ShoppingBag size={22} />
            {mounted && totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
        </div>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          z-index: 1000;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }

        .header.scrolled {
          height: 70px;
          border-bottom: 1px solid var(--border);
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .nav-desktop {
          display: flex;
          gap: 2rem;
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
        }

        .logo {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: 0.3rem;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          opacity: 1 !important;
        }

        .header-actions {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .action-btn, .menu-btn {
          color: var(--fg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-container {
          display: flex;
          align-items: center;
          background: var(--bg-secondary);
          border-radius: 20px;
          padding: 0 0.5rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          width: 40px;
          overflow: hidden;
        }

        .search-container.open {
          width: 240px;
          padding: 0 1rem;
          background: var(--bg-primary);
          border: 1px solid var(--border);
        }

        .search-input {
          border: none;
          background: transparent;
          outline: none;
          width: 0;
          padding: 0;
          font-size: 0.9rem;
          color: var(--fg-primary);
          transition: all 0.4s ease;
        }

        .search-container.open .search-input {
          width: 100%;
          padding: 0.5rem;
        }

        .cart-btn {
          position: relative;
          color: var(--fg-primary);
          opacity: 1 !important;
          display: flex;
          align-items: center;
        }

        .theme-toggle:hover {
          transform: rotate(15deg);
        }

        @media (max-width: 992px) {
          .nav-desktop {
            display: none;
          }
          .menu-btn {
            display: block;
          }
          .search-container.open {
            width: 160px;
          }
        }
      `}</style>
    </header>
  );
}

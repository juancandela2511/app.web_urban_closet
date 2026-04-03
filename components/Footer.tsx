import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">FASHION</Link>
          <p className="footer-motto">Elegancia atemporal para el individuo moderno.</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-group">
            <h4 className="footer-title">Colecciones</h4>
            <Link href="/products?category=men">Hombre</Link>
            <Link href="/products?category=women">Mujer</Link>
            <Link href="/collections/exclusive">Exclusivos</Link>
          </div>
          
          <div className="footer-group">
            <h4 className="footer-title">Asistencia</h4>
            <Link href="/faq">FAQ</Link>
            <Link href="/shipping">Envíos</Link>
            <Link href="/returns">Devoluciones</Link>
          </div>
          
          <div className="footer-group">
            <h4 className="footer-title">Social</h4>
            <Link href="https://instagram.com">Instagram</Link>
            <Link href="https://pinterest.com">Pinterest</Link>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom container">
        <p>&copy; 2026 FASHION STORE. Todos los derechos reservados.</p>
        <div className="footer-legal">
          <Link href="/terms">Términos</Link>
          <Link href="/privacy">Privacidad</Link>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--bg-secondary);
          padding: 6rem 0 3rem;
          margin-top: 8rem;
          border-top: 1px solid var(--border);
        }

        .footer-inner {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          margin-bottom: 6rem;
        }

        .footer-logo {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: 0.3rem;
          display: block;
          margin-bottom: 1.5rem;
        }

        .footer-motto {
          color: var(--fg-secondary);
          max-width: 300px;
          line-height: 1.8;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .footer-title {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          margin-bottom: 2rem;
          color: var(--fg-primary);
        }

        .footer-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-group a {
          font-size: 0.9rem;
          color: var(--fg-secondary);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          padding-top: 3rem;
          border-top: 1px solid rgba(0,0,0,0.05);
          font-size: 0.8rem;
          color: var(--fg-secondary);
        }

        .footer-legal {
          display: flex;
          gap: 2rem;
        }

        @media (max-width: 992px) {
          .footer-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .footer-motto {
            margin: 0 auto;
          }
          
          .footer-links {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .footer-bottom {
            flex-direction: column;
            gap: 2rem;
            text-align: center;
          }
          
          .footer-legal {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}

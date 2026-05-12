"use client";

import { useToastStore } from "@/lib/toast-store";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className={`toast toast-${toast.type} glass`}
          >
            <div className="toast-icon">
              {toast.type === 'success' ? <Check size={18} /> : <Info size={18} />}
            </div>
            <p className="toast-message">{toast.message}</p>
            <button className="toast-close" onClick={() => removeToast(toast.id)}>
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <style jsx>{`
        .toast-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .toast {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          border-radius: 4px;
          min-width: 280px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-md);
        }

        .toast-success {
          border-left: 4px solid #2e7d32;
        }

        .toast-info {
          border-left: 4px solid var(--accent);
        }

        .toast-icon {
          color: var(--fg-primary);
        }

        .toast-message {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--fg-primary);
          flex-grow: 1;
        }

        .toast-close {
          color: var(--fg-secondary);
          opacity: 0.6;
        }

        .toast-close:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

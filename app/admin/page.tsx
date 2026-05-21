"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Edit, Package, LogOut } from "lucide-react";

export default function AdminPage() {
  // Estados de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Estado del inventario (CRUD simulado estético)
  const [productos, setProductos] = useState([
    { id: 1, name: "Camiseta Over-Size Black", price: 89900, category: "Camisas", stock: 15 },
    { id: 2, name: "Jeans Baggy Azul Claro", price: 149900, category: "Pantalones", stock: 8 },
    { id: 3, name: "Vestido Gala Lunar", price: 189900, category: "Vestidos", stock: 4 }
  ]);

  // Estados del formulario CRUD
  const [formProducto, setFormProducto] = useState({ id: null as number | null, name: "", price: "", category: "Camisas", stock: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Manejo de inicio de sesión hardcoded
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "usuario1" && password === "1234") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
    }
  };

  // Agregar o Editar producto
  const handleSubmitProducto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProducto.name || !formProducto.price || !formProducto.stock) return;

    if (isEditing && formProducto.id !== null) {
      setProductos(productos.map(p => p.id === formProducto.id ? {
        ...p,
        name: formProducto.name,
        price: parseFloat(formProducto.price),
        category: formProducto.category,
        stock: parseInt(formProducto.stock)
      } : p));
      setIsEditing(false);
    } else {
      const nuevoProducto = {
        id: Date.now(),
        name: formProducto.name,
        price: parseFloat(formProducto.price),
        category: formProducto.category,
        stock: parseInt(formProducto.stock)
      };
      setProductos([...productos, nuevoProducto]);
    }
    // Resetear formulario
    setFormProducto({ id: null, name: "", price: "", category: "Camisas", stock: "" });
  };

  // Activar modo edición
  const handleIniciarEdicion = (producto: any) => {
    setIsEditing(true);
    setFormProducto({
      id: producto.id,
      name: producto.name,
      price: producto.price.toString(),
      category: producto.category,
      stock: producto.stock.toString()
    });
  };

  // Eliminar producto
  const handleEliminarProducto = (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setProductos(productos.filter(p => p.id !== id));
    }
  };

  // --- VISTA 1: FORMULARIO DE LOGUEO ESTÉTICO ---
  if (!isLoggedIn) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#0f172a", fontFamily: "sans-serif", padding: "20px" }}>
        <div style={{ backgroundColor: "#1e293b", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.3)", border: "1px solid #334155" }}>
          
          {/* Botón Ir Atrás */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", textDecoration: "none", fontSize: "14px", marginBottom: "24px", width: "fit-content" }}>
            <ArrowLeft size={16} /> Volver al inicio
          </Link>

          <h2 style={{ color: "#f8fafc", fontSize: "28px", fontWeight: "bold", textAlign: "center", marginBottom: "6px" }}>Urban Closet</h2>
          <p style={{ color: "#94a3b8", fontSize: "14px", textAlign: "center", marginBottom: "24px" }}>Acceso Administrativo</p>

          {loginError && (
            <div style={{ backgroundColor: "#7f1d1d", color: "#fca5a5", padding: "10px", borderRadius: "8px", fontSize: "13px", textAlign: "center", marginBottom: "16px", border: "1px solid #991b1b" }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", color: "#cbd5e1", fontSize: "14px", marginBottom: "6px" }}>Usuario</label>
              <input 
                type="text" 
                placeholder="Ingresa tu usuario" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ width: "100%", padding: "12px", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#fff", fontSize: "14px", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#cbd5e1", fontSize: "14px", marginBottom: "6px" }}>Contraseña</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: "100%", padding: "12px", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#fff", fontSize: "14px", outline: "none" }}
              />
            </div>

            <button 
              type="submit" 
              style={{ width: "100%", padding: "14px", backgroundColor: "#fff", color: "#000", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "15px", cursor: "pointer", marginTop: "10px" }}
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- VISTA 2: PANEL DE ADMINISTRACIÓN COMPLETO (CRUD) ---
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Barra superior */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #334155", paddingBottom: "20px", marginBottom: "30px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", letterSpacing: "-0.5px" }}>Panel <span style={{ color: "#cbd5e1", fontWeight: "400" }}>Admin</span></h1>
            <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "4px" }}>Gestiona los productos visibles en la tienda</p>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", backgroundColor: "#1e293b", color: "#f87171", border: "1px solid #334155", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}
          >
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "30px", alignItems: "start" }}>
          
          {/* Formulario (Izquierda) */}
          <div style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              {isEditing ? <Edit size={18} style={{ color: "#60a5fa" }} /> : <Plus size={18} style={{ color: "#4ade80" }} />}
              {isEditing ? "Editar Prenda" : "Añadir Nueva Prenda"}
            </h3>

            <form onSubmit={handleSubmitProducto} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", color: "#cbd5e1", fontSize: "13px", marginBottom: "6px" }}>Nombre del Producto</label>
                <input 
                  type="text"
                  placeholder="Ej. Hoodie Oversize Gray"
                  value={formProducto.name}
                  onChange={(e) => setFormProducto({ ...formProducto, name: e.target.value })}
                  required
                  style={{ width: "100%", padding: "10px", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#fff", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", color: "#cbd5e1", fontSize: "13px", marginBottom: "6px" }}>Precio (COP)</label>
                  <input 
                    type="number"
                    placeholder="99000"
                    value={formProducto.price}
                    onChange={(e) => setFormProducto({ ...formProducto, price: e.target.value })}
                    required
                    style={{ width: "100%", padding: "10px", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#fff", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: "#cbd5e1", fontSize: "13px", marginBottom: "6px" }}>Stock Inicial</label>
                  <input 
                    type="number"
                    placeholder="12"
                    value={formProducto.stock}
                    onChange={(e) => setFormProducto({ ...formProducto, stock: e.target.value })}
                    required
                    style={{ width: "100%", padding: "10px", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#fff", outline: "none" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", color: "#cbd5e1", fontSize: "13px", marginBottom: "6px" }}>Categoría</label>
                <select 
                  value={formProducto.category}
                  onChange={(e) => setFormProducto({ ...formProducto, category: e.target.value })}
                  style={{ width: "100%", padding: "10px", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#fff", outline: "none" }}
                >
                  <option value="Camisas">Camisas / Camisetas</option>
                  <option value="Pantalones">Pantalones / Jeans</option>
                  <option value="Vestidos">Vestidos</option>
                  <option value="Accesorios">Accesorios</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button 
                  type="submit"
                  style={{ flex: 1, padding: "12px", backgroundColor: "#fff", color: "#000", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
                >
                  {isEditing ? "Guardar Cambios" : "Agregar Prenda"}
                </button>
                {isEditing && (
                  <button 
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormProducto({ id: null, name: "", price: "", category: "Camisas", stock: "" });
                    }}
                    style={{ padding: "12px", backgroundColor: "#475569", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Tabla Inventario (Derecha) */}
          <div style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Package size={18} style={{ color: "#94a3b8" }} />
              Inventario de la Tienda ({productos.length})
            </h3>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #334155", color: "#94a3b8", fontSize: "13px" }}>
                    <th style={{ padding: "12px 8px" }}>Prenda</th>
                    <th style={{ padding: "12px 8px" }}>Categoría</th>
                    <th style={{ padding: "12px 8px" }}>Precio</th>
                    <th style={{ padding: "12px 8px" }}>Stock</th>
                    <th style={{ padding: "12px 8px", textAlign: "center" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod) => (
                    <tr key={prod.id} style={{ borderBottom: "1px solid #334155", fontSize: "14px" }}>
                      <td style={{ padding: "14px 8px", fontWeight: "500" }}>{prod.name}</td>
                      <td style={{ padding: "14px 8px" }}>
                        <span style={{ backgroundColor: "#0f172a", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", color: "#cbd5e1" }}>
                          {prod.category}
                        </span>
                      </td>
                      <td style={{ padding: "14px 8px", fontWeight: "600" }}>
                        ${prod.price.toLocaleString("es-CO")}
                      </td>
                      <td style={{ padding: "14px 8px", color: prod.stock <= 5 ? "#fca5a5" : "#cbd5e1" }}>
                        {prod.stock} uds
                      </td>
                      <td style={{ padding: "14px 8px" }}>
                        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                          <button 
                            onClick={() => handleIniciarEdicion(prod)}
                            style={{ padding: "6px", backgroundColor: "#334155", border: "none", borderRadius: "4px", color: "#60a5fa", cursor: "pointer" }}
                            title="Editar"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => handleEliminarProducto(prod.id)}
                            style={{ padding: "6px", backgroundColor: "#334155", border: "none", borderRadius: "4px", color: "#f87171", cursor: "pointer" }}
                            title="Eliminar"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
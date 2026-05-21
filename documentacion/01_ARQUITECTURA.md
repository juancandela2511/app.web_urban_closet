#"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Petición real de autenticación a Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) throw authError;

      alert("¡Inicio de sesión exitoso!");
      
      // Una vez ingresa bien, lo mandamos a la página principal
      router.push("/");
      router.refresh();
    } catch (err: any) {
      // Si los datos están mal o no existe el usuario, pinta el error en pantalla
      setError(err.message || "Credenciales incorrectas. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f9f9f9" }}>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "30px", backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", width: "100%", maxWidth: "400px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "10px", fontSize: "22px", fontWeight: "bold" }}>Urban Closet</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: "14px", marginTop: "-10px" }}>Inicia sesión para continuar</p>
        
        {error && (
          <p style={{ color: "red", backgroundColor: "#ffe6e6", padding: "8px", borderRadius: "4px", fontSize: "13px", textAlign: "center" }}>
            {error}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontSize: "14px", color: "#555" }}>Correo Electrónico</label>
          <input 
            type="email" 
            placeholder="ejemplo@correo.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: "10px", color: "#000", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontSize: "14px", color: "#555" }}>Contraseña</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: "10px", color: "#000", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: "12px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", marginTop: "10px", transition: "background 0.2s", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Cargando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
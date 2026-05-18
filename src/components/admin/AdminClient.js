"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function AdminClient({ usuarios }) {
    const router = useRouter();
    const [cargando, setCargando] = useState(null); // id del usuario que está cambiando

    async function cambiarRol(usuarioId, rolActual) {
        const nuevoRol = rolActual === "admin" ? "alumno" : "admin";
        const confirmar = confirm(
        `¿Cambiar rol de ${rolActual} a ${nuevoRol}?`
        );
        if (!confirmar) return;

        setCargando(usuarioId);

        const { error } = await supabase
        .from("usuarios")
        .update({ role: nuevoRol })
        .eq("id", usuarioId);

        if (error) {
        alert("Error al cambiar el rol: " + error.message);
        }

        setCargando(null);
        router.refresh();
    }

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-10">
        <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">
            Panel de Administración
            </h1>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                    <th className="px-6 py-3 text-left font-semibold text-slate-600">Usuario</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-600">Correo</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-600">Rol</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-600">Acción</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {usuarios?.map((usuario) => (
                    <tr key={usuario.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                        {usuario.avatar_url ? (
                            <img
                            src={usuario.avatar_url}
                            alt="avatar"
                            className="w-8 h-8 rounded-full"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-semibold">
                            {usuario.full_name?.[0] ?? "?"}
                            </div>
                        )}
                        <span className="font-medium text-slate-900">
                            {usuario.full_name ?? "Sin nombre"}
                        </span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{usuario.email}</td>
                    <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        usuario.role === "admin"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-600"
                        }`}>
                        {usuario.role}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <button
                        onClick={() => cambiarRol(usuario.id, usuario.role)}
                        disabled={cargando === usuario.id}
                        className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                            usuario.role === "admin"
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                        }`}
                        >
                        {cargando === usuario.id
                            ? "Cambiando..."
                            : usuario.role === "admin"
                            ? "Quitar admin"
                            : "Hacer admin"}
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </main>
    );
}
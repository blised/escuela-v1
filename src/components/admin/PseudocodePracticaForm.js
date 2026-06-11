"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function PseudocodePracticaForm({ practica, temas }) {
    const router = useRouter();
    const esNueva = !practica;

    const [titulo, setTitulo] = useState(practica?.titulo ?? "");
    const [objetivo, setObjetivo] = useState(practica?.objetivo ?? "");
    const [descripcion, setDescripcion] = useState(practica?.descripcion ?? "");
    const [retroalimentacion, setRetroalimentacion] = useState(practica?.retroalimentacion ?? "");
    const [temaId, setTemaId] = useState(practica?.tema_id ?? "");
    const [orden, setOrden] = useState(practica?.orden ?? 1);
    const [publicada, setPublicada] = useState(practica?.publicada ?? true);
    const [cargando, setCargando] = useState(false);

    // Bloques como array de {id, texto}
    const [bloques, setBloques] = useState(
        practica?.bloques ?? [{ id: "b1", texto: "" }]
    );

    // Solución como array de ids en orden correcto
    const [solucion, setSolucion] = useState(
        practica?.solucion ?? []
    );

    // --- Manejo de bloques ---
    function agregarBloque() {
        const nuevoId = `b${Date.now()}`;
        setBloques((prev) => [...prev, { id: nuevoId, texto: "" }]);
    }

    function editarBloque(id, texto) {
        setBloques((prev) =>
        prev.map((b) => (b.id === id ? { ...b, texto } : b))
        );
    }

    function eliminarBloque(id) {
        setBloques((prev) => prev.filter((b) => b.id !== id));
        setSolucion((prev) => prev.filter((sid) => sid !== id));
    }

    // --- Manejo de solución ---
    function moverSolucionArriba(index) {
        if (index === 0) return;
        const nuevo = [...solucion];
        [nuevo[index - 1], nuevo[index]] = [nuevo[index], nuevo[index - 1]];
        setSolucion(nuevo);
    }

    function moverSolucionAbajo(index) {
        if (index === solucion.length - 1) return;
        const nuevo = [...solucion];
        [nuevo[index], nuevo[index + 1]] = [nuevo[index + 1], nuevo[index]];
        setSolucion(nuevo);
    }

    function agregarASolucion(bloqueId) {
        if (solucion.includes(bloqueId)) return;
        setSolucion((prev) => [...prev, bloqueId]);
    }

    function quitarDeSolucion(bloqueId) {
        setSolucion((prev) => prev.filter((id) => id !== bloqueId));
    }

    function usarTodosEnOrden() {
        setSolucion(bloques.map((b) => b.id));
    }

    // --- Guardar ---
    async function handleGuardar() {
        if (!titulo.trim()) {
        alert("El título es obligatorio");
        return;
        }
        if (bloques.length < 2) {
        alert("Agrega al menos 2 bloques");
        return;
        }
        if (bloques.some((b) => !b.texto.trim())) {
        alert("Todos los bloques deben tener texto");
        return;
        }
        if (solucion.length !== bloques.length) {
        alert("La solución debe incluir todos los bloques en el orden correcto");
        return;
        }

        setCargando(true);

        const datos = {
        titulo,
        objetivo,
        descripcion,
        retroalimentacion,
        bloques,
        solucion,
        tema_id: temaId || null,
        orden: Number(orden),
        publicada,
        };

        if (esNueva) {
        const { error } = await supabase
            .from("practicas_pseudocodigo")
            .insert(datos);
        if (error) {
            alert("Error al crear: " + error.message);
            setCargando(false);
            return;
        }
        } else {
        const { error } = await supabase
            .from("practicas_pseudocodigo")
            .update(datos)
            .eq("id", practica.id);
        if (error) {
            alert("Error al actualizar: " + error.message);
            setCargando(false);
            return;
        }
        }

        setCargando(false);
        router.push("/admin/pseudocodigo");
        router.refresh();
    }

    async function handleEliminar() {
        if (!confirm("¿Eliminar esta práctica?")) return;
        setCargando(true);

        const { error } = await supabase
        .from("practicas_pseudocodigo")
        .delete()
        .eq("id", practica.id);

        if (error) {
        alert("Error al eliminar: " + error.message);
        setCargando(false);
        return;
        }

        router.push("/admin/pseudocodigo");
        router.refresh();
    }

    return (
        <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
            {esNueva ? "Nueva práctica de pseudocódigo" : "Editar práctica"}
            </h1>
            {!esNueva && (
            <button
                onClick={handleEliminar}
                disabled={cargando}
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
            >
                Eliminar
            </button>
            )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-5">

            {/* Info básica */}
            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Título *</label>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: Validación de acceso seguro"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Tema relacionado</label>
            <select value={temaId} onChange={(e) => setTemaId(e.target.value)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Sin tema</option>
                {temas?.map((tema) => (
                <option key={tema.id} value={tema.id}>
                    {tema.unidades?.titulo ?? "Sin unidad"} — {tema.titulo}
                </option>
                ))}
            </select>
            </div>

            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Objetivo</label>
            <input value={objetivo} onChange={(e) => setObjetivo(e.target.value)}
                placeholder="¿Qué aprenderá el alumno?"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Descripción / Instrucciones</label>
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
                rows={3} placeholder="Instrucciones para el alumno"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
                Retroalimentación (mensaje al responder correcto)
            </label>
            <input value={retroalimentacion} onChange={(e) => setRetroalimentacion(e.target.value)}
                placeholder="Ej: El algoritmo valida usuario y contraseña usando una condición."
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Bloques */}
            <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                Bloques de pseudocódigo *
                </label>
                <button onClick={agregarBloque}
                className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-200">
                + Agregar bloque
                </button>
            </div>
            <p className="text-xs text-slate-400">
                Escribe cada línea del pseudocódigo como un bloque separado.
            </p>

            <div className="flex flex-col gap-2">
                {bloques.map((bloque, index) => (
                <div key={bloque.id} className="flex gap-2 items-center">
                    <span className="text-xs text-slate-400 w-6 text-right">{index + 1}.</span>
                    <input
                    value={bloque.texto}
                    onChange={(e) => editarBloque(bloque.id, e.target.value)}
                    placeholder={`Bloque ${index + 1}`}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={() => eliminarBloque(bloque.id)}
                    className="rounded-lg px-2 py-1 text-xs text-red-500 hover:bg-red-50">
                    ✕
                    </button>
                </div>
                ))}
            </div>
            </div>

            {/* Solución */}
            <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                Orden correcto (solución) *
                </label>
                <button onClick={usarTodosEnOrden}
                className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200">
                Usar orden actual
                </button>
            </div>
            <p className="text-xs text-slate-400">
                Agrega los bloques en el orden correcto. Este es el orden que se validará.
            </p>

            {/* Botones para agregar a solución */}
            <div className="flex flex-wrap gap-2">
                {bloques
                .filter((b) => !solucion.includes(b.id))
                .map((b) => (
                    <button
                    key={b.id}
                    onClick={() => agregarASolucion(b.id)}
                    className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-mono text-slate-600 hover:bg-blue-50 hover:border-blue-300"
                    >
                    + {b.texto || `Bloque ${b.id}`}
                    </button>
                ))}
            </div>

            {/* Solución ordenable */}
            <div className="flex flex-col gap-2 mt-1">
                {solucion.map((bloqueId, index) => {
                const bloque = bloques.find((b) => b.id === bloqueId);
                if (!bloque) return null;
                return (
                    <div key={bloqueId} className="flex gap-2 items-center bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
                    <span className="text-xs text-slate-400 w-5">{index + 1}.</span>
                    <div className="flex flex-col gap-1">
                        <button onClick={() => moverSolucionArriba(index)} disabled={index === 0}
                        className="text-xs text-slate-400 hover:text-slate-700 disabled:opacity-30">▲</button>
                        <button onClick={() => moverSolucionAbajo(index)} disabled={index === solucion.length - 1}
                        className="text-xs text-slate-400 hover:text-slate-700 disabled:opacity-30">▼</button>
                    </div>
                    <span className="flex-1 text-sm font-mono text-slate-700">{bloque.texto}</span>
                    <button onClick={() => quitarDeSolucion(bloqueId)}
                        className="text-xs text-red-400 hover:text-red-600 px-2">✕</button>
                    </div>
                );
                })}
                {solucion.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">
                    Agrega bloques arriba para definir el orden correcto
                </p>
                )}
            </div>
            </div>

            {/* Orden y publicada */}
            <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-24">
                <label className="text-sm font-medium text-slate-700">Orden</label>
                <input type="number" value={orden} onChange={(e) => setOrden(e.target.value)}
                min={1} className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-end gap-2">
                <input type="checkbox" id="publicada" checked={publicada}
                onChange={(e) => setPublicada(e.target.checked)} className="w-4 h-4" />
                <label htmlFor="publicada" className="text-sm font-medium text-slate-700">Publicada</label>
            </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-2 mt-2">
            <button onClick={() => router.push("/admin/pseudocodigo")}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Cancelar
            </button>
            <button onClick={handleGuardar} disabled={cargando}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
                {cargando ? "Guardando..." : "Guardar"}
            </button>
            </div>
        </div>
        </div>
    );
}
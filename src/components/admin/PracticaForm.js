"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Editor from "@monaco-editor/react";

const supabase = createClient();

export default function PracticaForm({ practica, temas }) {
    const router = useRouter();
    const esNueva = !practica;

    const [titulo, setTitulo] = useState(practica?.titulo ?? "");
    const [objetivo, setObjetivo] = useState(practica?.objetivo ?? "");
    const [descripcion, setDescripcion] = useState(practica?.descripcion ?? "");
    const [codigoInicial, setCodigoInicial] = useState(
        practica?.codigo_inicial ?? "# Escribe tu código aquí\n"
    );
    const [salidaEsperada, setSalidaEsperada] = useState(
        practica?.salida_esperada ?? ""
    );
    const [temaId, setTemaId] = useState(practica?.tema_id ?? "");
    const [orden, setOrden] = useState(practica?.orden ?? 1);
    const [publicada, setPublicada] = useState(practica?.publicada ?? true);
    const [cargando, setCargando] = useState(false);

    async function handleGuardar() {
        if (!titulo || !codigoInicial) {
        alert("El título y el código inicial son obligatorios");
        return;
        }

        setCargando(true);

        const datos = {
        titulo,
        objetivo,
        descripcion,
        codigo_inicial: codigoInicial,
        salida_esperada: salidaEsperada,
        tema_id: temaId || null,
        orden: Number(orden),
        publicada,
        };

        if (esNueva) {
        const { error } = await supabase
            .from("practicas_python")
            .insert(datos);

        if (error) {
            alert("Error al crear la práctica: " + error.message);
            setCargando(false);
            return;
        }
        } else {
        const { error } = await supabase
            .from("practicas_python")
            .update(datos)
            .eq("id", practica.id);

        if (error) {
            alert("Error al actualizar la práctica: " + error.message);
            setCargando(false);
            return;
        }
        }

        setCargando(false);
        router.push("/admin/practicas");
        router.refresh();
    }

    async function handleEliminar() {
        const confirmar = confirm("¿Seguro que quieres eliminar esta práctica?");
        if (!confirmar) return;

        setCargando(true);

        const { error } = await supabase
        .from("practicas_python")
        .delete()
        .eq("id", practica.id);

        if (error) {
        alert("Error al eliminar: " + error.message);
        setCargando(false);
        return;
        }

        router.push("/admin/practicas");
        router.refresh();
    }

    return (
        <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
            {esNueva ? "Nueva práctica" : "Editar práctica"}
            </h1>
            {!esNueva && (
            <button
                onClick={handleEliminar}
                disabled={cargando}
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition"
            >
                Eliminar práctica
            </button>
            )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-4">
            {/* Título */}
            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Título *</label>
            <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: Práctica 1: Captura de datos"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            {/* Tema */}
            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Tema relacionado</label>
            <select
                value={temaId}
                onChange={(e) => setTemaId(e.target.value)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Sin tema</option>
                {temas?.map((tema) => (
                <option key={tema.id} value={tema.id}>
                    {tema.titulo}
                </option>
                ))}
            </select>
            </div>

            {/* Objetivo */}
            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Objetivo</label>
            <input
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                placeholder="¿Qué aprenderá el alumno?"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            {/* Descripción */}
            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Descripción</label>
            <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Instrucciones o contexto de la práctica"
                rows={3}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            {/* Código inicial */}
            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Código inicial *</label>
            <div className="rounded-xl overflow-hidden border border-slate-200">
                <Editor
                height="300px"
                language="python"
                value={codigoInicial}
                onChange={(value) => setCodigoInicial(value ?? "")}
                theme="vs-dark"
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                }}
                />
            </div>
            </div>

            {/* Salida esperada */}
            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Salida esperada</label>
            <input
                value={salidaEsperada}
                onChange={(e) => setSalidaEsperada(e.target.value)}
                placeholder="Ej: Contraseña válida"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            {/* Orden y publicada */}
            <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-24">
                <label className="text-sm font-medium text-slate-700">Orden</label>
                <input
                type="number"
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                min={1}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex items-end gap-2">
                <input
                type="checkbox"
                id="publicada"
                checked={publicada}
                onChange={(e) => setPublicada(e.target.checked)}
                className="w-4 h-4"
                />
                <label htmlFor="publicada" className="text-sm font-medium text-slate-700">
                Publicada
                </label>
            </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-2 mt-2">
            <button
                onClick={() => router.push("/admin/practicas")}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
                Cancelar
            </button>
            <button
                onClick={handleGuardar}
                disabled={cargando}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
                {cargando ? "Guardando..." : "Guardar"}
            </button>
            </div>
        </div>
        </div>
    );
}
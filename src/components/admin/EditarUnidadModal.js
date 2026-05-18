"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

function generarSlug(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    export default function EditarUnidadModal({ unidad, onClose }) {
    const supabase = createClient();
    const router = useRouter();

    const esNueva = !unidad;

    const [titulo, setTitulo] = useState(unidad?.titulo ?? "");
    const [descripcion, setDescripcion] = useState(unidad?.descripcion ?? "");
    const [slug, setSlug] = useState(unidad?.slug ?? "");
    const [cargando, setCargando] = useState(false);

    async function handleGuardar() {
        if (!titulo.trim()) {
        alert("El título es obligatorio");
        return;
        }

        setCargando(true);

        const slugFinal = slug.trim() || generarSlug(titulo);

        if (esNueva) {
        const { data: ultimaUnidad } = await supabase
            .from("unidades")
            .select("orden")
            .order("orden", { ascending: false })
            .limit(1);

        const nuevoOrden = (ultimaUnidad?.[0]?.orden ?? 0) + 1;

        const { error } = await supabase.from("unidades").insert({
            titulo,
            descripcion,
            slug: slugFinal,
            orden: nuevoOrden,
        });

        if (error) {
            alert("Error al crear la unidad: " + error.message);
            setCargando(false);
            return;
        }
        } else {
        const { error } = await supabase
            .from("unidades")
            .update({
            titulo,
            descripcion,
            slug: slugFinal,
            })
            .eq("id", unidad.id);

        if (error) {
            alert("Error al actualizar la unidad: " + error.message);
            setCargando(false);
            return;
        }
        }

        setCargando(false);
        onClose();
        router.refresh();
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900">
            {esNueva ? "Agregar unidad" : "Editar unidad"}
            </h2>

            <div className="mt-5 flex flex-col gap-4">
            <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título de la unidad"
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción de la unidad"
                className="min-h-28 w-full resize-none rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Slug, ejemplo: unidad-2"
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xs text-slate-500">
                Si dejas vacío el slug, se generará automáticamente con el título.
            </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
            <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
                Cancelar
            </button>

            <button
                type="button"
                onClick={handleGuardar}
                disabled={cargando}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
                {cargando ? "Guardando..." : "Guardar"}
            </button>
            </div>
        </div>
        </div>
    );
}
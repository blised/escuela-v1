"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function EliminarUnidadBtn({ unidadId }) {
    const supabase = createClient();
    const router = useRouter();

    async function handleEliminar() {
        const confirmar = confirm(
        "¿Seguro que quieres eliminar esta unidad? También se eliminarán sus temas relacionados."
        );

        if (!confirmar) return;

        const { error } = await supabase
        .from("unidades")
        .delete()
        .eq("id", unidadId);

        if (error) {
        alert("Error al eliminar la unidad: " + error.message);
        return;
        }

        router.refresh();
    }

    return (
        <button
        onClick={handleEliminar}
        className="rounded-lg bg-red-500 px-3 py-1 text-sm font-semibold text-white hover:bg-red-600"
        >
        Eliminar
        </button>
    );
}
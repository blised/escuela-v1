"use client"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function EliminarTemaBtn({ temaId }){
    const supabase = createClient();
    const router =  useRouter();

    async function handleEliminar(){
        const confirmar = confirm("¿Seguro que quieres eliminar este tema?");
        if (!confirmar) return;

        await supabase
        .from("temas")
        .delete()
        .eq("id", temaId);

        router.refresh();
    }

    // style on src/styles/EditarTemaModal.css

    return(
        <button
            onClick={handleEliminar}
            className="EliminarTema-button"
        >
            Eliminar
        </button>
    );
}
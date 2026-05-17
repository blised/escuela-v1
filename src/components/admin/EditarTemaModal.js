"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function EditarTemaModal({tema, unidadId, onClose}) {
    const supabase = createClient();
    const router = useRouter();
    const esNuevo = !tema; // without a theme, just adds a new one

    const [titulo, setTitulo] = useState(tema?.titulo ?? "");
    const [descripcion, setDescripcion] = useState(tema?.descripcion ?? "");
    const [archivo, setArchivo] = useState(null);
    const [cargando, setCargando] = useState(false);


    async function handleGuardar() {
        setCargando(true);
        let pdf_url = tema?.pdf_url ?? null;

        // if its a new pdf, upload to supabase(storage)
        if (archivo){
            const nombreArchivo = `unidad${unidadId}/${Date.now()}-${archivo.name}`;
            const {error:uploadError}=await supabase.storage
            .from("pdfs")
            .upload(nombreArchivo, archivo, {upsert:true})

            if (uploadError){
                alert("Error al subir el PDF");
                setCargando(false);
                return;
            }

            const {data:urlData}=supabase.storage
            .from("pdfs")
            .getPublicUrl(nombreArchivo);

            pdf_url = urlData.publicUrl;
        }

        if(esNuevo){
            // Obtener el ultimo orden
            const {data:temas}=await supabase
            .from("temas")
            .select("orden")
            .eq("unidad_id", unidadId)
            .order("orden", {ascending:false})
            .limit(1);

            const nuevoOrden = (temas?.[0]?.orden ?? 0) + 1;

            await supabase.from("temas").insert({
                unidad_id: unidadId,
                titulo,
                descripcion,
                pdf_url,
                orden: nuevoOrden,
            });
        } else {
            await supabase
            .from("temas")
            .update({titulo, descripcion, pdf_url})
            .eq("id", tema.id);
        }

        setCargando(false);
        onClose();
        router.refresh();
        
    }
    
    return (
        <div className="editar-div1"> 
            <div className="editar-div2">
                <h2 className="editar-h2select">
                {esNuevo ? "Agregar tema" : "Editar tema"}
                </h2>

                <div className="editar-div3">
                    <input
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Título del tema"
                        className="editar-titANDdesc"
                    />
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="Descripción"
                        className="editar-titANDdesc"
                    />
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setArchivo(e.target.files[0])}
                        className="editar-file"
                    />
                </div>

                <div className="editar-div4">
                    <button
                        onClick={onClose}
                        className="editar-cancelar"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleGuardar}
                        disabled={cargando}
                        className="editar-save"
                    >
                        {cargando ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
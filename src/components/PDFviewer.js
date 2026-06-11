"use client";
import { useState } from "react";
import EditarTemaModal from "./admin/EditarTemaModal";
import EliminarTemaBtn from "./admin/EliminarTemaBtn";


export default function PDFviewer({tema, isAdmin, unidadId}){
    const [editando, setEditando] = useState(false);

    if (!tema) {
        return (
            <div className="pdf-div1">
                Selecciona un tema para ver el contenido.
            </div>
        );
    }

    return(
        <div className="pdf-div2">
            <div className="pdf-divCenter">
                <h2 className="pdf-titulo1">{tema.titulo}</h2>
                {isAdmin && (
                    <div className="pdf-BefButt">
                        <button
                            onClick={() => setEditando(true)}
                            className="pdf-editButt1"
                        >
                            Editar
                        </button>
                        <EliminarTemaBtn temaId={tema.id} />
                    </div>
                )}
            </div>
            {tema.descripcion && (
                <p className="pdf-descripcion1">{tema.descripcion}</p>
            )}
            <a
                href={tema.pdf_url} // pdf on supabase
                download
                className="pdf-download-btt" 
            > 
                Descargar PDF
            </a>
            {/* Vista del PDF */}
            <iframe
                key={tema.id}
                src={`https://docs.google.com/gview?url=${encodeURIComponent(tema.pdf_url)}&embedded=true`}
                className="pdf-view1"
                title={tema.titulo}
            >
                No se pudo mostrar el pdf
            </iframe>
            {editando && (
                <EditarTemaModal 
                    tema = {tema}
                    onClose={() => setEditando(false)}
                />
            )}
        </div>
    );
}
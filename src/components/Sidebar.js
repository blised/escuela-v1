
"use client";
import { useState } from "react";
import { unidades } from "@/data/unidades";
//estilos

export default function Sidebar ({ unidad, temaActivo, onSelectTema}) {
    const [unidadAbierta, setUnidadAbierta] = useState(1); // to state if it's active or not

    return(
        <aside className="Unidad-aside1">
            <div className="Unidad-div1">
                <h2 className="Unidad-contenido-word">
                    Contenido de la unidad
                </h2>
            </div>

            <nav>
                <div>
                    <div className="Unidad-tema-word">
                        <p className="Ptitle1">
                            Unidad {unidad.id}
                        </p>
                        <p className="Ptitle2">
                            {unidad.tituloCorto ?? unidad.titulo}
                        </p>
                    </div>

                    <ul className="Boton-ul">
                        {unidad.temas.map((tema) => (
                            <li key={tema.id}>
                                <button 
                                    onClick={() => onSelectTema(tema)}
                                    className={`Tema-select1 ${
                                        temaActivo?.id === tema.id
                                        ? "Tema-select2"
                                        : "Tema-select3"
                                    }`} 
                                >
                                    {tema.titulo}
                                    <span className="Tema-lectura1">

                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul> 
                </div>
            </nav>
        </aside>
    );
}
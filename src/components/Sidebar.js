
"use client";
import { useState } from "react";
import Link from "next/link";
import EditarTemaModal from "./admin/EditarTemaModal";
// import { unidades } from "@/data/unidades";
//estilos

export default function Sidebar ({ unidad, temaActivo, practicaActiva, onSelectTema, onSelectPractica, isAdmin}) {
    const [unidadAbierta, setUnidadAbierta] = useState(1); // to state if it's active or not
    const [agregarTema, setAgregarTema] = useState(false);

    return(
        <aside className="Unidad-aside1">
{/* bton back to main page with href */}
            <div className="Unidad-BotonInicio1" >
                <Link href="/" className="Unidad-BotonInicio2">
                    ← Volver al inicio
                </Link>
            </div>
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
                                {/* Botón del tema (PDF) */}
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

                                {/* Prácticas de python */}
                                {tema.practicas_python?.length > 0 && (
                                    <ul className="pl-4">
                                        {tema.practicas_python.map((practica) => (
                                        <li key={practica.id}>
                                            <button
                                            onClick={() => onSelectPractica(practica, "python")}
                                            className={`practica-sidebar-link ${practicaActiva?.id === practica.id
                                                    ? "practica-sidebar-activa"
                                                    : ""
                                                }`}
                                            >
                                            ⚡ {practica.titulo}
                                            </button>
                                        </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Practica Pseudocodigo */}
                                {tema.practicas_pseudocodigo?.length > 0 && (
                                    <ul className="pl-4">
                                        {tema.practicas_pseudocodigo.map((practica) => (
                                        <li key={practica.id}>
                                            <button
                                            onClick={() => onSelectPractica(practica, "pseudo")}
                                            className={`practica-sidebar-link ${
                                                practicaActiva?.id === practica.id
                                                ? "practica-sidebar-activa"
                                                : ""
                                            }`}
                                            >
                                            📋 {practica.titulo}
                                            </button>
                                        </li>
                                        ))}
                                    </ul>
                                )}

                            </li>
                        ))}
                    </ul> 
                    {isAdmin && (
                        <button
                            onClick={() => setAgregarTema(true)}
                            className="side-AgregarTema1"
                        >
                            + Agregar tema
                        </button>
                    )}
                </div>
            </nav>

            {agregarTema && (
                <EditarTemaModal 
                    tema={null}
                    unidadId={unidad.id}
                    onClose={() => setAgregarTema(false)}
                />
            )}
        </aside>
    );
}
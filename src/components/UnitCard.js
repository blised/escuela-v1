// src/components/UnitCard.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import EditarUnidadModal from "./admin/EditarUnidadModal";
import EliminarUnidadBtn from "./admin/EliminarUnidadBtn";

export default function UnitCard({ unidad, isAdmin, onEdit}){
    const [editando, setEditando] = useState(false)

    return(
        <article className="unit-card relative">
            {isAdmin && (
                <div className="unit-div1">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onEdit(unidad);
                        }}
                        className="unit-bt1"
                    >
                        Editar
                    </button>

                    <EliminarUnidadBtn unidadId={unidad.id} />
                </div>
            )}

            <Link href={`/unidad/${unidad.slug}`} className="block h-full">
                <span className="unit-card-label">Unidad {unidad.orden ?? unidad.id}</span>

                <h2 className={`unit-card-title ${isAdmin ? "pr-28":""}`}>{unidad.titulo}</h2>

                <p className="unit-card-description">{unidad.descripcion}</p>

                <div className="unit-card-action">Ver unidad</div>
            </Link>

            {editando && (
                <EditarUnidadModal
                unidad={unidad}
                onClose={() => setEditando(false)}
                />
            )}
        </article>
    )
}
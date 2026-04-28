// src/components/UnitCard.jsx
import Link from "next/link";

export default function UnitCard({ unidad }){

    return(
        <Link href={`/unidad/${unidad.slug}`} className="unit-card">
            <span className="unit-card-label">Unidad {unidad.id}</span>

            <h2 className="unit-card-title">{unidad.titulo}</h2>

            <p className="unit-card-description">{unidad.descripcion}</p>

            <div className="unit-card-action">Ver unidad</div>
        </Link>
    )
}
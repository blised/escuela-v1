"use client";

import { useState } from "react";
import UnitCard from "@/components/UnitCard";
import EditarUnidadModal from "@/components/admin/EditarUnidadModal";
import { useUser } from "@/hooks/useUser";

export default function HomeClient({ unidades }) {
    const { isAdmin, loading } = useUser();

    const [modalAbierto, setModalAbierto] = useState(false);
    const [unidadEditando, setUnidadEditando] = useState(null);

    function abrirModalAgregar() {
        setUnidadEditando(null);
        setModalAbierto(true);
    }

    function abrirModalEditar(unidad) {
        setUnidadEditando(unidad);
        setModalAbierto(true);
    }

    function cerrarModal() {
        setModalAbierto(false);
        setUnidadEditando(null);
    }

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-10">
        <section className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-start justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                Material didáctico de ciberseguridad
                </h1>

                <p className="mt-3 max-w-3xl text-slate-600">
                Plataforma de apoyo para consultar unidades, temas y recursos PDF
                relacionados con el diseño de algoritmos aplicados a la seguridad de la
                información.
                </p>
            </div>

            {!loading && isAdmin && (
                <button
                type="button"
                onClick={abrirModalAgregar}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                + Agregar unidad
                </button>
            )}
            </div>

            <section className="card">
            {unidades?.map((unidad) => (
                <UnitCard
                key={unidad.id}
                unidad={unidad}
                isAdmin={isAdmin}
                onEdit={abrirModalEditar}
                />
            ))}
            </section>
        </section>

        {modalAbierto && (
            <EditarUnidadModal
            unidad={unidadEditando}
            onClose={cerrarModal}
            />
        )}
        </main>
    );
}
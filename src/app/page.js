// src/app/page.js
import UnitCard from "@/components/UnitCard";
import { unidades } from "@/data/unidades";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">
            Material didáctico de ciberseguridad
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600">
            Plataforma de apoyo para consultar unidades, temas y recursos PDF
            relacionados con el diseño de algoritmos aplicados a la seguridad de la
            información.
          </p>
        </div>

        <section className="card">
          {unidades.map((unidad) => (
            <UnitCard key={unidad.id} unidad={unidad}/>
          ))}
        </section>
      </section>
    </main>
  );
}
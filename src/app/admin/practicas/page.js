import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function AdminPracticasPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) notFound();

    const { data: perfil } = await supabase
        .from("usuarios")
        .select("role")
        .eq("id", user.id)
        .single();

    if (perfil?.role !== "admin") notFound();

    const { data: practicas } = await supabase
        .from("practicas_python")
        .select("*, temas(titulo, unidades(titulo))")
        .order("orden");

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-10">
        <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
                Prácticas de Python
            </h1>
            <Link
                href="/admin/practicas/nueva"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
                + Nueva práctica
            </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                    <th className="px-6 py-3 text-left font-semibold text-slate-600">Título</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-600">Tema</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-600">Estado</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-600">Acciones</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {practicas?.map((practica) => (
                    <tr key={practica.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                        {practica.titulo}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                        {practica.temas?.titulo ?? "Sin tema"}
                    </td>
                    <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        practica.publicada
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}>
                        {practica.publicada ? "Publicada" : "Borrador"}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex gap-2">
                        <Link
                            href={`/admin/practicas/${practica.id}`}
                            className="rounded-lg bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 hover:bg-yellow-200"
                        >
                            Editar
                        </Link>
                        <Link
                            href={`/practicas/${practica.id}`}
                            target="_blank"
                            className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-200"
                        >
                            Ver
                        </Link>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            <div className="mt-4">
            <Link href="/admin" className="text-sm text-slate-500 hover:underline">
                ← Volver al panel admin
            </Link>
            </div>
        </div>
        </main>
    );
}
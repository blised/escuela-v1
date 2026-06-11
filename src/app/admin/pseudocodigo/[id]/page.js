import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PseudocodePracticaForm from "@/components/admin/PseudocodePracticaForm";

export default async function EditarPseudocodigoPracticaPage({ params }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) notFound();

    const { data: perfil } = await supabase
        .from("usuarios").select("role").eq("id", user.id).single();
    if (perfil?.role !== "admin") notFound();

    const { data: practica } = await supabase
        .from("practicas_pseudocodigo")
        .select("*").eq("id", id).single();
    if (!practica) notFound();

    const { data: temas } = await supabase
        .from("temas")
        .select("id, titulo, unidades(titulo)")
        .order("orden");

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-10">
        <PseudocodePracticaForm practica={practica} temas={temas} />
        </main>
    );
}
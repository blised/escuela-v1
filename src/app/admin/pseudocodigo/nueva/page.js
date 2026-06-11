import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PseudocodePracticaForm from "@/components/admin/PseudocodePracticaForm";

export default async function NuevaPseudocodigoPracticaPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) notFound();

    const { data: perfil } = await supabase
        .from("usuarios").select("role").eq("id", user.id).single();
    if (perfil?.role !== "admin") notFound();

    const { data: temas } = await supabase
        .from("temas")
        .select("id, titulo, unidades(titulo)")
        .order("orden");

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-10">
        <PseudocodePracticaForm practica={null} temas={temas} />
        </main>
    );
}
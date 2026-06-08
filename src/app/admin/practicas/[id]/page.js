import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PracticaForm from "@/components/admin/PracticaForm";

export default async function EditarPracticaPage({ params }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) notFound();

    const { data: perfil } = await supabase
        .from("usuarios")
        .select("role")
        .eq("id", user.id)
        .single();

    if (perfil?.role !== "admin") notFound();

    const { data: practica } = await supabase
        .from("practicas_python")
        .select("*")
        .eq("id", id)
        .single();

    if (!practica) notFound();

    const { data: temas } = await supabase
        .from("temas")
        .select("id, titulo")
        .order("orden");

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-10">
        <PracticaForm practica={practica} temas={temas} />
        </main>
    );
}
import { createClient } from "@/lib/supabase/server";
import PythonPracticeRunner from "@/components/PythonPracticeRunner";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PracticaPage({ params }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: practica, error } = await supabase
        .from("practicas_python")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !practica) notFound();

    return (
        <main className="mx-auto max-w-5xl px-6 py-10">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← Volver al inicio
        </Link>
        <div className="mt-6">
            <PythonPracticeRunner practica={practica} />
        </div>
        </main>
    );
}
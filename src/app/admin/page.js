import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AdminClient from "@/components/admin/AdminClient";

export default async function AdminPage() {
    const supabase = await createClient();

    // Verificar que sea admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) notFound();

    const { data: perfil } = await supabase
        .from("usuarios")
        .select("role")
        .eq("id", user.id)
        .single();

    if (perfil?.role !== "admin") notFound();

    // Obtener todos los usuarios
    const { data: usuarios } = await supabase
        .from("usuarios")
        .select("*")
        .order("full_name");

    return <AdminClient usuarios={usuarios} />;
}
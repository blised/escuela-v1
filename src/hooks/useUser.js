// E:\escuela-v1\src\hooks\useUser.js
// Hook para obtener el usuario y su rol
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useUser() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();

        async function fetchUser() {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            setLoading(false);
            return;
        }

        setUser(user);

        // Obtener el rol de la tabla usuarios
        const { data } = await supabase
            .from("usuarios")
            .select("role")
            .eq("id", user.id)
            .single();

        setRole(data?.role ?? null);
        setLoading(false);
        }

        fetchUser();
    }, []);

    return { user, role, isAdmin: role === "admin", loading };
}
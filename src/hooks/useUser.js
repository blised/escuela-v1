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

        async function cargarUsuario() {
        setLoading(true);

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            setUser(null);
            setRole(null);
            setLoading(false);
            return;
        }

        setUser(user);

        const { data, error } = await supabase
            .from("usuarios")
            .select("role")
            .eq("id", user.id)
            .single();

        if (error) {
            console.log("Error al obtener rol:", error.message);
            setRole(null);
        } else {
            setRole(data?.role ?? null);
        }

        setLoading(false);
        }

        cargarUsuario();

        const {
        data: { subscription },
        } = supabase.auth.onAuthStateChange(() => {
        cargarUsuario();
        });

        return () => {
        subscription.unsubscribe();
        };
    }, []);

    return {
        user,
        role,
        isAdmin: role === "admin",
        loading,
    };
}
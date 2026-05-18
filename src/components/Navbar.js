// E:\escuela-v1\src\components\Navbar.js

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function Navbar(){
    const supabase = createClient();
    const router = useRouter();

    // const [user, setUser] = useState(null);

    const [showAdmin, setShowAdmin] = useState(false);
    const {user, isAdmin, loading} = useUser(); // Para el admin

    // check if the user is admin
    // async function verificarAdmin(usuario) {
    //     if (!usuario) {
    //         setShowAdmin(false);
    //         return;
    //     }

    //     const { data, error } = await supabase
    //     .from("usuarios")
    //     .select("role")
    //     .eq("id", usuario.id)
    //     .single();

    //     if (error) {
    //         console.log("Error al verificar admin:", error.message);
    //         setShowAdmin(false);
    //         return;
    //     }

    //     setShowAdmin(data?.role === "admin");
    // }

    // useEffect(() => {
    //     // supabase.auth.getUser().then(({ data }) => setUser(data.user));

    //     // const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    //     // setUser(session?.user ?? null);
    //     // });

    //     // return () => listener.subscription.unsubscribe();
    //     // supabase.auth.getUser().then(({ data, error }) => {
    //     //     console.log("USER:", data.user);
    //     //     console.log("ERROR:", error);
    //     //     setUser(data.user);
    //     // });
    //     async function loadUser(){
    //         const {data} = await supabase.auth.getUser();
    //         setUser(data.user ?? null);
    //         // setShowAdmin(Boolean(data.user && isAdmin));
    //         await verificarAdmin(data.user);
    //     }

    //     loadUser();

    //     const { data: listener } = supabase.auth.onAuthStateChange( async(_event, session) => {
    //         // console.log("SESSION:", session);
    //         const usuario = session?.user ?? null;
    //         setUser(usuario);
    //         await verificarAdmin(usuario);
    //         // if(!session?.user){
    //         //     setShowAdmin(false);
    //         // }
    //     });

    //     return () => listener.subscription.unsubscribe();
    // }, []);

    async function handleLogout(){
        // setUser(null);
        // setShowAdmin(false);

        // op1
        // await supabase.auth.signOut({scope:"local"}); //scope: "local" limpia solo las cookies locales
        // window.location.replace("/");
        // opt2
        await supabase.auth.signOut();
        router.replace("/");
        router.refresh();
    }
         // /admin=url to admin's panel 
    return (
        <nav className="Navbar-nav">
        {isAdmin && <Link href="/admin">Panel Admin</Link>}

        <Link href="/" className="Navbar-link1">
            Material de ciberseguridad
        </Link>

        <div>
            {!loading && user ? (
            <div className="Navbar-div2">
                {user.user_metadata?.avatar_url && (
                <img
                    src={user.user_metadata.avatar_url}
                    alt="avatar"
                    className="Navbar-img1"
                />
                )}

                <span className="Navbar-span1">
                {user.user_metadata?.full_name ?? user.email}
                </span>

                <button onClick={handleLogout} className="Navbar-button1">
                Cerrar sesión
                </button>
            </div>
            ) : (
            !loading && (
                <Link href="/login" className="Navbar-link2">
                Iniciar sesión
                </Link>
            )
            )}
        </div>
        </nav>
    );
}
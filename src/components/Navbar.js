"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Navbar(){
    const supabase = createClient();
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // supabase.auth.getUser().then(({ data }) => setUser(data.user));

        // const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        // setUser(session?.user ?? null);
        // });

        // return () => listener.subscription.unsubscribe();
        supabase.auth.getUser().then(({ data, error }) => {
            console.log("USER:", data.user);
            console.log("ERROR:", error);
            setUser(data.user);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log("SESSION:", session);
            setUser(session?.user ?? null);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    async function handleLogout(){
        await supabase.auth.signOut();
        router.refresh();
    }

    return(
        <nav className="Navbar-nav">
            <Link href='/' className="Navbar-link1">
                Material de ciberseguridad
            </Link>
            <div>
                {user ? (
                    <div className="Navbar-div2">
                        <img
                            src={user.user_metadata?.avatar_url}
                            alt="avatar"
                            className="Navbar-img1"
                        />
                        <span className="Navbar-span1">
                            {user.user_metadata?.full_name}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="Navbar-button1"
                        >
                            Cerrar sesion
                        </button>
                    </div>
                ) : (
                    <Link
                        href='/login'
                        className="Navbar-link2"
                    >
                        Iniciar sesion
                    </Link>
                )}
            </div>
        </nav>
    );
}
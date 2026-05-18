// E:\escuela-v1\src\components\login-form.js

"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const supabase = createClient();

export function LoginForm({ className = "", ...props }) {
    const [cargando, setCargando] = useState(false);
    const router = useRouter();

    // useEffect(() => {
    //     async function verificarSesion() {
    //         const {data} = await supabase.auth.getSession();
    //         // console.log("Session login page:", data.session);
    //         // console.log("Session error:", error);

    //         if(data.session){
    //             window.location.href = "/";
    //         } 
    //     }
    //     verificarSesion();
    // }, []);

    async function handleLogin(e) {
        e.preventDefault();
        setCargando(true);

        console.log("hola")
        // console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
        // console.log("KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

        // try{
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        console.log("LOGIN DATA", data);
        console.log("lOGIN ERROR:", error);

        // console.log("holaaaaaaa")

        if (error) {
            setCargando(false);
            alert(error.message);
            return;
        }
        // if (data.session){
        //     window.location.href = "/";
        // }        
        router.replace("/");
        router.refresh();
        console.log("adios")
        // } catch(err){
        //     console.error("ERROR INESPERADO LOGIN: ", err);
        //     alert("Ocurrio un error al iniciar sesion, checa la consola");
        //     setCargando(false);
        // }
    }

    async function handleGoogleLogin() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
                queryParams: {
                    prompt: "select_account"
                }
            },
        });
    }

    return (
        <div
        className={`rounded-2xl border border-slate-200 bg-white p-8 shadow-sm ${className}`}
        {...props}
        >
            <h2 className="text-xl font-bold text-slate-900">Iniciar sesión</h2>

            <p className="mt-1 text-sm text-slate-500">
                Ingresa tus datos para acceder a tu cuenta
            </p>

            <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Correo electrónico
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    required
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                    Contraseña
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    required
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <button
                    type="submit"
                    disabled={cargando}
                    className="rounded-xl bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    {cargando ? "Iniciando..." : "Iniciar sesión"}
                </button>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="rounded-xl border border-slate-200 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                Continuar con Google
                </button>

                <p className="text-center text-xs text-slate-500">
                    ¿No tienes cuenta?{" "}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Regístrate
                    </a>
                </p>
            </form>
        </div>
    );
}
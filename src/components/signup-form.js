// E:\escuela-v1\src\components\signup-form.js

"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function SignupForm(props) {
    const supabase = createClient();
    const router = useRouter();

    async function handleSignup(e) {
        e.preventDefault();
        const form = e.target;
        const fullName = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form["confirm-password"].value;

        if (password !== confirm) {
        alert("Las contraseñas no coinciden");
        return;
        }

        const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: fullName },
            // when yo get the email confirt, itll redirect to 
            // the correct page
            emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
        });

        if (error) {
        alert(error.message);
        } else {
        alert("Revisa tu correo para confirmar tu cuenta");
        router.push("/login");
        }
    }

    async function handleGoogleLogin() {
        await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
        queryParams: {
            prompt: "select_account"
        }
        });
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm" {...props}>
        <h2 className="text-xl font-bold text-slate-900">Crear cuenta</h2>
        <p className="mt-1 text-sm text-slate-500">
            Ingresa tus datos para registrarte
        </p>

        <form onSubmit={handleSignup} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">
                Nombre completo
            </label>
            <input
                id="name"
                name="name"
                type="text"
                placeholder="Juan Pérez"
                required
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

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
            <span className="text-xs text-slate-400">
                No compartiremos tu correo con nadie.
            </span>
            </div>

            <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Contraseña
            </label>
            <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-slate-400">Mínimo 8 caracteres.</span>
            </div>

            <div className="flex flex-col gap-1">
            <label htmlFor="confirm-password" className="text-sm font-medium text-slate-700">
                Confirmar contraseña
            </label>
            <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <button
            type="submit"
            className="rounded-xl bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
            Crear cuenta
            </button>

            <button
            type="button"
            onClick={handleGoogleLogin}
            className="rounded-xl border border-slate-200 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
            Registrarse con Google
            </button>

            <p className="text-center text-xs text-slate-500">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
                Inicia sesión
            </a>
            </p>
        </form>
        </div>
    );
}
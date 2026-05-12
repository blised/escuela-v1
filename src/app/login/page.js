"use client";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage(){
    const supabase = createClient();

    async function loginConGoogle(){
        await supabase.auth.signInWithOAuth({
            provider:"google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    }

    return(
        <main className="Login-main">
            <div className="Login-div">
                <h1 className="Login-h1">Iniciar sesion</h1>
                <p className="Login-p1"></p>

                <button
                    onClick={loginConGoogle}
                    className="Login-button"
                >
                    <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                    Continuar con google
                </button>
            </div>
        </main>

    );
}
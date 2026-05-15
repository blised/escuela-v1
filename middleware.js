import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request){
    let supabaseResponse = NextResponse.next({ request });

    const supabase =  createServerClient(
        process.env.NEXT_PUBLIC_SUPABASED_URL,
        process.env.NEXT_PUBLIC_SUPABASED_ANNON_KEY,
        {
            cookies: {
                getAll() {return request.cookies.getAll(); },
                setAll(cookiesToSet){
                    try{
                        cookiesToSet.forEach(({ name, value, options }) =>
                            supabaseResponse.cookies.set(name, value, options)
                        );
                    } catch{}
                },
            },
        }
    );

    const {data: {user}} = await supabase.auth.getUser();

    // Proteger rutas /admin
    if (request.nextUrl.pathname.startsWith("/Admin")){
        if (!user){
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // Verificar rol admin en la base de datos
        const {data} = await supabase
        .from("usuarios")
        .select("role")
        .eq("id", user.id)
        .single();

        if (data?.role !== "admin"){
            return NextResponse.redirect(new URL("/", request.url));
        }

        return supabaseResponse;
    }

    // await supabase.auth.getUser();

}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)" ],
};
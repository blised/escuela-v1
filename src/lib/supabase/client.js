import { createBrowserClient } from "@supabase/ssr";

export function createClient(){
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASED_URL,
        process.env.NEXT_PUBLIC_SUPABASED_ANNON_KEY
    );
}
// import { createBrowserClient } from "@supabase/ssr";
// aperently there is a bug with the import on top, where a normal
// user logs, after he puts his/her email and password it doesnt redirect
// to the my main page.
import { createBrowserClient } from "@supabase/ssr";

let supabaseBrowserClient = null;

export function createClient() {
    if (supabaseBrowserClient) {
        return supabaseBrowserClient;
    }

    supabaseBrowserClient = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    return supabaseBrowserClient;
}
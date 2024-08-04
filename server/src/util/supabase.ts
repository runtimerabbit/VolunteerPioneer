import { createClient } from "@supabase/supabase-js";
const url = process.env.SUPABASE_URL || "";
const key = process.env.SUPABASE_KEY || "";

const options = {
    db : {
        schema: "public",
    },
    auth: {
        autoRefreshToken: true,
    }
}

const supabase = createClient(url, key, options)

export {supabase}
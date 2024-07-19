import { supabase } from "../util/supabase";

async function signup(email: string, password: string) {
    const {data, error} = await supabase.auth.signUp ({email, password});
    if (error) {
        return {
            status: 500,
            error: error.message
        }
    }
    return {
        status: 201,
        data: data.session?.access_token
    }
}

async function login(email: string, password: string) {
    const {data, error} = await supabase.auth.signInWithPassword ({email, password})
    if (error) {
        return {
            status: 500,
            error: error.message
        }
    }
    return {
        status: 200,
        data: data.session?.access_token
    }
}

export {signup, login}
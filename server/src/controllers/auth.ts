import { supabase } from "../util/supabase";

async function signup(email: string, password: string, username: string, accountType: string ) {
    const {data, error} = await supabase.auth.signUp ({email, password});
    if (error) {
        console.log(error)
        return {
            status: 500,
            error: error.message
        }
    }
    const {data: userData, error: userError} = await supabase.from("users").insert([{id: data.user.id, username, role: accountType}]).select();
    if (userError) {
        console.log(userError)
        return {
            status: 500,
            error: userError.message
        }
    }
    if (userData.length === 0) {
        return {
            status: 409,
            error: "user creation failed"
        }
    }
    return {
        status: 201,
        data: data.session?.access_token
    }
}

async function login(email: string, password: string) {
    const {data, error} = await supabase.auth.signInWithPassword ({
        email: email, 
        password: password
    });
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

async function logout(){
    const { error } = await supabase.auth.signOut()
    if (error) {
        return {
            status: 500,
            error: "Could not sign out. Welp."
        }
    }
    return {
        status:200
    }
}

export {signup, login, logout}
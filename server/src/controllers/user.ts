import { error } from "console";
import { supabase } from "../util/supabase";

const createUser = async (username: string, profilePicture: string, userId: string, role: string) => {
    const { data: profileData } = await supabase.from("users").select().eq("id", userId);
    if (profileData.length > 0){
        return {status: 409, error: "User already exists"}
    }
    const { error: uploadError } = await supabase.storage.from("profile_pictures").upload(`${userId}.png`, profilePicture)
    if (uploadError) {
        return {status: 500, error: uploadError}
    }
    const {data:pictureData} = await supabase.storage.from("profile_pictures").getPublicUrl(`${userId}.png`);
    const {data, error} = await supabase.from("users").insert([
    {
        id: userId,
        username,
        role: role,
        profile_picture: pictureData.publicUrl
    }
    ]).select().single();
    if (error){
        return {status: 500, error: error.message}
    }
    return {status: 201, data}
}

const getUser = async (userId: string) => {
    const { data, error } = await supabase.from("users").select().eq("id", userId).single()
    if (error){
        return {error, status:500}
    }
    if (!data){
        return {status:404, error: "User not found"}
    }
    return {data, status:200}
}

export {getUser, createUser}
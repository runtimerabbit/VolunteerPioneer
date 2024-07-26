import { supabase } from "../util/supabase"

const createEvent = async (title: string, description: string, date: string, location: string, creator: string) => {
    const { data, error } = await supabase.from("events").insert([
        { title, description, date, location, creator }
    ])
    if (error) {
        console.log(error)
        return { error }
    }
    return data
}

const getEvents = async () => {
    const { data, error } = await supabase.from("events").select()
    if (error) {
        console.log(error)
        return { error }
    }
    return data
}

const deleteEvent = async (eventId: string) => {
    const { data, error } = await supabase.from("events").delete().eq("id", eventId)
    if (error) {
        console.log(error)
        return { error }
    }
    return data
}

const updateEvent = async (eventId: string, title: string, description: string, date: string, location: string, creator: string) => {
    const { data, error } = await supabase.from("events").update({ title, description, date, location, creator }).eq("id", eventId)
    if (error) {
        console.log(error)
        return { error }
    }
    return data
}
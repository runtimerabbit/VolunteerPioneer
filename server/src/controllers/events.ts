import { supabase } from "../util/supabase"

const createEvent = async (title: string, description: string, date: string, location: string, creator: string) => {
    const { data, error } = await supabase.from("events").insert([
        { title, description, date, location, creator }
    ])
    if (error) {
        console.log(error)
        return { error, status:500 }
    }
    return {data, status:201}
}

const getEvents = async () => {
    const { data, error } = await supabase.from("events").select()
    if (error) {
        console.log(error)
        return { error, status:500 }
    }
    return {data, status:200}
}

const getEvent = async (id: string) => {
    const { data, error } = await supabase.from("events").select().eq("id", id)
    if (error) {
        console.log(error)
        return { error, status:500 }
    }
    return {data, status:200}
}

const deleteEvent = async (eventId: string, userId: string) => {
     const { data:evtdata } = await supabase.from("events").select().eq("id", eventId).single();
    if (!evtdata) {
        return {error:"Not Found", status:404}
    }
    if (evtdata.creator !== userId) {
        return { error:"Forbidden", status:403 }
    }
    
    const { data, error } = await supabase.from("events").delete().eq("id", eventId)
    if (error) {
        console.log(error)
        return { error, status:500 }
    }
    return {data, status:200}
}

const updateEvent = async (eventId: string, title: string, description: string, date: string, location: string, userId: string) => {
    const { data:evtdata } = await supabase.from("events").select().eq("id", eventId).single();
    if (!evtdata) {
        return {error:"Not Found", status:404}
    }
    if (evtdata.creator !== userId) {
        return { error:"Forbidden", status:403 }
    }

    const { data, error } = await supabase.from("events").update({ title, description, date, location, creator:userId }).eq("id", eventId)
    if (error) {
        console.log(error)
        return { error, status:500 }
    }
    return {data, status:200}
}

export { createEvent, updateEvent, deleteEvent, getEvents, getEvent }
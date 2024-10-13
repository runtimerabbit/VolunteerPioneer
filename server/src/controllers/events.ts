import { supabase } from "../util/supabase"

const createEvent = async (title: string, description: string, date: string, location: string, creator: string, lat: string, long: string) => {
    const { data, error } = await supabase.from("events").insert([
        { title, description, date, location, creator, lat, long }
    ]).select();
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
    const { data, error } = await supabase.from("events").select().eq("id", id);
    if (error) {
        console.log(error)
        return { error, status:500 }
    }
    return {data, status:200}
}

const getUserEvents = async (userId: string) => {
    const { data, error } = await supabase.from("events").select().eq("creator", userId)
    if (error) {
        console.log(error)
        return { error, status:500 }
    }
    return {data, status:200}
}

const getEventParticipants = async(eventId: string) => {
    const { data, error } = await supabase.from("participants").select("userId").eq("eventId", eventId)
    if (error) {
        return { error, status:500 }
    }
    return {
        data: data.length,
        status: 200
    }
}
const getParticipatingEvents = async(userId: string) => {
    const { data, error } = await supabase.from("participants").select("eventId").eq("userId", userId)
    if (error) {
        console.error(error)
        return { error, status:500 }
    }
    let events: any[] = []
    for(let eventData of data){
        const eventId = eventData.eventId;
        const { data: event, error: eventError } = await supabase.from("events").select().eq("id", eventId);
        if(eventError){
            console.error(`${eventId} errored`);
        } else {
            console.info(`Event: ${event}, ${eventId}`)
            events.push(event);
        }
    }
    return {
        data: events,
        status: 200
    }
}

const optIn = async (userId: string, eventId: string) => {
    const { data, error } = await supabase.from("participants").insert([{userId, eventId}]).select()
    if (error){
        return {error, status: 500}
    }
    return { data, status:200 }
}

const optOut = async (userId: string, eventId: string) => {
    const { data:evtCheck } = await supabase.from("participants").select().eq("eventId", eventId).eq("userId", userId);
    if(!evtCheck || evtCheck.length === 0){
        return { error: "Not Found", status: 404};
    }
    const { data:evtdata, error } = await supabase.from("participants").delete().eq("eventId", eventId).eq("userId", userId);
    if (error){
        return {
            error,
            status: 500
        }
    }
    return { data: "Opted out. Lazy", status: 200 }
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

const searchEvents = async (title: string) => {
    const { data: title_events, error: title_events_error } = await supabase.from("events").select().ilike("title", `%${title}%`)
    const { data: location, error: location_error } = await supabase.from("events").select().ilike("location", `%${title}%`);

    let events: any[] = [];
    let event_ids: string[] = [];

    if (title_events){
        for (let event of title_events){
            events.push(event)
            event_ids.push(event.id);
        }
    }
    if (location){
        for (let event of location){
            if (!event_ids.includes(event.id)){
                events.push(event)
            }
        }
    }

    if (title_events_error){
        return {title_events_error, status: 404}
    }
    if (location_error){
        return {location_error, status: 404}
    }
    return {data: events, status: 200}
}

export { createEvent, updateEvent, deleteEvent, getEvents, getEvent, getUserEvents, getParticipatingEvents, optIn, optOut, getEventParticipants, searchEvents }
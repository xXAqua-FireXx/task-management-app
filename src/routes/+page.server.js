import { db } from "$lib/server/db";
import { task } from "$lib/server/db/schema";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function load({url}) {
    const data = await db.select().from(task)
    const names = data.map(item=>item.name)
    const sessionName = url.searchParams.get('session')
    let toLoad
    if(sessionName){
        console.log('huh')
        const scooped = await db.select().from(task).where(eq(task.name,sessionName))
        toLoad = (scooped.map(item=>item.tasks))[0]
        console.log(sessionName)
    }
    return {names,toLoad}
}
export const actions = {
    save:async ({request}) => {
        console.log("called me")
        const res = await request.formData()
        const arrayString = res.get('tasks')
        const sessionName = res.get('session-name')
        const array = JSON.parse(arrayString)
        const main = []
        array.map(item=>main.push(item.name))
        try{
            await db.insert(task).values({
                name:sessionName,
                tasks:main
            })
        }catch(err){
            console.log(err)
        }
        console.log(main,sessionName)
    },
    load:async ({request})=>{
        const res = await request.formData()
        const name = res.get('name')
        
        throw redirect(303,`/?session=${encodeURIComponent(name)}`)
    }
}
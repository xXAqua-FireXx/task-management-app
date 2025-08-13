import { db } from "$lib/server/db";
import { task } from "$lib/server/db/schema";

export async function load() {
    const data = await db.select().from(task)
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
    }
}
<script>
    let tasks = $state([]);
    let newTask = $state("");
    let f_done = $state(false)
    let f_pending = $state(false)
</script>

<main class="flex flex-col gap-10 items-center p-5">
    <h1 class="text-3xl bold">Yout task management app!</h1>
    <div class="adder p-3 flex flex-col rounded-2xl bg-zinc-500 text-white gap-4 items-center">
        <h2 class="text-xl">Add your tasks</h2>
        <div class="name">
            <label for="name">task name</label><input
                class=" bg-transparent border-0 border-b-2 border-amber-50 rounded-sm"
                bind:value={newTask}
                type="text"
                name="name"
                id="name"
            />
        </div>
        <button
            class="p-1 bg-white text-black rounded-2xl hover:bg-zinc-200 w-full"
            onclick={() => {
                if(newTask){tasks.push({name:newTask,iscomplete:false})};
            }}>add</button
        >
    </div>
    {#if tasks.length}
    <div class="filter flex flex-col">
        <div><label for="completed">Show only completed tasks</label>
        <input bind:checked={f_done} onchange={()=>{f_pending = false}} type="checkbox" name="completed" id="completed"></div>
        <div><label for="incomplete">Show only incomplete tasks</label>
        <input bind:checked={f_pending} onchange={()=>{f_done = false}} type="checkbox" name="incomplete" id="incomplete"></div>
    </div>
    {/if}
    <div class="tasks flex flex-col gap-3">
        {#each tasks as task,i}
        {#if !f_done && !f_pending} 
        {@render smth(task,tasks,i)}
        {/if}
        {#if f_done && !f_pending}
            {#if task.iscomplete}
                {@render smth(task,tasks,i)}
            {/if}
        {/if}
        {#if !f_done && f_pending}
            {#if !task.iscomplete}
                {@render smth(task,tasks,i)}
            {/if}
        {/if}
        {/each}
        
    </div>
</main>

{#snippet smth(arg,args,i)}
    <div class="task flex flex-row gap-2 {arg.iscomplete? 'bg-zinc-400':"bg-blue-600"} text-white p-3 items-center rounded-sm w-80 justify-between">
            <p>{arg.name}</p>
            <div class="ops">
                {#if !arg.iscomplete}
                    <button class="p-1 aspect-square h-8 rounded-md bg-green-500 hover:bg-green-600" onclick={()=>{arg.iscomplete=true}}>✓</button>
                {/if}
                <button class="p-1 aspect-square h-8 rounded-md bg-red-500 hover:bg-red-600" onclick={()=>{args.splice(i,1)}}>x</button>
            </div>
        </div>
{/snippet}

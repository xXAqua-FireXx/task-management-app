<script>
    let tasks = $state([]);
    let newTask = $state("");
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
        <div class="filter">
        <label for="completed">Show only completed tasks</label>
        <input type="checkbox" name="completed" id="completed">
        <label for="incomplete">Show only incomplete tasks</label>
        <input type="checkbox" name="incomplete" id="incomplete">
    </div>
    {/if}
    <div class="tasks flex flex-col gap-3">
        {#each tasks as task,i}
            <div class="task flex flex-row gap-2 {task.iscomplete? 'bg-zinc-400':"bg-blue-600"} text-white p-3 items-center rounded-sm w-80 justify-between">
            <p>{task.name}</p>
            <div class="ops">
                {#if !task.iscomplete}
                    <button class="p-1 aspect-square h-8 rounded-md bg-green-500 hover:bg-green-600" onclick={()=>{task.iscomplete=true}}>✓</button>
                {/if}
                <button class="p-1 aspect-square h-8 rounded-md bg-red-500 hover:bg-red-600" onclick={()=>{tasks.splice(i,1)}}>x</button>
            </div>
        </div>
        {/each}
    </div>
</main>

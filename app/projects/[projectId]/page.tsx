import { prisma } from "@/lib/prisma"
import { createTask } from "./actions"

const page = async ({params} : {params : {projectId : string}}) => {
    const { projectId } = await params
    try{
        const project = await prisma.project.findUnique({
            where : {
                id : projectId
            }, 
            include :{
                tasks : true
            }
        })

        if(project){
            return(
                <main>
                <h1>{project.name}</h1>
                {project.tasks.length===0 ? (<>No Tasks Yet</>) :(
                    <>
                    {project.tasks.map((task)=>(
                        <div key={task.id}>{task.title} {task.status}</div>
                    ))}
                    </>
                ) 
                }
                <form action={createTask} className="mt-4 flex gap-2">
                    <input
                    name="taskName"
                    type="text"
                    placeholder="Task name"
                    className="border py-2 rounded w-64 placeholder:text-neutral-500 px-4 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
                    />
                    <input type="hidden" name="projectId" value={projectId} />
                    <button className="border px-4 py-2 rounded cursor-pointer">
                    Add Task
                    </button>
                </form>
                </main>
            )
        }
        return(
            <main>
            <h1>Project Doesn't Exists</h1>
            </main>
        )
    }catch(e){
        return (
        <div>
            Error!
        </div>
    )
    }
    
}

export default page

import { prisma } from "@/lib/prisma"
import { createTask, deleteTask } from "./actions"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

const page = async ({params} : {params : {projectId : string}}) => {
    noStore()
    const { projectId } = await params
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");
    try{
        const project = await prisma.project.findFirst({
            where : {
                id : projectId,
                userId : session.user.id
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
                    {project.tasks.map((task) => (
                        <div
                        key={task.id}
                        className="flex items-center justify-between border rounded px-3 py-2 mb-2"
                        >
                        <span>{task.title}</span>
                        <form action={deleteTask}>
                        <input type="hidden" name="taskId" value={task.id} />
                        <input type="hidden" name="projectId" value={project.id} />
                        <button
                        type="submit"
                        className="text-sm text-red-600 hover:underline"
                        >
                        Delete
                        </button>
                        </form>
                        </div>
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

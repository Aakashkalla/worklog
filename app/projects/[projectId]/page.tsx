import { prisma } from "@/lib/prisma"

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
                        <div key={task.id}>{task.title}</div>
                    ))}
                    </>
                ) 
                }
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

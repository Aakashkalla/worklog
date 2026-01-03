import { prisma } from "@/lib/prisma"

const page = async ({params} : {params : {projectId : string}}) => {
    const { projectId } = await params
    console.log(projectId)
    try{
        const project = await prisma.project.findUnique({
            where : {
                id : projectId
            }
        })

        if(project){
            return(
                <main>
                <h1>{project.name}</h1>
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

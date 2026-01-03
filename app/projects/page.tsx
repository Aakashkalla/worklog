import { createProject } from './actions'
import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

 const Project = async () => {
    const session = await getServerSession();
    if(!session){
      redirect('/login')
    }
    const userId = session.user.id;
    const projects = await prisma.project.findMany({
      where : {
        userId
      }
    });
  return (
    <main className="p-6">
        <h1 className="text-2xl font-semibold">Projects</h1>

        <form action={createProject} className="mt-4 flex gap-2">
            <input
            name="projectName"
            type="text"
            placeholder="Project name"
            className="border py-2 rounded w-64 placeholder:text-neutral-500 px-4 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
            />
            <button className="border px-4 py-2 rounded cursor-pointer">
            Add
            </button>
        </form>

        <div className="mt-6">
        {projects.length === 0 ? (
        <p className="text-gray-500">No projects yet</p>
        ) : (
        projects.map((project) => (
        <div key={project.id}>{project.name}</div>
        ))
        )}
        </div>
    </main>
  )
}

export default Project

import { createProject, deleteProject } from './actions'
import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { authOptions } from '../api/auth/[...nextauth]/route';
import Link from "next/link";

 const Project = async () => {
    noStore()
    const session = await getServerSession(authOptions);
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
          <div
          key={project.id}
          className="flex items-center justify-between rounded border px-4 py-3 mb-2"
          >
          <Link
          href={`/projects/${project.id}`}
          className="font-medium hover:underline"
          >
          {project.name}
          </Link>

          <form action={deleteProject}>
          <input type="hidden" name="projectId" value={project.id} />
          <button
          type="submit"
          className="text-sm text-red-600 hover:underline"
          >
          Delete
          </button>
          </form>
          </div>
          ))
        )}
        </div>
    </main>
  )
}

export default Project

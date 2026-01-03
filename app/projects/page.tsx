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
    <main className="min-h-screen bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Projects
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your projects and tasks
          </p>
        </div>

        {/* Create project */}
        <form
          action={createProject}
          className="mb-8 flex gap-3"
        >
          <input
            name="projectName"
            type="text"
            placeholder="New project name"
            className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
          <button
            type="submit"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition cursor-pointer"
          >
            Add project
          </button>
        </form>

        {/* Project list */}
        <div className="space-y-2">
          {projects.length === 0 ? (
            <div className="rounded-md border border-dashed bg-white p-6 text-center text-sm text-neutral-500">
              No projects yet. Create your first one.
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between rounded-md border bg-white px-4 py-3"
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="font-medium text-neutral-900 hover:underline"
                >
                  {project.name}
                </Link>

                <form action={deleteProject}>
                  <input
                    type="hidden"
                    name="projectId"
                    value={project.id}
                  />
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
      </div>
    </main>
  );
};

export default Project;
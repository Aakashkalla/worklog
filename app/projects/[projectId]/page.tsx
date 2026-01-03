import { prisma } from "@/lib/prisma"
import { createTask, deleteTask } from "./actions"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

const page = async ({params} : {params : {projectId : string}}) => {
    noStore()
    const { projectId } = await params
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");
        const project = await prisma.project.findFirst({
            where : {
                id : projectId,
                userId : session.user.id
            }, 
            include :{
                tasks : true
            }
        })

        if (!project) {
    return (
      <main className="min-h-screen bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-xl font-semibold text-neutral-900">
            Project not found
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            This project does not exist or you don’t have access.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="text-sm text-neutral-500 hover:underline"
          >
            ← Back to projects
          </Link>

          <h1 className="mt-2 text-2xl font-semibold text-neutral-900">
            {project.name}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage tasks for this project
          </p>
        </div>

        {/* Add task */}
        <form
          action={createTask}
          className="mb-8 flex gap-3"
        >
          <input
            name="taskName"
            type="text"
            placeholder="New task"
            className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
          <input type="hidden" name="projectId" value={projectId} />
          <button
            type="submit"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition"
          >
            Add task
          </button>
        </form>

        {/* Tasks list */}
        <div className="space-y-2">
          {project.tasks.length === 0 ? (
            <div className="rounded-md border border-dashed bg-white p-6 text-center text-sm text-neutral-500">
              No tasks yet. Add your first task above.
            </div>
          ) : (
            project.tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-md border bg-white px-4 py-3"
              >
                <span className="text-sm text-neutral-900">
                  {task.title}
                </span>

                <form action={deleteTask}>
                  <input type="hidden" name="taskId" value={task.id} />
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

export default page;
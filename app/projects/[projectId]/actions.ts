"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createTask(formData : FormData){
    const taskName = formData.get("taskName");
    const projectId = formData.get("projectId")
    if (!taskName) return;
    if (typeof taskName !== "string") return;

    if(!projectId) return;
    if (typeof projectId !== "string") return;

    const trimmedName = taskName.trim();
    if (trimmedName.length === 0) return;

    await prisma.task.create({
        data : {
            title : trimmedName,
            projectId : projectId as string,
            status : "todo"
        }
    })

    revalidatePath(`/projects/${projectId}`)
}

export async function deleteTask(formData:FormData){
    const taskId = formData.get("taskId");
    const projectId = formData.get("projectId");

    if (!taskId || typeof taskId !== "string") return;
    if (!projectId || typeof projectId !== "string") return;

    const session = await getServerSession(authOptions);
    if (!session) return;

    await prisma.task.deleteMany({
    where: {
        id: taskId,
        project: {
            userId: session.user.id,
            },
        },
    });

    revalidatePath(`/projects/${projectId}`);
}
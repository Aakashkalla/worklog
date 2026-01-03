"use server"

import { prisma } from "@/lib/prisma";
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
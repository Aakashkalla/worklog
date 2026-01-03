"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProject(formData : FormData){
    const projectName = formData.get("projectName");
    if (!projectName) return;
    if (typeof projectName !== "string") return;

    const trimmedName = projectName.trim();
    if (trimmedName.length === 0) return;

    await prisma.project.create({
        data : {
            name : trimmedName
        }
    })

    revalidatePath('/projects')
}
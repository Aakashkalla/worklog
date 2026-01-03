"use server"
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function createProject(formData : FormData){
    const session = await getServerSession(authOptions);
    if (!session) return;
    const userId = session.user.id;
    const projectName = formData.get("projectName");
    if (!projectName) return;
    if (typeof projectName !== "string") return;

    const trimmedName = projectName.trim();
    if (trimmedName.length === 0) return;

    await prisma.project.create({
        data : {
            name : trimmedName,
            userId,
        }
    })

    revalidatePath('/projects')
}

export async function deleteProject(formData : FormData) {
    const session = await getServerSession(authOptions);
    if (!session) return;
    const userId = session.user.id;
    const projectId = formData.get("projectId")
    if (!projectId || typeof projectId !== "string") return;

    await prisma.project.deleteMany({
    where: {
        id: projectId,
        userId,
    },
  });

    revalidatePath('/projects')
}
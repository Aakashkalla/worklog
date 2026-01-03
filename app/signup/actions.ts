"use server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt";

export async function createUser(formData : FormData){
    const email = formData.get("email")
    const password = formData.get("password")

    if (!email || typeof email !== "string") return;
    if(!password || typeof password !== "string") return;
    if(password.length< 6) return

    const lowercaseEmail = email.toLowerCase();

    const exstUser = await prisma.user.findUnique({
        where : {
            email : lowercaseEmail
        }
    })

    if(exstUser) return;

    const hashedPassword = await bcrypt.hash(password,10);

    await prisma.user.create({
        data : {
            email : lowercaseEmail,
            password : hashedPassword
        }
    })

}
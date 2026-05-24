'use server'

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updatePost(id: number, title: string) {
    await prisma.post.update({
        where: {
            id
        },
        data: {
            title
        }
    })
    revalidatePath("/")
}
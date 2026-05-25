'use server'

import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";


export async function deletePost(id: number) {
    const session = await auth()

    if (!session?.user?.email) {
        throw new Error("ログインが必要です")
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email
        }
    })

    if (!user) {
        throw new Error("ユーザーが見つかりません")
    }

    const post = await prisma.post.findUnique({
        where: {
            id
        }
    })

    if (!post) {
        throw new Error("投稿が存在しません")
    }

    if (post.userId !== user.id) {
        throw new Error("権限がありません")
    }

    await prisma.post.delete({
        where: { id }
    })
    revalidatePath("/")
}
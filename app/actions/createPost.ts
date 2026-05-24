'use server'

import { prisma } from '@/src/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
    const title = formData.get('title')

    if (!title || typeof title !== "string") { return }
    await prisma.post.create({
        data: {
            title,
        },
    })
    // DB更新後に画面再取得。
    revalidatePath('/')
}
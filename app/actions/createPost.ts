'use server'

import { auth } from '@/auth'
import { prisma } from '@/src/lib/prisma'
import { revalidatePath } from 'next/cache'
import { email } from 'zod'

export async function createPost(data: { title: string }) {
    const session = await auth()
    if (!session?.user?.email) {
        throw new Error("ログインが必要です")
    }
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })
    if (!user) {
        throw new Error("ユーザーが見つかりません")
    }
    await prisma.post.create({
        data: {
            title: data.title,
            userId: user.id
        }
    })
    // DB更新後に画面再取得。
    revalidatePath('/')
}
// 'use server'

// import { prisma } from '@/src/lib/prisma'
// import { revalidatePath } from 'next/cache'

// export async function createPost(formData: FormData) {
//     const title = formData.get('title')

//     if (!title || typeof title !== "string") { return }
//     await prisma.post.create({
//         data: {
//             title,
//         },
//     })
//     // DB更新後に画面再取得。
//     revalidatePath('/')
// }
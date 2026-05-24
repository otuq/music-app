import { prisma } from "@/src/lib/prisma"
import EditForm from "./EditForm";

type Props = {
    params: Promise<{
        id: string
    }>
}

export default async function EditPage({ params }: Props) {
    const { id } = await params
    const post = await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    })
    if (!post) { return <p>Post not found</p> }

    return (
        <main className="p-10">
            <EditForm post={post} />
        </main>
    )
}
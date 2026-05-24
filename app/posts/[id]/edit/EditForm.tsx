"use client"

import { updatePost } from "@/app/actions/updatePost"
import { useForm } from "react-hook-form"


type Post = {
    id: number
    title: string
}
type Props = {
    post: Post
}

type FormData = {
    title: string
}

export default function EditForm({ post }: Props) {
    const { register, handleSubmit } =
        useForm<FormData>({
            defaultValues: { title: post.title }
        })

    const onSubmit = async (data: FormData) => {
        await updatePost(post.id, data.title)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm">
            <input {...register("title")} className="border px-2" />
            <button className="border px-2">Update</button>
        </form>
    )
}
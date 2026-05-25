"use client"

import z from "zod";
import { createPost } from "../actions/createPost";
import { useForm } from "react-hook-form";

const schema = z.object({
    title: z
        .string()
        .min(1, "タイトル必須")
})

type FormData = z.infer<typeof schema>

export default function PostForm() {
    const { register, handleSubmit, reset } = useForm<FormData>()
    const onSubmit = async (data: FormData) => {
        await createPost(data)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-sm">
            <input
                type="text"
                {...register("title")}
                placeholder="title"
                className="border p-2"
            />
            <button className="border p-5" >Submit</button>
        </form>
    )
}
// "use client"

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import z from "zod";
// import { createPost } from "../actions/createPost";
// import { type } from '../../.next/dev/types/routes.d';

// const schema = z.object({
//     title: z
//         .string()
//         .min(1, "タイトル必須")
// })

// type FormData = z.infer<typeof schema>

// export default function PostForm() {
//     // const { register, handleSubmit, formState: { errors } } = useForm({
//     //     resolver: zodResolver(schema)
//     // })

//     return (
//         <form action={createPost} className="flex flex-col max-w-sm">
//             <input type="text" name="title" className="border p-5" />
//             <button className="border p-5" >Submit</button>

//             {/* <input type="text" {...register("title")} className="border p-5" />
//             {errors.title && (errors.title.message)}
//             <button className="border p-5" >Submit</button> */}
//         </form>
//     )
// }
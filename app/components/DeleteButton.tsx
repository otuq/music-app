"use client"

import { deletePost } from "../actions/deletePost";

type Props = {
    id: number
}

export default function DeleteButton({ id }: Props) {
    return (
        <button onClick={async () => await deletePost(id)}
            className="border px-2">Delete</button>
    )
}
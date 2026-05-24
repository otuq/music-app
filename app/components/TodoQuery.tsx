"use client"
import { useQuery } from "@tanstack/react-query";

type Todo = {
    useId: number
    id: number
    title: string
    completed: boolean
}

export default function TodoQuery() {
    const { data, isLoading } = useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
            return await (response.json()) as Todo[]
        }
    })
    console.log(data)
    if (isLoading) { <p>Loading</p> }
    return (
        <ul className="space-y-5">
            {data?.map((todo) => (
                <li key={todo.id}>{todo.title}</li>))}
        </ul>
    )
}
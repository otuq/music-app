"use client"

type Todo = {
    id: number
    title: string
}
type Props = {
    todos: Todo[]
    className: string
}

export default function TodoList({ 
    todos,
    className,
    ...props
 }: Props) {
    return (
        <ul className={className}{...props}>
            {todos.map((todo)=>(
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    )
}
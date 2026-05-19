import TodoList from './components/TodoList';
import Counter from './components/Counter';

type Todo = {
  id: number;
  title: string;
}

export default async function HomePage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
  const todos: Todo[] = await response.json()
  return (
    <main className="p-5">
      <h1 className="text-2xl mb-10">Todo List</h1>
      <TodoList todos={todos} className="space-y-10" />
      <Counter />
    </main>
  )
}
"use client"

import { useCounterStore } from "@/src/stores/counterStore"

export default function Counter() {
    const { count, increment } = useCounterStore()
    return (
        <div className="space-y-4 mt-5">
            <p>{count}</p>
            <button onClick={increment} className="border px-5 py-1 rounded-2xl bg-fuchsia-300">btn</button>
        </div>
    )
}
import { create } from 'zustand';

type CounterProps = {
    count: number;
    increment: () => void;
}

export const useCounterStore =
    create<CounterProps>((set) => ({
        count: 0,
        increment() {
            set((state) => ({
                count: state.count + 1
            }))
        },
    }))

import {create} from "./index"

type Count = {
    count: number
    increase: () => void
    increaseAsync: () => Promise<void>
}

export const useCountStore = create<Count>((set, get) => ({
    count: 0,
    increase: () => set(state => ({count: state.count + 1})),
    async increaseAsync() {
        await new Promise(res => setTimeout(res, 2000))
        set(state => ({count: state.count + 2}))
    },
}))

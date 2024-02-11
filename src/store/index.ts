import {useSyncExternalStore} from "react"

type Listener = () => void
interface StoreApi<T> {
    setState: <R>(func: (state: T) => T | Partial<T> | R) => void
    getState: () => T
    subscribe: (listener: Listener) => () => void
}

type StoreCreator<T> = (
    setState: StoreApi<T>["setState"],
    getState: StoreApi<T>["getState"],
) => T

const listeners: Set<Listener> = new Set()

function useStore<T, R>(api: StoreApi<T>, selector: (state: T) => R) {
    const state = api.getState()
    const s = useSyncExternalStore(api.subscribe, () => selector(state))

    return s
}

function create<TState>(createState: StoreCreator<TState>) {
    let state: TState

    const getState: StoreApi<TState>["getState"] = () => state

    const setState: StoreApi<TState>["setState"] = f => {
        state = Object.assign(state, f(state))
        listeners.forEach(l => l())
    }

    const subscribe: StoreApi<TState>["subscribe"] = listener => {
        listeners.add(listener)
        return () => {
            listeners.delete(listener)
        }
    }

    state = createState(setState, getState)

    const api: StoreApi<TState> = {getState, setState, subscribe}

    const _useBoundStore = <R>(selector: (state: TState) => R) => {
        return useStore(api, selector)
    }

    const useBoundStore = Object.assign(_useBoundStore, api)

    return useBoundStore
}

export {create}

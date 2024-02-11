import {create} from "./index"

type TodoItem = {
    id: string
    status: boolean
    name: string
}

type Todo = {
    todoList: TodoItem[] | []
    addItem: (item: Omit<TodoItem, "id" | "status">) => void
    deleteItem: (id: string) => void
}

const useTodoList = create<Todo>((set, get) => ({
    todoList: [],
    addItem: item =>
        set(state => {
            return {
                todoList: [
                    ...state.todoList,
                    {
                        id: Math.random().toString(16).substring(2),
                        name: item.name,
                        status: false,
                    },
                ],
            }
        }),
    deleteItem: id =>
        set(state => {
            const filtered = state.todoList.filter(item => item.id !== id)
            return {
                todoList: filtered,
            }
        }),
}))

export {useTodoList}

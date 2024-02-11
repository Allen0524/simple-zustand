import {useRef} from "react"
import "./App.css"
import {useCountStore} from "./store/count"
import {useTodoList} from "./store/todoList"

function App() {
    const count = useCountStore(s => s.count)
    const increase = useCountStore(s => s.increase)
    const increaseAsync = useCountStore(s => s.increaseAsync)
    return (
        <div>
            <p>count:{count}</p>
            <button onClick={increase}>increase</button>
            <button onClick={increaseAsync}>increase async</button>
            <div className="spacer-64" />
            <Todo />
        </div>
    )
}

function Todo() {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const todoList = useTodoList(state => state.todoList)
    const addItem = useTodoList(state => state.addItem)
    const deleteItem = useTodoList(state => state.deleteItem)
    console.log(todoList)
    return (
        <div>
            {todoList.map(item => (
                <div key={item.id} className="item__block">
                    <p className="item__name">{item.name}</p>
                    <button
                        className="item__delete__btn"
                        onClick={() => {
                            deleteItem(item.id)
                        }}
                    >
                        delete
                    </button>
                </div>
            ))}
            <form
                onSubmit={event => {
                    event.preventDefault()
                    if (!inputRef.current) return
                    const name = inputRef.current.value
                    addItem({name})
                    inputRef.current.value = ""
                }}
            >
                <input ref={inputRef} type="text" />
                <button type="submit">add item</button>
            </form>
        </div>
    )
}

export default App

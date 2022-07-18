import { todos } from './todosType'
import {useState} from 'react'

type Props = {
    setPendingTodos: React.Dispatch<React.SetStateAction<todos[]>>,
    pendingTodos: todos[]
}

let Input: React.FC<Props> = (props) => {
    let [todo, setTodo] = useState("");

    return (
        <div className='container_input'>
            <input type='text' value={todo} spellCheck="false" onChange={(e) => {
                setTodo(e.currentTarget.value);
            }} />
            <button onClick={() => {
                if (todo === '') return;
                props.setPendingTodos([...props.pendingTodos, { todo: todo, status: 'pending', id: Date.now() }])
                setTodo('')
            }}>Add</button>
        </div>
    )
}

export default Input;
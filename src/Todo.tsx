import { todos } from "./todosType"
import { useState } from 'react'
import { Draggable } from "react-beautiful-dnd"

type Props = {
    todo: todos,
    status: 'pending' | 'completed',
    pendingTodos: todos[],
    setPendingTodos: React.Dispatch<React.SetStateAction<todos[]>>,
    completedTodos: todos[],
    setCompletedTodos: React.Dispatch<React.SetStateAction<todos[]>>,
    idx: number
}

const Todo: React.FC<Props> = (props) => {

    let handleDelete = () => {
        let temp: todos[]
        if (props.status === 'pending')
            temp = JSON.parse(JSON.stringify(props.pendingTodos));
        else
            temp = JSON.parse(JSON.stringify(props.completedTodos));
        temp = temp.filter((el: todos) => {
            return el.id !== props.todo.id
        })
        if (props.status === 'pending')
            props.setPendingTodos(temp);
        else
            props.setCompletedTodos(temp);
    }

    let handleStateChange = (newStatus: "completed" | 'pending') => {
        let temp: todos[]
        let obj: todos = { ...props.todo, status: newStatus }
        if (newStatus === 'pending') {
            temp = JSON.parse(JSON.stringify(props.pendingTodos));
            props.setPendingTodos([...temp, obj]);
            temp = JSON.parse(JSON.stringify(props.completedTodos));
            temp.forEach((el, index) => {
                if (el.id === obj.id) {
                    temp.splice(index, 1);
                    props.setCompletedTodos(temp);
                }
            })
        }
        else {
            temp = JSON.parse(JSON.stringify(props.completedTodos));
            props.setCompletedTodos([...props.completedTodos, obj]);
            temp = JSON.parse(JSON.stringify(props.pendingTodos));
            temp.forEach((el, index) => {
                if (el.id === obj.id) {
                    temp.splice(index, 1);
                    props.setPendingTodos(temp);
                }
            })
        }
    }

    let handleSave = () => {
        let temp: todos[]
        if (props.status === 'pending')
            temp = JSON.parse(JSON.stringify(props.pendingTodos));
        else
            temp = JSON.parse(JSON.stringify(props.completedTodos));
        let obj: todos = { ...props.todo, todo: newTodoValue }
        temp = temp.map((el: todos) => {
            if (el.id === props.todo.id) return obj
            else return el
        })
        if (props.status === 'pending')
            props.setPendingTodos(temp);
        else
            props.setCompletedTodos(temp);
        setEditMode(false)
    }

    const [editMode, setEditMode] = useState(false)
    const [newTodoValue, setNewValue] = useState(props.todo.todo)
    return (
        <Draggable draggableId={props.todo.id.toString()} index={props.idx} key={props.todo.id}>
            {(provided) => {
                return (
                    <div className='todo' {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                        {!editMode ?
                            props.todo.todo
                            :
                            <>
                                <input type="text" value={newTodoValue} spellCheck="false" onChange={(e) => { setNewValue(e.currentTarget.value) }} />
                                <button onClick={handleSave}>save</button>
                            </>
                        }
                        {
                            !editMode ?
                                <div className="options">
                                    {
                                        props.status === 'pending' ?
                                            <div className="edit" onClick={() => { setEditMode(true) }}><i className="fa-solid fa-pen"></i></div> : null
                                    }
                                    <div className="delete" onClick={handleDelete}><i className="fa-solid fa-trash"></i></div>
                                    {
                                        props.status === 'pending' ?
                                            <div className="pending_func" onClick={() => { handleStateChange('completed') }}><i className="fa-solid fa-check"></i></div> : null
                                    }
                                    {
                                        props.status === 'completed' ?
                                            <div className="completed_func" onClick={() => { handleStateChange('pending') }}><i className="fa-solid fa-rotate-left"></i></div> : null
                                    }
                                </div> : <></>
                        }
                    </div>)
            }}
        </Draggable>

    )
}

export default Todo
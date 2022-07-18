import React from 'react'
import { todos } from './todosType'
import Todo from './Todo'
import { Droppable } from 'react-beautiful-dnd'
interface Props {
    pendingTodos: todos[],
    setPendingTodos: React.Dispatch<React.SetStateAction<todos[]>>,
    completedTodos: todos[],
    setCompletedTodos: React.Dispatch<React.SetStateAction<todos[]>>
}

const DisplayArea: React.FC<Props> = (props) => {
    return (
        <div className='displayArea'>
            <Droppable droppableId='pending'>
                {(provided) => {
                    return (
                        <div className='pending box' id='pending' ref={provided.innerRef} {...provided.droppableProps}>
                            <div className="staus_title">Pending Tasks</div>
                            {props.pendingTodos.map((el: todos, idx: number) => <Todo setPendingTodos={props.setPendingTodos} pendingTodos={props.pendingTodos} setCompletedTodos={props.setCompletedTodos} completedTodos={props.completedTodos} todo={el} status='pending' idx={idx} key={el.id.toString()} />)}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
            <Droppable droppableId='completed'>
                {(provided) => {
                    return (<div className='completed box' id='completed' ref={provided.innerRef} {...provided.droppableProps}>
                        <div className="staus_title">Completed Tasks</div>
                        {props.completedTodos.map((el: todos, idx: number) => <Todo setPendingTodos={props.setPendingTodos} pendingTodos={props.pendingTodos} setCompletedTodos={props.setCompletedTodos} completedTodos={props.completedTodos} todo={el} status='completed' idx={idx} key={el.id.toString()} />)}
                        {provided.placeholder}
                    </div>)
                }}
            </Droppable>
        </div>
    )
}

export default DisplayArea
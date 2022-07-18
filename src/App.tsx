import { todos } from './todosType'
import './App.css';
import { useState, useEffect } from 'react';
import Input from './Input'
import DisplayArea from './DisplayArea';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

function App() {

  let [pendingTodos, setPendingTodos] = useState(JSON.parse(localStorage.getItem('pendingTodos') || '[]') as todos[]);
  let [completedTodos, setCompletedTodos] = useState(JSON.parse(localStorage.getItem('completedTodos') || '[]') as todos[]);

  useEffect(() => {
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos))
    localStorage.setItem('pendingTodos', JSON.stringify(pendingTodos))
  }, [pendingTodos, completedTodos])

  let states: Map<string, [todos[], React.Dispatch<React.SetStateAction<todos[]>>]> = new Map([
    ["pending", [pendingTodos, setPendingTodos]],
    ['completed', [completedTodos, setCompletedTodos]]
  ])

  let dragEnd = (result: DropResult) => {
    if (result.destination) {
      let sourceFuncs = states.get(result.source.droppableId)
      let destFuncs = states.get(result.destination.droppableId)
      if (!sourceFuncs) return;
      if (!destFuncs) return;
      let obj: todos;
      if (result.source.droppableId === result.destination.droppableId) {
        let temp2: todos[] = JSON.parse(JSON.stringify(destFuncs[0]));
        obj = temp2.splice(result.source.index, 1)[0];
        temp2.splice(result.destination.index, 0, obj)
        destFuncs[1](temp2)
      }
      else {
        let temp = sourceFuncs[0].filter((el: todos, index: number) => {
          if (el.id.toString() === result.draggableId) {
            obj = { ...el };
            if (result.destination && destFuncs) {
              let temp2: todos[] = JSON.parse(JSON.stringify(destFuncs[0]));
              temp2.splice(result.destination.index, 0, obj);
              destFuncs[1](temp2);
            }
            return false;
          } else return true;
        })
        sourceFuncs[1](temp);
      }
    }
  }

  return (
    <div className="container">
      <Input setPendingTodos={setPendingTodos} pendingTodos={pendingTodos} />
      <DragDropContext onDragEnd={dragEnd}>
        <DisplayArea setPendingTodos={setPendingTodos} pendingTodos={pendingTodos} setCompletedTodos={setCompletedTodos} completedTodos={completedTodos} />
      </DragDropContext>
    </div>
  );
}

export default App;
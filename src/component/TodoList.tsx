import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from './modol'
import SingleTodo from './SingleTodo'
import "./styles.css"

interface Props {
    todos:Todo[],
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos:Todo[]
    setCompletedTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList:React.FC <Props>= ({todos,setTodos,completedTodos,setCompletedTodos}) => {
  return (
    // <div className='todos'>
        
    //    {
    //     todos.map(todo=>{
    //         return(
    //             <SingleTodo 
    //             todo={todo}
    //             key={todo.id}
    //             todos={todos}
    //             setTodos={setTodos}
    //             />
    //         )
    //     })
    //    }
    // </div>
    <div className="container">
        <Droppable droppableId='TodoLists'>
            {
                (provided)=>(
                    <div className="todos" ref={provided.innerRef}
                    {...provided.droppableProps}
                    ><span className='todos__headings'>Active Task</span>
                            {
                            todos.map((todo, index)=>{
                                return(
                                    <SingleTodo 
                                    index={index}
                                    todo={todo}
                                    key={todo.id}
                                    todos={todos}
                                    setTodos={setTodos}
                                    />
                                )
                            })
                        }
                         {provided.placeholder}
                            </div>
                )
            }
            
        </Droppable>
        <Droppable droppableId='TodoRemove'>
            {
                (provided)=>(
                    <div className="todos remove" ref={provided.innerRef}
                    {...provided.droppableProps}>
                        <span className='todos__headings'>Completed Task</span>
                            {
                            completedTodos.map((todo,index)=>{
                                return(
                                    <SingleTodo 
                                    index={index}
                                    todo={todo}
                                    key={todo.id}
                                    todos={completedTodos}
                                    setTodos={setCompletedTodos}
                                    />
                                )
                            })
                        }
                        {provided.placeholder}
                            </div>
                )
            }
        </Droppable>
        

    </div>
  )
}

export default TodoList
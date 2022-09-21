import React,{useState,useRef,useEffect} from 'react'
import { Todo } from './modol'
import {AiFillEdit,AiFillDelete} from "react-icons/ai"
import {MdDone} from "react-icons/md"
import "./styles.css"
import TodoList from './TodoList'
import { Draggable } from 'react-beautiful-dnd'

interface Props{
    index:number,
    todo:Todo,
    
    todos:Todo[]
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo:React.FC<Props> = ({index, todo,todos,setTodos}) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)
    const handleDone=(id:number)=>{
        setTodos(
            todos.map((todo)=>{
                return( todo.id===id? {...todo, isDone:!todo.isDone}:todo)
        }))
    }

    const handleDelete=(id:number)=>{
    setTodos(todos.filter(todo=>todo.id!==id))
    }

    const handleEdit=(e:React.FormEvent, id:number)=>{
        e.preventDefault()
        setTodos(todos.map((todo)=>todo.id === id ? {...todo, todo:editTodo} : todo))
        setEdit(false)
    }
    const inputRef= useRef<HTMLInputElement>(null)

    useEffect(() => {
      inputRef.current?.focus()
    }, [edit])
    
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {
            (provided)=>(
            <form className='todos__single'  {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onSubmit={(e)=>handleEdit(e, todo.id)}
           
            >

        {
            edit?(
                <input value={editTodo} onChange={(e)=>setEditTodo(e.target.value)}
                className="todos__single--text"/>
            ):
            (
                 todo.isDone?(
            <s className="todos__single--text">{todo.todo}</s>
            ):
            <span className="todos__single--text">{todo.todo}</span>
            )
        }
        
        <div>
            <span className="icons">
                <AiFillEdit onClick={()=>{
                    if(!edit && !todo.isDone){
                        setEdit(!edit)
                }}
                
                }/>
            </span>
            <span className="icons"><AiFillDelete onClick={()=>{handleDelete(todo.id)}}/></span>
            <span className="icons"><MdDone onClick={()=>{handleDone(todo.id)}}/></span>
        </div>
    </form>)
        }
    </Draggable>
    
  )
}

export default SingleTodo
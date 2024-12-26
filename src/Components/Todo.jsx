import React, {useRef, useState, useEffect} from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'
import { use } from 'react';

const Todo = () => {

    const[todoList, setTodoList] = useState([]);

    const inputRef = useRef();
    const add = () => {
        const inputText = inputRef.current.value.trim();
        
        if (inputText === '') return null;

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false
        }
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = '';
    }

    const deleteTodo = (id) => {
        setTodoList((prvTodos) =>{
            return prvTodos.filter((todo) => todo.id !== id)
        })
    }

    const toggleComplete = (id) => {
        setTodoList((prvTodos) => {
            return prvTodos.map((todo) => todo.id === id ? {...todo, isComplete: !todo.isComplete} : todo)
        })
    }

    useEffect(() => {
        console.log(todoList)
    }, [todoList])

  return (
    <div className='bg-blue-400 place-self-center w-11/12 
                    max-w-md flex flex-col p-7 
                    min-h-[550px] rounded-lg shadow-lg'>

        {/* title and icon */}
        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={todo_icon} alt="" />
            <h1 className='text-3xl font-semibold'>To-do List</h1>
        </div>

        {/* inputbox */}
        <div className='flex itmes-center my-7 bg-blue-200 rounded-full'>
            <input ref={inputRef} type='text' className=' border-0 outline-none flex-1 
            bg-transparent h-14 pl-6 pr-2 placeholder:text-slate-600' 
            placeholder='Add a task' />
            <button onClick={add} className='border-none rounded-full bg-orange-600 w-32
            h-14 text-white font-medium cursor-pointer'>Add +</button>
        </div>

        {/* tasks */}
        <div >
            {todoList.map((item, index) => {
                return <TodoItems key={index} 
                text={item.text} id={item.id} isComplete={item.isComplete}
                deleteTodo={deleteTodo} toggleComplete={toggleComplete}/>
            })}
        </div>
    </div>
  )
}

export default Todo
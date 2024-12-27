import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'

const TodoItems = ({text, id, isComplete, deleteTodo, toggleComplete}) => {
  return (
    <div className='flex items-center my-3 gap-2 
                    bg-blue-100 rounded-lg p-2 '>
        <div onClick={() => {toggleComplete(id)}} className='flex flex-1 items-center cursor-pointer'>
            <img src={isComplete ? tick : not_tick} alt="" className='w-7'/>
            <p className={`' ml-4 font-medium ' 
              ${isComplete ? 'line-through decoration-slate-600 decoration-auto' : ' '}`}>
                {text}
            </p>
        </div>

        <img onClick={() => deleteTodo(id)} src={delete_icon} alt="" 
        className='w-3.5 cursor-pointer'/>

    </div>
  )
}

export default TodoItems
import React from 'react'
import todo_icon from '../assets/todo_icon.png'

const Todo = () => {
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
            <input type='text' className=' border-0 outline-none flex-1 
            bg-transparent h-14 pl-6 pr-2 placeholder:text-slate-600' 
            placeholder='Add a task' />
            <button className='border-none rounded-full bg-orange-700 w-32
            h-14 text-white font-medium cursor-pointer'>Add +</button>
        </div>

        {/* tasks */}
        <div className='flex flex-col gap-4'>
            
        </div>
    </div>
  )
}

export default Todo
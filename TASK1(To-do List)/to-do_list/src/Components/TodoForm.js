import React, {useState} from 'react'

export const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
      // prevent default action
        e.preventDefault();
        if (value) {
          // add todo
            addTodo(value);
          // clear form after submission
            setValue('');
        }
        };
    return (
        <form onSubmit={handleSubmit} className="TodoForm">
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="TodoInput" placeholder='What is the task today?' />
        <button type="submit" className='TodoButton'>Add Task</button>
    </form>
    )
}
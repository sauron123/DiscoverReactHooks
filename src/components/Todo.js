import React, { useState, useEffect } from 'react';
import axios from 'axios';

const todo = props =>{
    const [todoName, setTodoName] = useState('');
    const [submittedTodo,setSubmittedTodo] = useState(null);
    const [todoList, setTodoList] = useState([]);



    useEffect(() => {
        axios.get('https://test-443ce.firebaseio.com/todos.json').then(result => {
            console.log(result);
            const todoData = result.data;
            const todos =[];
            for (const key in todoData) {
                todos.push({id : key, name: todoData[key].name})

            }
             setTodoList(todos);
            });
        return () => {
            console.log('cleanup')
        };
        }, []
    );



    useEffect(() => {
        if (submittedTodo) {
        setTodoList(todoList.concat(submittedTodo));
        }
        },
        [submittedTodo]
    );

    const  inputChangeHandler = event => {
        setTodoName(event.target.value);
    };

    const todoAddHandler = () => {

        axios.post('https://test-443ce.firebaseio.com/todos.json',{name: todoName})
                .then(res => {
                    const todoItem = {id: res.data.name, name: todoName};
                    setSubmittedTodo(todoItem);
                    // setTodoList(todoList.concat(todoItem));
                console.log(res)
            })
            .catch ( err => {
                console.log(err.res);
            })
    };

    return <React.Fragment>
        <input
            type="text"
            placeholder="Todo"
            onChange={inputChangeHandler}
            value={todoName}/>
        <button type="button" onClick={todoAddHandler} >Add </button>
            <ul>
            {todoList.map((todo) => (
                <li key={todo.id}>
                    {todo.name}
                </li>
                ))}

            </ul>

    </React.Fragment>;
};

export default todo;
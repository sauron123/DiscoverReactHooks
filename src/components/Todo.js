import React, { useState, useEffect, useReducer, useRef } from 'react';
import axios from 'axios';
import List from './List'

const todo = props =>{
    // const [todoName, setTodoName] = useState('');
    // const [submittedTodo,setSubmittedTodo] = useState(null);
    // const [todoList, setTodoList] = useState([]);

    const todoInputRef = useRef();


    const todoListReducer = (state,action) => {
        switch (action.type) {
            case 'ADD' :
                return state.concat(action.payload);
            case 'SET' :
                return action.payload;
            case 'REMOVE' :
                return state.filter((todo) => todo.id !== action.payload);
            default:
                return state;


        }
    };

    useEffect(() => {
        axios.get('https://test-443ce.firebaseio.com/todos.json').then(result => {
            console.log(result);
            const todoData = result.data;
            const todos =[];
            for (const key in todoData) {
                todos.push({id : key, name: todoData[key].name})

            }

            dispatch({type: 'SET', payload: todos});
            });
        return () => {
            console.log('cleanup')
        };
        }, []
    );



  const [todoList, dispatch] = useReducer(todoListReducer, []);

    // useEffect(() => {
    //     if (submittedTodo) {
    //     dispatch({type : 'ADD', payload: submittedTodo })
    //     }
    //     },
    //     [submittedTodo]
    // );

    // const  inputChangeHandler = event => {
    //     setTodoName(event.target.value);
    // };

    const todoAddHandler = () => {
        const todoName = todoInputRef.current.value;

        axios.post('https://test-443ce.firebaseio.com/todos.json',{name: todoName})
                .then(res => {
                    const todoItem = {id: res.data.name, name: todoName};
                    // setSubmittedTodo(todoItem);
                    // setTodoList(todoList.concat(todoItem));
                    dispatch({type: 'ADD' , payload: todoItem});
                console.log(res)
            })
            .catch ( err => {
                console.log(err.res);
            })
    };

    const todoRemoveHandler = todoId => {


        axios.delete(`https://test-443ce.firebaseio.com/todos/${todoId}.json`)
            .then(res => {
                dispatch({type: 'REMOVE', payload: todoId});
            })
                .catch(err => console.log(err));
    };

    return <React.Fragment>
        <input
            type="text"
            placeholder="Todo"
            ref={todoInputRef}
            // onChange={inputChangeHandler}
            // value={todoName}
        />
        <button type="button" onClick={todoAddHandler} >Add </button>
          <List items={todoList} onclick={todoRemoveHandler}/>

    </React.Fragment>;
};

export default todo;
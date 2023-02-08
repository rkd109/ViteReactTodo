import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaCheck, FaCircle, FaRegTrashAlt } from "react-icons/fa";
import _ from 'lodash';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getTodoAPI, deleteTodoAPI, postTodoAPI, putTodoAPI } from '../api'

const Todo = () => {
    const [todo, setTodo] = useState("");
    const queryClient = useQueryClient()

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodoAPI,
    })

    const postTodoMutation = useMutation({
        mutationFn: postTodoAPI,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const putTodoMutation = useMutation({
        mutationFn: putTodoAPI,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const deleteTodoMutation = useMutation({
        mutationFn: deleteTodoAPI,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const setTodoEvent = (value) => {
        setTodo(value)
    }

    const setTodosEvent = () => {
        const _todo = { id: uuidv4(), value: todo, checked: false }
        postTodoMutation.mutate(_todo);
        setTodo("");
    }

    const setTodoCheckdEvent = async (id, checked) => {
        putTodoMutation.mutate({ id, checked: !checked })
    }

    const setTodoDeleteEvent = async (id) => {
        deleteTodoMutation.mutate({ id })
    }

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <div className="App">
            <input type="text" value={todo} onChange={(e) => setTodoEvent(e.target.value)}></input>
            <input type="button" onClick={() => setTodosEvent()} value="저장"></input>
            {
                data.map((element, index) => {
                    return <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                        <div onClick={() => setTodoCheckdEvent(element.id, element.checked)}>
                            {element.checked ? <FaCheck /> : <FaCircle />}
                        </div>
                        {element.value}
                        <div onClick={() => setTodoDeleteEvent(element.id)}>
                            <FaRegTrashAlt />
                        </div>
                    </div>
                })
            }
        </div>
    )
}


export default Todo
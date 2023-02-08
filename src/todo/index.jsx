import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getTodoAPI, deleteTodoAPI, postTodoAPI, putTodoAPI } from '../api'
import TodoList from './TodoList'
import { todoKey } from './key';

const Todo = () => {
    const queryClient = useQueryClient()
    const [todo, setTodo] = useState("");

    const { isLoading, isError, data, error } = useQuery({
        queryKey: todoKey,
        queryFn: getTodoAPI,
    })

    const postTodoMutation = useMutation({
        mutationFn: postTodoAPI,
        onSuccess: () => {
            // Invalidate and refetch
            setTodo('');

            queryClient.invalidateQueries({ queryKey: todoKey })
        },
    })

    const putTodoMutation = useMutation({
        mutationFn: putTodoAPI,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: todoKey })
        },
    })

    const deleteTodoMutation = useMutation({
        mutationFn: deleteTodoAPI,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: todoKey })
        },
    })

    const setTodoEvent = (value) => {
        setTodo(value)
    }

    const setTodosEvent = async () => {
        const _todo = { id: uuidv4(), value: todo, checked: false }
        await postTodoMutation.mutateAsync(_todo);
        setTodo("");
    }

    const setTodoCheckdEvent = async (id, checked) => {
        await putTodoMutation.mutateAsync({ id, checked: !checked })
    }

    const setTodoDeleteEvent = async (id) => {
        await deleteTodoMutation.mutateAsync({ id })
    }

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <>
            <TodoList data={data} Todo={todo} setTodoEvent={setTodoEvent} setTodosEvent={setTodosEvent} setTodoCheckdEvent={setTodoCheckdEvent} setTodoDeleteEvent={setTodoDeleteEvent} />
        </>
    )
}


export default Todo
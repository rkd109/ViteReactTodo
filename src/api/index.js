import axios from 'axios'

const ApiClient = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getTodoAPI = async () => {
    const { data } = await ApiClient.get(`/todo`)
    return data
}

export const postTodoAPI = async (param) => {
    await ApiClient.post(`/todo`, param);
}

export const putTodoAPI = async (param) => {
    await ApiClient.put(`/todo`, param);
}
export const deleteTodoAPI = async (param) => {
    await ApiClient.post(`/delete-todo`, param);
}
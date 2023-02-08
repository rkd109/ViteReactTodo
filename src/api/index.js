import axios from 'axios'

const ApiClient = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getTodoAPI = async (param, callback) => {
    await ApiClient.get(`/todo`, param).then(async (res) => {
        if (callback) {
            await callback(res);
        }
    })
}

export const postTodoAPI = async (param, callback) => {
    await ApiClient.post(`/todo`, param).then(async (res) => {
        if (callback) {
            await callback(res);
        }
    })
}

export const putTodoAPI = async (param, callback) => {
    await ApiClient.put(`/todo`, param).then(async (res) => {
        if (callback) {
            await callback(res);
        }
    })
}
export const deleteTodoAPI = async (param, callback) => {
    await ApiClient.post(`/delete-todo`, param).then(async (res) => {
        if (callback) {
            await callback(res);
        }
    })
}


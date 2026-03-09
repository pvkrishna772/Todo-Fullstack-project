import api from "./api.js";

export const getTodos = () => {
    return api.get("/todos");
};

export const createTodo = (data) => {
    return api.post("/todos", data);
};

export const updateTodo = (id, data) => {
    return api.put(`/todos/${id}`, data);
};

export const deleteTodo = (id) => {
    return api.delete(`/todos/${id}`);
};

export const partialUpdate = (id) => {
    return api.patch(`/todos/${id}/toggle`);
};

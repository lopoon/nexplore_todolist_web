import { Todo } from '../models/todo.model';

// TodoService.ts
export const fetchTodos = () => {
  return fetch('http://localhost/api/todo/')
    .then(response => response.json());
};

// TodoService.ts
export const addTodo = (newTodo: any) => {
    return fetch('http://localhost/api/todo/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
};

// TodoService.ts
export const updateTodo = (todo: Todo) => {
    return fetch(`http://localhost/api/todo/${todo.hash}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status: !todo.status,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
};

// TodoService.ts
export const deleteTodo = (todo: Todo) => {
    return fetch(`http://localhost/api/todo/${todo.hash}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
};
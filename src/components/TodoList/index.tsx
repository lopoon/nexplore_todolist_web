import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { Todo } from '../../models/todo.model';
import { TodoItem } from '../TodoItem';
import { fetchTodos, updateTodo, deleteTodo } from '../../services/TodoService';

interface TodoListProps {
    todos: Todo[];
    handleToggleTodoStatus: (todo: Todo) => void;
    handleRemoveTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, handleToggleTodoStatus, handleRemoveTodo }) => {
    const onTodoToggle = (todo: Todo) => {
        handleToggleTodoStatus(todo); // Call handleToggleTodoStatus after the todo status is updated
    };

    const onTodoRemoval = (todo: Todo) => {
        handleRemoveTodo(todo); // Call handleRemoveTodo after the todo is deleted
    };

    return (
        <List
            locale={{
                emptyText: "There's nothing to do :(",
            }}
            dataSource={todos}
            renderItem={(todo: Todo) => (
                <TodoItem
                    key={todo.hash}
                    todo={todo}
                    onTodoToggle={onTodoToggle}
                    onTodoRemoval={onTodoRemoval}
                />
            )}
            pagination={{
                position: 'bottom',
                pageSize: 10,
            }}
        />
    );
};
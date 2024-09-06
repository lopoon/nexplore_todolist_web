import React from 'react';
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Todo } from '../../models/todo.model';

interface TodoItemProps {
    todo: Todo;
    onTodoRemoval: (todo: Todo) => void;
    onTodoToggle: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
    todo,
    onTodoRemoval,
    onTodoToggle
}) => {

    return (
        <List.Item
            actions={[
                <Tooltip
                    title={todo.status ? 'Mark as uncompleted' : 'Mark as completed'}
                >
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={() => onTodoToggle(todo)}
                        defaultChecked={todo.status}
                    />
                </Tooltip>,
                <Popconfirm
                    title="Are you sure you want to delete?"
                    onConfirm={() => {
                        onTodoRemoval(todo);
                    }}
                >
                    <Button className="remove-todo-button" type="primary" danger>
                        X
                    </Button>
                </Popconfirm>,
            ]}
            className="list-item"
            key={todo.hash}
        >
            <div className="todo-item">
                <Tag color={todo.status ? 'cyan' : 'red'} className="todo-tag">
                    {todo.title}
                </Tag>
                {todo.description}
            </div>
        </List.Item>
    );
};
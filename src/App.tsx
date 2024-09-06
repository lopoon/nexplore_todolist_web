import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, message } from 'antd';

import { Todo } from './models/todo.model';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { fetchTodos, updateTodo, deleteTodo, addTodo } from './services/TodoService';

import './styles.less';

interface TodosContainerProps { }

export const TodosContainer: React.FunctionComponent<TodosContainerProps> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos()
      .then(data => {
        const sortedData = data.sort((a: Todo, b: Todo) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        setTodos(sortedData);
      })
      .catch(error => {
        console.error('Failed to fetch todos:', error);
      });
  }, [fetchTodos]);

  const handleFormSubmit = async (todo: Todo): Promise<void> => {
    try {
      const newTodo = await addTodo(todo); // addTodo is a function that sends a request to the server to add a new todo
      setTodos([newTodo, ...todos]); // Add the new todo to the beginning of the todos array
      message.success('Todo added!');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const handleRemoveTodo = async (todo: Todo): Promise<void> => {
    try {
      await deleteTodo(todo); // deleteTodo is a function that sends a request to the server to delete a todo
      setTodos(todos.filter(t => t.hash !== todo.hash)); // Remove the deleted todo from the todos array
      message.warning('Todo removed!');
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleToggleTodoStatus = async (todo: Todo) => {
    try {
      const updatedTodo = await updateTodo(todo);
      setTodos(todos.map(t => t.hash === todo.hash ? updatedTodo : t));
      message.info('Todo state updated!');

    } catch (error) {
      console.error('Failed to update todo status:', error);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      gutter={[0, 20]}
      className="todos-container"
    >
      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Typography.Title level={1}>Add Todo</Typography.Title>
        <Typography.Text type="secondary">To add a todo, just fill the form below and click in add todo.</Typography.Text>
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Card title="Create a new todo">
          <AddTodoForm onFormSubmit={handleFormSubmit} />
        </Card>
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Card title="Todo List">
          <TodoList
            todos={todos}
            handleToggleTodoStatus={handleToggleTodoStatus}
            handleRemoveTodo={handleRemoveTodo}
          />
        </Card>
      </Col>
    </Row>
  );
};
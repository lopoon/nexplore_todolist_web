import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
// import { addTodo } from '../../services/TodoService';

interface Todo {
  hash: string;
  title: string;
  description: string;
  status: boolean;
  updated_at: string;
}

interface AddTodoFormProps {
  onFormSubmit: (values: Todo) => void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onFormSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newTodo = {
      ...values,
      status: false,
      updated_at: new Date().toISOString(),
    };

    onFormSubmit(newTodo);
    
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      className="todo-form"
    >
      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="What needs to be done?" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="Description" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={4}>
          <Button type="primary" htmlType="submit" block>
            <PlusCircleFilled />
            Add todo
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
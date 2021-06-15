import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginPage.css';
import { useHistory } from "react-router-dom";
import { FC, useEffect } from 'react';

type Props ={
  changeShowButton : any
}

export const LoginPage:FC<Props> = (props) => {
  const history = useHistory()

  useEffect(() => {
    if (localStorage.getItem('user') != null) {
      history.push('/quiz');
      props.changeShowButton(true);
    }else{
      props.changeShowButton(false);
    }
    
  })

  const onFinish = (values: any) => {
    localStorage.setItem('user', values.username);
    history.push('/quiz');
    props.changeShowButton(true);
    notification.success({
      message: 'Login successful',
      description: 'Welcome ' +  values.username,
    });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};
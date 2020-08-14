import React from 'react'
import {Form, Input, Button, Layout} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'

const {Content} = Layout

const Login = () => {
    return (
        <Content style={{padding: '50px 50px 20px'}}>
            <div className="site-layout-content">
                <h1 style={{textAlign:'center'}}>LOGIN</h1>
                <Form style={{margin: '10px auto'}} name="normal_login" className="login-form">
                    <Form.Item  name="username"  rules={[{ required: true, message: 'Please input your Username!' }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item  name="password"  rules={[{ required: true, message: 'Please input your Password!' }]}>
                        <Input  prefix={<LockOutlined className="site-form-item-icon" />}  type="password"  placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="#">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        </Content>
    )
}

export default Login
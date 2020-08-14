import React, {useState, useContext, useEffect} from 'react'
import {AppContext} from './AppContext'
import {Form, Input, Button, Layout, notification} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import Axios from 'axios'

const {Content} = Layout

const Login = () => {
    const [users, setUsers, , setLoginState] = useContext(AppContext)
    const [inpName, setInpName] = useState("")
    const [inpPass, setInpPass] = useState("")

    useEffect(() => {
        if (users === null) {
            Axios.get(`https://backendexample.sanbersy.com/api/users`)
            .then(res => {
                setUsers(res.data.map(el => {
                    return {
                        username: el.username,
                        password: el.password
                    }
                }))
            })
        }
    }, [users])

    const handleChangeName = (evt) => {
        setInpName(evt.target.value)
    }
    const handleChangePass = (evt) => {
        setInpPass(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        let name = inpName
        let pass = inpPass
        const validation = users.some(el => el.username === name && el.password === pass)
        if (validation === true) {
            setLoginState(true)
        } else {
            setLoginState(false)
            notification.open({
                message: 'Error',
                description:
                  'Username dan Password anda mungkin salah atau tidak terdaftar.',
              })
        }
    }

    return (
        <Content style={{padding: '50px 50px 20px'}}>
            <div className="site-layout-content">
                <h1 style={{textAlign:'center'}}>LOGIN</h1>
                <Form style={{margin: '10px auto'}} name="normal_login" className="login-form">
                    <Form.Item  name="inpName"  rules={[{ required: true, message: 'Please input your Username!' }]}>
                        <Input onChange={handleChangeName} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item  name="inpPass"  rules={[{ required: true, message: 'Please input your Password!' }]}>
                        <Input onChange={handleChangePass}  prefix={<LockOutlined className="site-form-item-icon" />}  type="password"  placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleSubmit}>
                            Log in
                        </Button>
                        Or <a href="/">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        </Content>
    )
}

export default Login
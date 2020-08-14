import React, {useState, useContext, useEffect} from 'react'
import {AppContext} from './AppContext'
import {Form, Input, Button, Layout, notification, Row, Col} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import Axios from 'axios'

const {Content} = Layout

const Signup = () => {
    const [users, setUsers, , ] = useContext(AppContext)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users])

    const handleChangeName = (evt) => {
        setInpName(evt.target.value)
    }
    const handleChangePass = (evt) => {
        setInpPass(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        let username = inpName
        let password = inpPass
        const validation = users.some(el => el.username === username)
        if (validation === true) {
            notification.open({
                message: 'Error',
                description:
                  'Username sudah terdaftar silahkan gunakan username lain.',
              })
        } else {
            Axios.post(`https://backendexample.sanbersy.com/api/users`, {username, password})
            .then(res => {
                setUsers([
                    ...users,
                    {
                        username: res.data.username,
                        password: res.data.password
                    }
                ])
                console.log(res)
            })
        }
    }

    return (
        <Row>
            <Col span={12} offset={6}>
                <Content style={{padding: '50px 50px 20px'}}>
                    <div className="site-layout-content">
                        <h1 style={{textAlign:'center'}}>Sign Up</h1>
                        <Form style={{margin: '10px auto'}} name="normal_login" className="login-form">
                            <Form.Item  name="inpName"  rules={[{ required: true, message: 'Create your Username!' }]}>
                                <Input onChange={handleChangeName} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item  name="inpPass"  rules={[{ required: true, message: 'Create your Password!' }]}>
                                <Input onChange={handleChangePass}  prefix={<LockOutlined className="site-form-item-icon" />}  type="password"  placeholder="Password"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleSubmit}>
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Col>
        </Row>
    )
}

export default Signup
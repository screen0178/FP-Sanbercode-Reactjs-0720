import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom';
import {Layout, Menu, Row, Col, Dropdown, Button} from 'antd'
import logo from './img/logo.png'
import { DownOutlined } from '@ant-design/icons';

import {AppContext} from './AppContext'

const {Header} = Layout

const Navi = () => {
    const [, ,loginState ,setLoginState] = useContext(AppContext)
    const history = useHistory()
    const handleLogout = evt => {
        evt.preventDefault()
        setLoginState(false)
        history.push("/login")
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <Button type="text"><Link className="link" to="/signup">ADMIN</Link></Button>
            </Menu.Item>
            <Menu.Item>
                <Button type="text" onClick={handleLogout}>Logout</Button>
            </Menu.Item>
        </Menu>
    )

    return (
        <>
            <Header>
                <Row>
                    <Col span={3}>
                        <img id="logo" src={logo} width="200px" alt="logoSanber" />                
                    </Col>
                    <Col span={19}>
                        <Menu theme="dark" mode="horizontal" SelectedKeys={['1']}>
                            <Menu.Item key="1"><Link className="link" to="/">Movies</Link></Menu.Item>
                            <Menu.Item key="2"><Link className="link" to="/games">Games</Link></Menu.Item>
                            {loginState === false &&
                            <Menu.Item key="3" style={{float:'right'}}><Link className="link" to="/login">Login</Link></Menu.Item>
                            }
                        </Menu>
                        </Col>
                    {loginState === true &&
                        <Col flex={2}>
                            <Dropdown style={{float:'right'}} overlay={menu}>
                                <Button>
                                    Menu <DownOutlined />
                                </Button>
                            </Dropdown>              
                        </Col>
                    }
                </Row>
            </Header>
        </>
    )
}

export default Navi

import React from 'react'
import {Layout, Menu, Row, Col, Dropdown, Button} from 'antd'
import logo from './img/logo.png'
import { DownOutlined } from '@ant-design/icons';
const {Header} = Layout

const Navi = () => {
    const menu = (
        <Menu>
            <Menu.Item>
                ADMIN
            </Menu.Item>
            <Menu.Item>
                Logout
            </Menu.Item>
        </Menu>
    )

    return (
        <>
            <Header>
                <Row>
                    <Col flex="200px">
                        <img id="logo" src={logo} width="200px" alt="logoSanber" />                
                    </Col>
                    <Col flex="auto">
                        <Menu theme="dark" mode="horizontal" SelectedKeys={['2']}>
                            <Menu.Item key="1">Home</Menu.Item>
                            <Menu.Item key="2" style={{float:'right'}}>Login</Menu.Item>
                        </Menu>
                    </Col>
                    <Col>
                        <Dropdown overlay={menu}>
                            <Button>
                                Button <DownOutlined />
                            </Button>
                        </Dropdown>              
                    </Col>
                </Row>
            </Header>
        </>
    )
}

export default Navi

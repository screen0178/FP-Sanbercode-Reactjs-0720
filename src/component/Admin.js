import React, {useState} from 'react'
import {Layout, Menu} from 'antd'
import {SettingOutlined, DatabaseOutlined} from '@ant-design/icons'
import MovieAdmin from './MovieAdmin'
import GameAdmin from './GameAdmin'

const {SubMenu} = Menu
const {Content, Sider} = Layout




const Admin = () => {
    const [key, setKey] = useState(1)

    const changeToMovie = evt => {
        setKey(1)
    }

    const changeToGame = evt => {
        setKey(2)
    }

    let view
    if (key === 1) {
        view = <MovieAdmin />
    } else {
        view = <GameAdmin />
    }
    return (
        <Content style={{ padding: '50px 50px 20px' }}>
        <Layout className="site-layout-background" style={{ padding: '24px 0',backgroundColor: '#fff' }}>
            <Sider className="site-layout-background" width={200}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
            >
                <SubMenu key="sub1" icon={<DatabaseOutlined />} title="Data">
                    <Menu.Item onClick={changeToMovie} key="1">Movie data</Menu.Item>
                    <Menu.Item onClick={changeToGame} key="2">Game data</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<SettingOutlined />} title="Option">
                    <Menu.Item key="3">Change Password</Menu.Item>
                </SubMenu>
            </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {view}
            </Content>
        </Layout>
        </Content>
    )
}

export default Admin
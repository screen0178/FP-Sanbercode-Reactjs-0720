import React, { Component } from 'react'
import {List, Layout, Col, Row, Typography} from 'antd'
import Axios from 'axios'

const {Content} = Layout
const {Title} = Typography

class GameList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameData: null
        }
    }

    componentDidMount(){
        if (this.state.gameData === null) {
            Axios.get(`https://backendexample.sanbersy.com/api/games`)
            .then(res => {
                const data = res.data.map(el => {
                    return {
                        id: el.id,
                        created_at: el.created_at,
                        update_at: el.update_at,
                        name: el.name,
                        genre: el.genre,
                        singlePlayer: el.singlePlayer,
                        multiplayer: el.multiplayer,
                        platform: el.platform,
                        release: el.release,
                        image_url: el.image_url 
                    }
                })
                console.log(data)
                this.setState({
                    gameData: data
                })
            })
        }
    }

    render(){
        return (
            <>
            <Row>
                <Col span={18} offset={3}>
                    <Content style={{padding: '50px 50px 20px'}}>
                        <div className="site-layout-content">
                        <Title style={{textAlign:'center'}}>Game List</Title>
                        {this.state.gameData !== null &&
                            <List
                                itemLayout="horizontal"
                                dataSource={this.state.gameData}
                                renderItem={item => (
                                <List.Item
                                    extra={
                                        <img width={200} alt="poster" src={item.image_url} />
                                    }
                                >
                                    <List.Item.Meta
                                    title={<h1>{item.name}</h1>}
                                    description={
                                        <div>
                                            <p>Genre: {item.year}</p>
                                            <p>Singleplayer: {item.singlePlayer}</p>
                                            <p>Multiplayer: {item.multiplayer}</p>
                                            <p>platform: {item.platform}</p>
                                            <p>Release: {item.release}</p>
                                        </div>
                                    }
                                    />
                                </List.Item>
                                )}
                            />
                        }
                        </div>
                    </Content>
                </Col>
            </Row>
            </>
        )
    }
}

export default GameList